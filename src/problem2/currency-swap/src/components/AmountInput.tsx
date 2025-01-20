import { TextInput } from "flowbite-react";
import React, { forwardRef, useEffect, useState } from "react";

interface AmountInputProps {
  className: string;
  onChange: (value: any) => void;
}

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  ({ className, onChange }: AmountInputProps, ref) => {
    const [inputValue, setInputValue] = useState("0");
    const debouncedValue = useDebounce(inputValue, 500);

    useEffect(() => {
      onChange(debouncedValue);
    }, [debouncedValue]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };

    return (
      <div
        className={`${className} h-28 border border-1 rounded-lg pt-4 pl-4 mx-4 text-left`}
      >
        <span className="font-bold">Amount</span>
        <TextInput
          ref={ref}
          theme={{
            field: {
              input: {
                base: "outline-none block w-full border-none disabled:cursor-not-allowed disabled:opacity-50",
                sizes: {
                  lg: "p-2 text-xl",
                },
              },
            },
          }}
          color={""}
          id="large"
          type="text"
          sizing="lg"
          onChange={handleInputChange}
          defaultValue={"0"}
        />
      </div>
    );
  }
);

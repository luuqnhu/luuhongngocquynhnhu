import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CurrencySelectBox } from ".";
import { AmountInput } from ".";
import { fetchPrices } from "../api";
import { SelectOption } from "../types";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatNumber } from "../utils";
import { Spinner } from "flowbite-react";

const SwapIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-hidden="true"
    className="h-4 w-4 rotate-90 text-greyblue-400 lg:rotate-0"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M11.726 1.273l2.387 2.394H.667V5h13.446l-2.386 2.393.94.94 4-4-4-4-.94.94zM.666 12.333l4 4 .94-.94L3.22 13h13.447v-1.333H3.22l2.386-2.394-.94-.94-4 4z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const schema = z.object({
  amount: z
    .string()
    .refine(
      (val) => val.length > 0 && !isNaN(Number(val)) && Number(val) >= 0,
      {
        message: "Amount must be a valid number",
      }
    )
    .transform((val) => Number(val)),
});

type FormData = z.infer<typeof schema>;

export const SwapForm = () => {
  const [prices, setPrices] = useState<SelectOption[]>([]);
  const [fromToken, setFromToken] = useState<SelectOption>();
  const [toToken, setToToken] = useState<SelectOption>();
  const [result, setResult] = useState<String>();
  const [isLoading, setIsLoading] = useState(false);
  const [canConvert, setCanConvert] = useState(false);
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "all",
  });
  const amountValue = watch("amount");

  useEffect(() => {
    const loadPrices = async () => {
      try {
        const data = await fetchPrices();
        setPrices(data);
      } catch (error) {
        console.error("Error fetching prices", error);
        toast.error("Failed to fetch prices");
      }
    };

    loadPrices();
  }, []);

  useEffect(() => {
    if (amountValue && toToken && fromToken) {
      setCanConvert(true);
    } else {
      setCanConvert(false);
      setResult("");
    }
  }, [fromToken, toToken, amountValue]);

  const handleSwap = () => {
    const tmpFromToken = fromToken;
    setFromToken(toToken);
    setToToken(tmpFromToken);
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    setIsLoading(true);

    setTimeout(() => {
      if (fromToken && toToken) {
        setResult(
          formatNumber((data.amount * fromToken.price) / toToken.price)
        );
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="text-left lg:grid lg:grid-cols-3 lg:space-y-0 space-y-4">
          <div>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <AmountInput {...field} ref={field.ref} className="" />
              )}
            />
            {errors.amount && (
              <span className="text-sm pl-4 text-red-600">
                {errors.amount?.message}
              </span>
            )}
          </div>
          <div className="self-start lg:grid lg:grid-cols-9 lg:grid-cols-2 items-center space-y-1 lg:col-span-2">
            <CurrencySelectBox
              label="From"
              className="col-span-4 lg:min-w-md lg:pb-0 pb-5"
              options={prices}
              selected={fromToken}
              onSelect={(value) => setFromToken(value)}
            />
            <button
              className="w-15 h-15 flex m-auto rounded-full border border-solid border-gray-250 bg-white p-3 hover:bg-gray-150"
              aria-label="Swap currencies"
              type="button"
              onClick={handleSwap}
            >
              <SwapIcon />
            </button>
            <CurrencySelectBox
              label="To"
              className="col-span-4"
              options={prices}
              selected={toToken}
              onSelect={(value) => setToToken(value)}
            />
          </div>
        </div>
        <div className="flex text-center lg:items-center flex-col flex-col-reverse lg:flex-row justify-between">
          <div
            className={`${
              result && !isLoading ? "visible" : "invisible"
            } flex items-center gap-4 p-4 mx-4 text-left`}
          >
            <span className="font-bold">Result:</span>
            <span className="text-xl">{result}</span>
          </div>
          <button
            className={`${
              canConvert && !isLoading ? "" : "opacity-50 pointer-events-none"
            } border mx-4 lg:h-11 lg:ml-auto rounded-lg px-6 py-2.5 text-white bg-teal-500`}
            type="submit"
          >
            Convert
          </button>
        </div>
        {isLoading && <Spinner className="lg:mx-auto mt-4" />}
      </form>
    </>
  );
};

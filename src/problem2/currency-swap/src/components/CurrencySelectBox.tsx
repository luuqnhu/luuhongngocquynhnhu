// @ts-nocheck
import Select, {
  components,
  PlaceholderProps,
  ControlProps,
  OptionProps,
  ValueContainerProps,
} from "react-select";
import { TokenIcon } from ".";
import { SelectOption } from "../types";

interface CurrencySelectBoxProps {
  options: SelectOption[];
  label?: string;
  selected?: SelectOption;
  className?: string;
  onSelect: (value: SelectOption) => void;
}

const IndicatorSeparator = () => {
  return <></>;
};

const Placeholder = ({ ...props }: PlaceholderProps) => {
  return (
    <components.Placeholder className="text-left text-sm" {...props}>
      Type to search...
    </components.Placeholder>
  );
};

const Control = ({ ...props }: ControlProps) => {
  return (
    <>
      <components.Control
        className="p-0 !flex !items-center !rounded-lg !border-none"
        {...props}
      ></components.Control>
    </>
  );
};

const Option = ({ data, children, ...props }: OptionProps) => {
  return (
    <components.Option {...props}>
      <div className="flex gap-4">
        <TokenIcon token={data.value} />
        {children}
      </div>
    </components.Option>
  );
};

export const CurrencySelectBox = ({
  options,
  label,
  selected,
  className,
  onSelect,
}: CurrencySelectBoxProps) => {
  const ValueContainer = ({ children, ...props }: ValueContainerProps) => {
    return (
      <>
        <components.ValueContainer className="items-center" {...props}>
          <div className="flex items-center gap-4">
            {selected && <TokenIcon token={selected.value} />}
            {children}
          </div>
        </components.ValueContainer>
      </>
    );
  };

  const handleChange = (e) => {
    console.log(e);
    onSelect(e);
    if (document.activeElement instanceof HTMLElement)
      document.activeElement.blur();
  };

  return (
    <>
      <div
        className={`${className} h-28 border border-[#e4e7eb] rounded-lg p-4 mx-4 text-left space-y-2`}
      >
        <span className="font-bold">{label}</span>
        <Select
          options={options}
          isClearable={true}
          isMulti={false}
          components={{
            Control,
            ValueContainer,
            Option,
            IndicatorSeparator,
            Placeholder,
          }}
          onChange={handleChange}
          value={selected}
        />
      </div>
    </>
  );
};

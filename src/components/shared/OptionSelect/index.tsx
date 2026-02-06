"use client";

import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

interface OptionType {
  label: string | React.ReactNode;
  value: string;
}

interface OptionSelectProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Select>,
    "onValueChange" | "value"
  > {
  value: string;
  onChange: (value: string) => void;
  options: OptionType[];
  placeholder?: string;
  selectClassName?: string;
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  selectClassName,
  ...rest
}) => {
  return (
    <div>
      <Select value={value} onValueChange={onChange} {...rest}>
        <SelectTrigger className={selectClassName}>
          <SelectValue placeholder={placeholder ? placeholder : "Select"} />
        </SelectTrigger>
        <SelectContent className="border-none">
          <SelectGroup>
            {options.map((item, index) => (
              <SelectItem
                key={index}
                value={item.value}
                className="bg-white data-[state=checked]:bg-surface-brandLight"
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default OptionSelect;

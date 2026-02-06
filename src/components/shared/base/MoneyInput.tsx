import * as React from "react";

import { cn } from "@/lib/utils";
import CurrencyInput from "react-currency-input-field";

interface CurrencyInputProps {
  className?: string;
  disabled?: boolean;
  value: string | undefined;
  setValue: (value: string) => void;
  maxLength?: number;
  postfix?: React.ReactNode;
  preFix?: React.ReactNode;
  autoFocus?: boolean;
  ref?: React.Ref<HTMLInputElement>;
  placeholder?: string;
  error?: boolean;
}

const MoneyInput = ({
  className,
  disabled,
  value,
  setValue,
  maxLength,
  postfix,
  preFix,
  autoFocus,
  ref,
  placeholder = "Enter",
  error,
}: CurrencyInputProps) => {
  return (
    <div className="relative flex items-center">
      <CurrencyInput
        ref={ref}
        className={cn(
          disabled || disabled ? "bg-gray-100 cursor-not-allowed" : " ",
          error ? "border-error" : "border-border",
          "peer flex h-12 w-full rounded-xl border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-gray-400 placeholder:text-sm focus:placeholder-white focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
          preFix && "pl-[40px]",
          className
        )}
        min={0}
        maxLength={maxLength}
        disabled={disabled}
        decimalsLimit={2}
        value={value}
        autoFocus={autoFocus}
        placeholder={placeholder}
        allowDecimals
        allowNegativeValue={false}
        onValueChange={(value) => {
          if (value === undefined || value === "") {
            setValue("0");
          } else {
            setValue(value);
          }
        }}
      />
      {value && value != "0" && (
        <label
          htmlFor="name"
          className="absolute left-3 -top-[8px] bg-white text-default-secondary flex text-xs transition-all peer-focus:text-muted-foreground"
        >
          {placeholder}
        </label>
      )}
      <label
        htmlFor="name"
        className="absolute left-3 -top-2.5 bg-white text-gray-600 hidden text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:flex peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600"
      >
        {placeholder}
      </label>

      {preFix && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {preFix}
        </div>
      )}
      {postfix && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {postfix}
        </div>
      )}
    </div>
  );
};
MoneyInput.displayName = "MoneyInput";

export { MoneyInput };

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  postfix?: React.ReactNode;
  preFix?: React.ReactNode;
  readonly?: boolean;
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      preFix,
      postfix,
      disabled,
      readOnly,
      error,
      maxLength,
      ...props
    },
    ref
  ) => {
    const [inputLength, setInputLength] = React.useState(
      props.value?.toString().length ||
        props.defaultValue?.toString().length ||
        0
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputLength(e.target.value.length);
      props.onChange?.(e); // Keep original onChange
    };

    React.useEffect(() => {
      if (props.value !== undefined) {
        setInputLength(props.value?.toString().length || 0);
      }
    }, [props.value]);

    return (
      <div className="relative w-full">
        <textarea
          className={cn(
            readOnly || disabled ? "bg-gray-100" : " ",
            error ? "border-error" : "border-border",
            "peer flex min-h-[80px] w-full rounded-xl border px-3 py-3 text-sm shadow-sm transition-colors placeholder:text-gray-400 placeholder:text-sm focus:placeholder-transparent focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
            preFix && "pl-[40px]",
            maxLength && "pr-[55px]",
            className
          )}
          ref={ref}
          disabled={disabled}
          readOnly={readOnly}
          onWheel={(event) => event.currentTarget.blur()}
          {...props}
          maxLength={maxLength}
          onChange={handleChange}
          autoComplete="off"
        />

        {props.value && (
          <label
            htmlFor="name"
            className="absolute left-3 -top-[8px] bg-white text-default-secondary flex text-xs transition-all peer-focus:text-muted-foreground"
          >
            {props.placeholder}
          </label>
        )}
        <label
          htmlFor="name"
          className="absolute left-3 -top-2.5 bg-white text-gray-600 hidden text-xs transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:flex peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600"
        >
          {props.placeholder}
        </label>

        {preFix && (
          <div className="absolute left-3 top-4 transform -translate-y-1/2">
            {preFix}
          </div>
        )}

        {/* ✅ postfix area */}
        <div className="absolute right-3 top-2 text-default-secondary text-xs">
          {maxLength ? (
            <span>
              {inputLength} / {maxLength}
            </span>
          ) : (
            postfix
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };

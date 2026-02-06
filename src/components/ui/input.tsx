import * as React from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  postfix?: React.ReactNode;
  preFix?: React.ReactNode;
  readonly?: boolean;
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, preFix, postfix, disabled, readOnly, error, maxLength, ...props }, ref) => {
    const [isPasswordVisible, setPasswordVisible] = React.useState(false);
    const [inputLength, setInputLength] = React.useState(
      props.value?.toString().length || props.defaultValue?.toString().length || 0,
    );

    const togglePasswordVisibility = () => {
      if (!disabled) {
        setPasswordVisible(!isPasswordVisible);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputLength(e.target.value.length);
      props.onChange?.(e); // <-- keep original onChange working
    };

    return (
      <div className="relative flex items-center">
        <input
          type={isPasswordVisible ? 'text' : type}
          className={cn(
            readOnly || disabled ? 'bg-gray-100 cursor-not-allowed' : ' ',
            error ? 'border-error' : 'border-border',
            'peer flex h-12 w-full rounded-xl border px-3 py-1 text-sm md:text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-gray-400 placeholder:text-sm focus:placeholder-white focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50',
            preFix && 'pl-[40px]',
            (postfix || maxLength) && 'pr-[70px]',
            className,
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
          className="absolute left-3 -top-2.5 bg-white text-gray-600 hidden text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:flex peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600"
        >
          {props.placeholder}
        </label>

        {type === 'password' && (
          <button
            type="button"
            className={cn('absolute right-3 top-1/2 transform -translate-y-1/2', {
              'cursor-not-allowed opacity-50': disabled,
            })}
            onClick={togglePasswordVisibility}
            disabled={disabled}
          >
            {isPasswordVisible ? (
              <Eye className="w-4 h-4 text-gray-500" />
            ) : (
              <EyeOff className="w-4 h-4 text-gray-500" />
            )}
          </button>
        )}

        {preFix && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{preFix}</div>
        )}

        {/* ✅ postfix area updated */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-default-secondary text-xs">
          {maxLength ? (
            <span>
              {inputLength} / {maxLength}
            </span>
          ) : (
            postfix && postfix
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };

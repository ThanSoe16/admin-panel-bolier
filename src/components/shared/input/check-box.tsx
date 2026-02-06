import { Checkbox } from '@/components/ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';

interface Props {
  checked?: CheckedState;
  onCheckedChange?: (checked: CheckedState) => void;
  label?: string;
  className?: string;
}

export default function FormCheckBox({ checked, onCheckedChange, label, className }: Props) {
  return (
    <div className={`flex items-center space-x-2 ${className || ''}`}>
      <Checkbox id="terms" checked={checked} onCheckedChange={onCheckedChange} />
      {label && (
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
    </div>
  );
}

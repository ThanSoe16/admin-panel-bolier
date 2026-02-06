import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Flex } from '@radix-ui/themes';
import { ChevronDown } from 'lucide-react';

const MultiSelectInput = ({
  value,
  placeholder,
  items = [
    { name: 'QR', value: 'PAY_BY_QRCODE' },
    { name: 'PWA', value: 'PWAAPP' },
    { name: 'PIN', value: 'PIN' },
    { name: 'NOTI', value: 'NOTI' },
    { name: 'WEB', value: 'WEB' },
    { name: 'UPI', value: 'upi' },
    { name: 'UABPAY', value: 'uabpay' },
    { name: 'MMQR', value: 'mmqr' },
  ],
  onChange,
  disabled = false,
}: {
  value: string[];
  placeholder: string;
  items?: { name: string; value: string }[];
  acceptedValues?: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}) => {
  const toggleItem = (item: string) => {
    if (value.includes(item)) {
      // remove if already selected
      onChange(value.filter((v) => v !== item));
    } else {
      // add if not selected
      onChange([...value, item]);
    }
  };

  return (
    <div className="relative flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            value.length ? '' : 'text-gray-400',
            disabled ? 'bg-gray-100 cursor-not-allowed' : '',
            'border w-full rounded-xl h-12 text-left px-4 text-sm peer ',
          )}
          disabled={disabled}
        >
          <Flex align={'center'} justify={'between'}>
            <p>
              {' '}
              {value.length > 0
                ? value.map((v) => items.find((i) => i.value === v)?.name || v).join(', ')
                : placeholder}
            </p>
            <ChevronDown className="w-4 h-4" />
          </Flex>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[500px]">
          {items.map((item, key) => (
            <DropdownMenuCheckboxItem
              checked={value.includes(item.value)}
              onCheckedChange={() => toggleItem(item.value)}
              key={key}
              onSelect={(e) => {
                e.preventDefault(); // ⛔ prevent menu from closing
              }}
            >
              {item.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {value.length > 0 && (
        <label
          htmlFor="name"
          className="absolute left-3 -top-[8px] bg-white text-default-secondary flex text-xs transition-all peer-focus:text-muted-foreground"
        >
          {placeholder}
        </label>
      )}
    </div>
  );
};
export default MultiSelectInput;

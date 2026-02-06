'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useQueryState, parseAsString } from 'nuqs';

interface Props {
  selectParam?: string;
  arr: {
    label: any;
    value: any;
  }[];
  classNames?: string;
  placeholder?: string;
  value?: string;
}

const SelectBoxFilter = ({
  selectParam = 'select',
  arr,
  classNames,
  placeholder = 'Select',
  value,
}: Props) => {
  const [search, setSearch] = useQueryState(
    selectParam,
    parseAsString.withDefault(value ?? arr[0].value),
  );

  return (
    <Select
      onValueChange={(e) => {
        setSearch(e);
      }}
      defaultValue={search}
      value={value}
    >
      <SelectTrigger
        className={cn('min-w-[120px] h-[45px] rounded-lg border border-border', classNames)}
      >
        <SelectValue className="text-sm" />
      </SelectTrigger>
      <SelectContent className="max-h-[200px]">
        {arr.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectBoxFilter;

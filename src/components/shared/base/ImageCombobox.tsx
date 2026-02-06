'use client';
import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Flex } from '@radix-ui/themes';
import ProfileAvatar from './ProfileAvatar';

interface ImageComboboxProps {
  className?: string;
  options: {
    value: string;
    label: string;
    image: string;
  }[];
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  position?: 'top' | 'bottom';
  onSearchChange?: (searchValue: string) => void;
}

const ImageCombobox: React.FC<ImageComboboxProps> = ({
  className = '',
  position = 'bottom',
  options,
  placeholder,
  value,
  setValue,
  onSearchChange,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'secondary'}
          role="combobox"
          aria-expanded={open}
          className={`min-w-full justify-between border bg-white h-12 font-normal text-default ${className}`}
        >
          <p className="truncate">
            {value
              ? options.find((item) => item.value === value)?.label
              : `${placeholder ? placeholder : 'Select'}`}
          </p>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side={position}
        className="w-[--radix-popover-trigger-width] max-h-[200px] p-0 z-50"
      >
        <Command className="w-full max-h-[30dvh] ">
          <CommandInput
            placeholder={placeholder ?? 'Search...'}
            // value={value}
            onValueChange={onSearchChange}
          />
          <CommandList>
            <CommandEmpty>No Data found.</CommandEmpty>
            <CommandGroup>
              {options.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  keywords={[item.label.toLowerCase()]}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <Flex align={'center'} className="gap-2">
                    <ProfileAvatar
                      name={item.label?.charAt(0)}
                      photo={item.image}
                      className="rounded-lg"
                    />

                    {item.label}
                  </Flex>
                  <Check
                    className={cn('ml-auto', value === item.value ? 'opacity-100' : 'opacity-0')}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ImageCombobox;

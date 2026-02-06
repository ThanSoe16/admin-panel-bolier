'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useIsMobile } from '@/hooks/use-mobile';
import { Flex } from '@radix-ui/themes';
import { toast } from 'sonner';

interface DatePickerWithRangeProps {
  className?: string;
  value?: DateRange;
  onChange?: (date: DateRange | undefined) => void;
}

export function DatePickerWithRange({ className, value, onChange }: DatePickerWithRangeProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>(value);
  const isMobile = useIsMobile();

  const handleOk = () => {
    if (!date?.from) {
      toast.error('Please select start date');
      return;
    }

    if (!date?.to) {
      toast.error('Please select end date');
      return;
    }

    if (date.from.getTime() === date.to.getTime()) {
      date.to = new Date(date.from.getTime() + 24 * 60 * 60 * 1000 - 1);
    }

    onChange?.(date);
    setOpen(false);
  };

  const handleReset = () => {
    onChange?.(undefined);
    setOpen(false);
    setDate(undefined);
  };

  return (
    <div className={cn('grid gap-2 h-[48px]', className)}>
      <Popover open={open}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal h-full',
              !date && 'text-muted-foreground ',
            )}
            onClick={() => setOpen(true)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit max-w-[calc(100dvw-2rem)] p-2 align-bottom">
          <button
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
            onClick={() => {
              setDate(value);
              setOpen(false);
            }}
          >
            <X className="h-4 w-4" />
          </button>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            numberOfMonths={isMobile ? 1 : 2}
            pagedNavigation
            showOutsideDays={false}
            // onDayClick={handleDayClick}
            onSelect={setDate}
          />
          <Flex className="w-full gap-2" justify="end">
            <Button variant="destructive" onClick={handleReset} disabled={!date}>
              Reset
            </Button>
            <Button onClick={handleOk} disabled={!date?.from || !date?.to}>
              Done
            </Button>
          </Flex>
        </PopoverContent>
      </Popover>
    </div>
  );
}

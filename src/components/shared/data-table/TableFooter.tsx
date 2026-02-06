import { TableCell, TableFooter, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface DataTableFooterProps {
  columnLengths: number;
  data: {
    label: string;
    value: number | string;
    className?: string;
  }[];
  hideSelectBox?: boolean;
  stickyNumber?: number;
}

export const DataTableFooterRow = ({
  columnLengths,
  data,
  hideSelectBox,
  stickyNumber,
}: DataTableFooterProps) => {
  return (
    <TableFooter>
      <TableRow className="border-t">
        {!hideSelectBox && <TableCell className="min-w-[52px] sticky left-0 p-0" />}
        <TableCell
          colSpan={columnLengths - data.length + 1}
          className="text-sm font-medium h-[52px] text-left pl-4"
        >
          Total Count
        </TableCell>
        {data.map((item, index) => {
          const isPinned = index < (stickyNumber ?? 0);
          // const leftOffset = isPinned
          //   ? (hideSelectBox ? 0 : 52) + (index + columnLengths - data.length + 1) * 200
          //   : 0;

          return (
            <TableCell
              key={index}
              className={cn('text-sm font-medium h-[52px]', item.className)}
              style={{
                position: 'relative',
                left: '0px',
                boxShadow: isPinned ? '0px 4px 10px rgba(0, 0, 0, 0.1)' : 'none',
                paddingLeft: '16px',
              }}
            >
              {item.value}
            </TableCell>
          );
        })}
      </TableRow>
    </TableFooter>
  );
};

import React from 'react';
import {
  PaginationContent,
  Pagination as SPagination,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from '@/components/ui/pagination';
import { Box } from '@radix-ui/themes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CurrencyFormat } from '@/utils/currencyFormat';
import { usePagination } from '@/features/base/hooks/usePagination';

const pageSizes = [10, 20, 50];

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  total: number;
}

export function Pagination({ currentPage, pageSize, total }: PaginationProps) {
  const { setPageIndex, setRowPerPage } = usePagination();
  const totalPageCount = Math.ceil(total / pageSize);

  const renderPages = () => {
    const items: React.ReactElement[] = [];

    const pushPage = (page: number) => {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink isActive={currentPage === page} onClick={() => setPageIndex(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>,
      );
    };

    const pushEllipsis = (key: string) => {
      items.push(
        <PaginationItem key={key}>
          <PaginationEllipsis />
        </PaginationItem>,
      );
    };

    // Always show first page
    pushPage(1);

    // Left ellipsis
    if (currentPage > 3) {
      pushEllipsis('left');
    }

    // Middle pages (sliding window)
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPageCount - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pushPage(i);
    }

    // Right ellipsis
    if (currentPage < totalPageCount - 2) {
      pushEllipsis('right');
    }

    // Always show last page
    if (totalPageCount > 1) {
      pushPage(totalPageCount);
    }

    return items;
  };

  return (
    <div className="flex flex-col items-center py-2 gap-2 md:flex-row">
      <Box>
        <SPagination>
          <PaginationContent>
            {/* Prev */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPageIndex(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>

            {/* Page Numbers */}
            {renderPages()}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPageIndex(currentPage + 1)}
                disabled={currentPage === totalPageCount}
              />
            </PaginationItem>
          </PaginationContent>
        </SPagination>
      </Box>

      {/* Page Size */}
      <div className="space-x-4 flex flex-row items-center justify-end w-full">
        <div className="font-normal text-sm text-default">Showing</div>

        <Select
          value={pageSize.toString()}
          onValueChange={(value) => {
            setRowPerPage(Number(value));
            setPageIndex(1);
          }}
        >
          <SelectTrigger className="w-fit min-w-[74px] h-[36px] rounded-lg border">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {pageSizes.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="font-normal text-sm text-default">of {CurrencyFormat(totalPageCount)}</div>
      </div>
    </div>
  );
}

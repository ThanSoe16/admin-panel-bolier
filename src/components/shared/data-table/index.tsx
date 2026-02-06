'use client';

import { useEffect, useRef, useState } from 'react';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Pagination } from './Pagination';
import { cn } from '@/lib/utils';
import { PaginationTypes } from './table-base-types';
import { Loading } from '../loading';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  query?: PaginationTypes;
  total?: number;
  hidePagination?: boolean;
  className?: string;
  isShowNo?: boolean;
  renderHeader?: () => React.ReactNode;
  tablewrapperclasses?: string;
  isLoading?: boolean;
  getRowHighlight?: (row: TData) => boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  query,
  total,
  hidePagination = false,
  className,
  isShowNo = true,
  renderHeader,
  tablewrapperclasses,
  isLoading,
  getRowHighlight,
}: DataTableProps<TData, TValue>) {
  const [tableData, setTableData] = useState(data);
  const tableDataRef = useRef(tableData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const pageStartIndex = ((query?.pageIndex ?? 1) - 1) * (query?.rowPerPage ?? 20);
  const displayColumns = isShowNo
    ? [
        {
          accessorKey: 'no',
          header: () => <span className="pl-2">No.</span>,
          cell: ({ row }: { row: Row<TData> }) => (
            <span className="pl-4">{pageStartIndex + row.index + 1}</span>
          ),
          size: 20,
        },
        ...columns,
      ]
    : columns;

  // In the DataTable component
  const table = useReactTable<TData>({
    data: tableData,
    columns: displayColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    defaultColumn: {
      size: 100,
      minSize: 20,
      maxSize: 500,
    },
  });

  useEffect(() => {
    tableDataRef.current = tableData;
  }, [tableData]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <div className={cn(`flex flex-col h-full w-full space-y-3`, tablewrapperclasses)}>
      {renderHeader ? renderHeader() : null}
      <div
        className={cn(
          className ? className : '',
          'relative h-full w-full flex-grow rounded-md overflow-auto',
        )}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <Table>
            <TableHeader>
              {table?.getHeaderGroups()?.map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="font-semibold text-blueDark-normal break-words whitespace-normal bg-blueLight-lightActive px-3 py-4"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="text-sm border-b">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, key) => {
                  const shouldHighlight = getRowHighlight?.(row.original);
                  return (
                    <TableRow
                      key={key}
                      className={cn(
                        'border-b transition-colors',
                        shouldHighlight ? 'bg-gray-200' : 'bg-white hover:bg-gray-50',
                      )}
                    >
                      {row.getVisibleCells().map((cell, index) => {
                        return (
                          <TableCell
                            key={cell.id}
                            style={{ minWidth: `${cell.column.getSize()}px` }}
                            className={cn('pl-3', shouldHighlight && index !== 0 && 'opacity-40')}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center ">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      {!hidePagination && query && total ? (
        <Pagination total={total} currentPage={query.pageIndex} pageSize={query.rowPerPage} />
      ) : (
        ''
      )}
    </div>
  );
}

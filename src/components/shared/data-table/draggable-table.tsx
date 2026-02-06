"use client";

import { useEffect, useRef, useState } from "react";

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
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Pagination } from "./Pagination";
import { cn } from "@/lib/utils";
import { Loading } from "../loading";
import useSideBarStore from "@/store";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PaginationTypes } from "./table-base-types";
import { Menu } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  query: PaginationTypes;
  total?: number;
  hidePagination?: boolean;
  className?: string;
  isShowNo?: boolean;
  renderHeader?: () => React.ReactNode;
  tablewrapperclasses?: string;
  isLoading?: boolean;
  onPositionChange?: (data: TData[]) => void;
}

export function DraggableTable<TData, TValue>({
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
  onPositionChange,
}: DataTableProps<TData, TValue>) {
  const [tableData, setTableData] = useState(data);
  const tableDataRef = useRef(tableData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const pageStartIndex =
    ((query?.pageIndex ?? 1) - 1) * (query?.rowPerPage ?? 20);
  const dragRef = useRef<HTMLButtonElement>(null);
  const displayColumns = !isShowNo
    ? [
        {
          accessorKey: "drag",
          header: () => <span className="pl-2"></span>,
          cell: ({ row }: { row: Row<TData> }) => (
            <button
              ref={dragRef}
              style={{ cursor: "move" }}
              className="flex items-center justify-center"
            >
              <Menu />
            </button>
          ),
          size: 20,
        },
        ...columns,
      ]
    : [
        {
          accessorKey: "drag",
          header: () => <span className="pl-2">Sorting</span>,
          cell: ({ row }: { row: Row<TData> }) => (
            <div className="bg-black">
              <button
                ref={dragRef}
                style={{ cursor: "move" }}
                className="flex items-center justify-center"
              >
                <Menu />
              </button>
            </div>
          ),
          size: 40,
        },

        ...columns,
      ];
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

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tableData.findIndex((item: any) => item.id === active.id);
    const newIndex = tableData.findIndex((item: any) => item.id === over.id);

    const newItems = [...tableData];
    const [movedItem] = newItems.splice(oldIndex, 1);
    newItems.splice(newIndex, 0, movedItem);

    setTableData(newItems);
    onPositionChange?.(newItems);
  };

  useEffect(() => {
    tableDataRef.current = tableData;
  }, [tableData]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <div
      className={cn(
        `flex flex-col h-full w-full space-y-3`,
        tablewrapperclasses
      )}
    >
      {renderHeader ? renderHeader() : null}
      <div
        className={cn(
          className ? className : "",
          "relative h-full w-full flex-grow rounded-md overflow-auto"
        )}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <DndContext
            sensors={sensors}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
            onDragEnd={handleDragEnd}
          >
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border">
                    {headerGroup.headers.map((header, index) => {
                      return (
                        <TableHead
                          key={`${header.id}-${index}`}
                          className="font-semibold text-blueDark-normal break-words whitespace-normal bg-blueLight-lightActive px-3 py-4"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="text-sm border">
                <SortableContext
                  items={tableData.map((item: any) => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {table.getRowModel().rows?.length ? (
                    table
                      .getRowModel()
                      .rows.map((row) => (
                        <SortableRow
                          key={row.id}
                          row={row}
                          index={pageStartIndex + row.index + 1}
                        />
                      ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center "
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </SortableContext>
              </TableBody>
            </Table>
          </DndContext>
        )}
      </div>
      {!hidePagination && query && total ? (
        <Pagination
          total={total}
          currentPage={query.pageIndex}
          pageSize={query.rowPerPage}
        />
      ) : (
        ""
      )}
    </div>
  );
}

const SortableRow = ({ row, index }: { row: Row<any>; index: number }) => {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging,
  } = useSortable({
    id: row.original.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={`border ${isDragging ? "shadow-md" : ""}`}
    >
      {row.getVisibleCells().map((cell, dIndex) => (
        <TableCell
          key={`${cell.id}-${dIndex}`}
          style={{ minWidth: `${cell.column.getSize()}px` }}
          className="pl-3"
        >
          {cell.column.id === "drag" ? (
            <button
              {...attributes}
              {...listeners}
              className="flex items-center justify-center cursor-move"
            >
              <Menu />
              <div className="pl-2">{index}</div>
            </button>
          ) : (
            flexRender(cell.column.columnDef.cell, cell.getContext())
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};

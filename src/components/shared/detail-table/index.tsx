import * as React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface DetailTableProps {
  data: {
    label?: string;
    value: string | React.ReactNode;
  }[];
  title?: string;
}

export const DetailTable: React.FC<DetailTableProps> = ({ data, title }) => {
  return (
    <div className="w-full">
      {title && (
        <div className="w-full flex items-center justify-center h-14 font-semibold break-words whitespace-normal bg-brand-secondary px-3 py-4 text-default text-center normal-text shadow">
          {title}
        </div>
      )}
      <Table className="border-b">
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              className="min-h-14w-full flex items-center justify-center text-center divide-x"
            >
              {item.label && (
                <TableCell
                  colSpan={1}
                  align="center"
                  className="flex-1 font-medium normal-text w-1/2 line-clamp-1 whitespace-normal break-words flex items-center justify-center"
                >
                  {item.label}
                </TableCell>
              )}
              <TableCell
                colSpan={item.label ? 1 : 2}
                align="center"
                className=" line-clamp-1 flex-1 font-medium normal-text w-1/2 whitespace-normal break-words flex items-center justify-center"
              >
                {item.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

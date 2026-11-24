import type { ReactNode } from "react";

export interface DataTableRow {
  id: string;
  cells: ReactNode[];
}

interface DataTableProps {
  columns: string[];
  rows: DataTableRow[];
}

export default function DataTable({ columns, rows }: DataTableProps) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-tint text-muted">
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col" className="px-3 py-2 font-medium">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-line">
              {row.cells.map((cell, index) => (
                <td
                  key={index}
                  className={`px-3 py-2 ${
                    index === 0 ? "text-foreground" : "text-muted"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

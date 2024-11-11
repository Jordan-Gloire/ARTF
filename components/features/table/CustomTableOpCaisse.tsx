"use client";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTableRowActions from "./components/DataTableRowActions";
import { Button } from "@/components/ui/button";
import { DialogForm } from "./components/DialogForm";

import { usePathname } from "next/navigation";
import { createData } from "@/src/actions/app/service-actions";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import FilterZone from "./filter-zone";
import { Card } from "@/components/ui/card";
import {
  OptionsFilterOpCaisse,
  Role,
  DefaultAppRowTypeInterface,
  ExtendedRowType,
} from "@/types/app_types";
import { CustomInputFieldInterface } from "@/types/fieldsprops";
import {
  extractValueOptimizedForRow,
  isValueTypeDataRow,
} from "@/src/hooks/app_hooks";

interface DataTableProps<
  TData extends ExtendedRowType<DefaultAppRowTypeInterface>,
  TValue
> {
  serviceName: string;
  columns: ColumnDef<TData>[];
  data: TData[];
  setData: Dispatch<SetStateAction<TData[]>>;
  tittle?: string;
  role: Role;
  form: CustomInputFieldInterface[];
  enabledRowAction?: boolean;
  enabledRAdd?: boolean;
  handleAdd?: any;
  handleUpdate?: any;
  filterOptions: OptionsFilterOpCaisse;
}

export default function CustomTableOpCaisse<
  TData extends ExtendedRowType<DefaultAppRowTypeInterface>,
  TValue
>({
  columns,
  data,
  enabledRowAction = false,
  serviceName = "",
  form = [],
  ...props
}: Readonly<DataTableProps<TData, TValue>>) {
  // const path = usePathname();
  // const handleAdd = createData.bind(null, serviceName, path);

  if (enabledRowAction) {
    const actionsColumns: ColumnDef<TData> = {
      id: "actions_custom_table",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <DataTableRowActions
            role={props.role}
            serviceName={serviceName}
            row={row}
            form={form}
          />
        );
      },
    };

    if (!columns.some((column) => column.id === actionsColumns.id)) {
      columns.push(actionsColumns);
    }
  }

  //Custom table
  //Custom table
  const customColums = useMemo<ColumnDef<TData>[]>(
    () =>
      columns.map((col, index) => ({
        ...col,
        cell: (props) => {
          // console.log("col", col.cell);
          if (typeof col.cell === "function") return col.cell(props);
          const valueCell = props.getValue();
          // Type guard to check if valueCell is of type ValueTypeDataRow
          if (isValueTypeDataRow(valueCell)) {
            return extractValueOptimizedForRow(valueCell);
          }
          // Return the original valueCell if it’s not of type ValueTypeDataRow
          return valueCell;
        },
      })),
    [columns]
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<any>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns: customColums,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
    },
  });

  return (
    <div className="flex w-full flex-col items-start gap-2">
      {/* top header */}
      <div className="flex items-center gap-2">
        <Button variant="default">Imprimer</Button>
        {data.length > 0 && (
          <Input
            placeholder="Rechercher..."
            // value={(table.data) ?? ""}
            onChange={(event) =>
              table.setGlobalFilter(String(event.target.value))
            }
            className="max-w-sm"
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colonnes
              <ChevronDown className="ml-2" size={14} strokeWidth={1} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  column.getCanHide() && column.id != "actions_custom_table"
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator className="opacity-25" />
      <FilterZone optionsFilter={props.filterOptions} />
      {/* Table */}
      <Card className="w-full ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun éléments
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      {/* bottom */}
      <div className="flex w-full items-center justify-end space-x-2 py-4">
        {table.getCanPreviousPage() && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précedent
          </Button>
        )}

        {table.getCanNextPage() && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
          </Button>
        )}
      </div>
    </div>
  );
}

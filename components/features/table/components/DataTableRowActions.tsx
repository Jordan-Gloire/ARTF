"use client";
import React from "react";
import { Row } from "@tanstack/react-table";

import {
  DefaultAppRowTypeInterface,
  ExtendedRowType,
  Role,
} from "@/types/app_types";
import { CustomInputFieldInterface } from "@/types/fieldsprops";
import ButtonPrint from "@/components/custom/ButtonPrint";
import ButtonUpdate from "@/components/custom/ButtonUpdate";
import ButtonDelete from "@/components/custom/ButtonDelete";

interface DataTableRowActionsProps<
  TData extends ExtendedRowType<DefaultAppRowTypeInterface>
> {
  row: Row<TData>;
  tittle?: string;
  serviceName: string;
  form: CustomInputFieldInterface[];
  role: Role;
  // onEdit?: any;
  // onDelete?: (value: TData) => void;
}

const DataTableRowActions = <
  TData extends ExtendedRowType<DefaultAppRowTypeInterface>
>({
  row,
  form,
  serviceName,
  ...props
}: DataTableRowActionsProps<TData>) => {
  return (
    <>
      <ButtonUpdate<TData>
        role={props.role}
        row={row}
        serviceName={serviceName}
        form={form}
        tittle={props.tittle}
      />
      {/* <ButtonPrint<TData> row={row} serviceName={serviceName} /> */}
      <ButtonDelete<TData>
        role={props.role}
        row={row}
        serviceName={serviceName}
        tittle={props.tittle}
      />
    </>
  );
};

export default DataTableRowActions;

/*

 <DropdownMenu>
      <AlertDialog>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <DialogForm
              role={props.role}
              row={row}
              trigger={
                <Button
                  disabled={!props.role.write}
                  className="w-full"
                  color="blue"
                  variant="secondary"
                >
                  <SquarePen className="mr-2" size={12} />
                  Modifier
                </Button>
              }
              title={props.tittle ?? ""}
              form={form}
              handleSubmit={handleUpdate}
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem asChild>
              <Button
                disabled={!props.role.delete}
                variant="destructive"
                size="sm"
                className="w-full"
              >
                <Trash2 className="mr-2" size={12} />
                Supprimer
              </Button>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Voulez-vous supprimer cette ligne ?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="secondary">Annuler</Button>
            </AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={muatationDelete.isPending || !props.role.delete}
              onClick={() => {
                muatationDelete.mutate();
              }}
            >
              {muatationDelete.isPending ? (
                <Loader className="mr-2" size={12} />
              ) : (
                <></>
              )}
              Supprimer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>

*/

/* 

 <AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <DialogForm
            serviceName={serviceName}
            role={props.role}
            row={row}
            trigger={
              <TooltipTrigger asChild>
                <Button
                  disabled={!props.role.write}
                  variant="ghost"
                  size="icon"
                >
                  <Pencil size={12} />
                  <span className="sr-only">Modifier</span>
                </Button>
              </TooltipTrigger>
            }
            title={props.tittle ?? ""}
            form={form}
            // handleSubmit={handleUpdate}
          />
          <TooltipContent>
            <p>Modifier</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CustomToolTip
        trigger={
          <AlertDialogTrigger asChild>
            <Button disabled={!props.role.delete} variant="ghost" size="icon">
              <Trash2 size={12} />
              <span className="sr-only">Supprimer</span>
            </Button>
          </AlertDialogTrigger>
        }
        content="Supprimer"
      />
      <ButtonPrint<TData> row={row} serviceName={serviceName} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Voulez-vous supprimer cette ligne ?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="secondary">Annuler</Button>
          </AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={muatationDelete.isPending || !props.role.delete}
            onClick={() => {
              muatationDelete.mutate();
            }}
          >
            {muatationDelete.isPending ? (
              <Loader className="mr-2" size={12} />
            ) : (
              <></>
            )}
            Supprimer
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
*/

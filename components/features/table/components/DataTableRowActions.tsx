"use client";
import React from "react";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  MoreHorizontal,
  Pencil,
  Printer,
  SquarePen,
  Trash2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Loader from "@/components/custom/Loader";
import { DialogForm } from "./DialogForm";
import { usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { deleteRow, updateRow } from "@/src/actions/app/service-actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CustomToolTip from "@/components/custom/ui/CustomToolTip";
import { toast } from "sonner";
import { DefaultAppRowTypeInterface, ExtendedRowType } from "@/types/app_types";
import { CustomInputFieldInterface } from "@/types/fieldsprops";

interface DataTableRowActionsProps<
  TData extends ExtendedRowType<DefaultAppRowTypeInterface>
> {
  row: Row<TData>;
  tittle?: string;
  serviceName: string;
  form: CustomInputFieldInterface[];
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
  const path = usePathname();
  const handleUpdate = updateRow.bind(
    null,
    row.original.id.toString(),
    serviceName,
    path
  );

  const muatationDelete = useMutation({
    //row.original.id, serviceName, path
    mutationFn: async () =>
      deleteRow({ id: row.original.id.toString(), serviceName: serviceName, path: path }),
    onError: (error) => {
      console.log("supression", error);
      toast.error("erreur au cours de la suppression");
    },
    onSuccess: (data) => toast.success("Suppression réussie"),
  });

  return (
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
              row={row}
              trigger={
                <Button className="w-full" color="blue" variant="secondary">
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
              <Button variant="destructive" size="sm" className="w-full">
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
              disabled={muatationDelete.isPending}
              onClick={() => {
                muatationDelete.mutate();
              }}
            >
              {muatationDelete.isPending ? (
                <Loader className="mr-2" size={12} />
              ) : (
                <></>
              )}
              Suprrimer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>
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
              row={row}
              trigger={
                <Button className="w-full" color="blue" variant="secondary">
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
              <Button variant="destructive" size="sm" className="w-full">
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
              disabled={muatationDelete.isPending}
              onClick={() => {
                muatationDelete.mutate();
              }}
            >
              {muatationDelete.isPending ? (
                <Loader className="mr-2" size={12} />
              ) : (
                <></>
              )}
              Suprrimer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>

*/

/* <CustomToolTip
        trigger={
          <Button variant="ghost" size="icon" className="size-8 p-0">
            <Printer size={12} />
            <span className="sr-only">Imprimer</span>
          </Button>
        }
        content="Imprimer"
      /> */

/* 

 <AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <DialogForm
            row={row}
            trigger={
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Pencil size={12} />
                  <span className="sr-only">Modifier</span>
                </Button>
              </TooltipTrigger>
            }
            title={props.tittle ?? ""}
            form={form}
            handleSubmit={handleUpdate}
          />
          <TooltipContent>
            <p>Modifier</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CustomToolTip
        trigger={
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash2 size={12} />
              <span className="sr-only">Supprimer</span>
            </Button>
          </AlertDialogTrigger>
        }
        content="Supprimer"
      />

      

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
            disabled={muatationDelete.isPending}
            onClick={() => {
              muatationDelete.mutate();
            }}
          >
            {muatationDelete.isPending ? (
              <Loader className="mr-2" size={12} />
            ) : (
              <></>
            )}
            Suprrimer
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
*/

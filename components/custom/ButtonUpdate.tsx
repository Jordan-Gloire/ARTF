"use client";
import { Button } from "../ui/button";
import CaisseService from "@/src/services/app/caisse.service";
import {
  DefaultAppRowTypeInterface,
  ExtendedRowType,
  Role,
} from "@/types/app_types";
import { Row } from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Pencil } from "lucide-react";
import { CustomInputFieldInterface } from "@/types/fieldsprops";
import { DialogForm } from "@/components/features/table/components/DialogForm";

interface DataTableRowUpdateProps<
  TData extends ExtendedRowType<DefaultAppRowTypeInterface>
> {
  row: Row<TData>;
  tittle?: string;
  serviceName: string;
  form: CustomInputFieldInterface[];
  role: Role;
}

const ButtonUpdate = <
  TData extends ExtendedRowType<DefaultAppRowTypeInterface>
>({
  row,
  serviceName,
  form,
  ...props
}: DataTableRowUpdateProps<TData>) => {
  //   useParams<{ administrationId: string }>()?.administrationId ??
  //     "generate-recu-print";
  // const caisseSerice = new CaisseService();
  // if (serviceName == caisseSerice.getName()) return <></>;

  //   console.log({ dataRow });

  return (
    <TooltipProvider>
      <Tooltip>
        <DialogForm
          serviceName={serviceName}
          role={props.role}
          row={row}
          trigger={
            <TooltipTrigger asChild>
              <Button disabled={!props.role.write} variant="ghost" size="icon">
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
  );
};

export default ButtonUpdate;

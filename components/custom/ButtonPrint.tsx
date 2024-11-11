"use client";

import { Printer } from "lucide-react";
import { Button } from "../ui/button";
import CustomToolTip from "./ui/CustomToolTip";
import CaisseService from "@/src/services/app/caisse.service";
import { DefaultAppRowTypeInterface, ExtendedRowType } from "@/types/app_types";
import { Row } from "@tanstack/react-table";
import { useParams } from "next/navigation";

interface DataTableRowPrintProps<
  TData extends ExtendedRowType<DefaultAppRowTypeInterface>
> {
  row: Row<TData>;
  serviceName: string;
  //   tittle?: string;
  //   form: CustomInputFieldInterface[];
  //   role: Role;
  // onEdit?: any;
  // onDelete?: (value: TData) => void;
}

const ButtonPrint = <
  TData extends ExtendedRowType<DefaultAppRowTypeInterface>
>({
  row,
  serviceName,
}: DataTableRowPrintProps<TData>) => {
  useParams<{ administrationId: string }>()?.administrationId ??
    "generate-recu-print";
  const caisseSerice = new CaisseService();
  
  return <></>;

  const dataRow = row.original;

  //   console.log({ dataRow });

  return (
    <CustomToolTip
      trigger={
        <Button
          onClick={() => {
            localStorage.setItem(
              `facture_${dataRow.uuid}`,
              JSON.stringify({ ...dataRow })
            );
            window.open(`caisse/print/${dataRow.uuid}`, "_blank");
          }}
          variant="ghost"
          size="icon"
          className={`size-8 p-0 bouttonPrint_${dataRow.id}`}
        >
          <Printer size={12} color={dataRow.print ? "green" : undefined} />
          <span className="sr-only">Imprimer</span>
        </Button>
      }
      content="Imprimer"
    />
  );
};

export default ButtonPrint;

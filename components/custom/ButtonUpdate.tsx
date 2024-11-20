"use client";
import { Button } from "../ui/button";
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
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { UserInterface } from "next-auth";

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

  const session = useSession();
  const [user, setUser] = useState<UserInterface>();

  useEffect(() => {
    if (session?.data && !user) {
      setUser(session.data.user);
    }
  }, [session]);


  return user?.roles == "ROLE_ADMIN" ? (
    <TooltipProvider>
      <Tooltip>
        <DialogForm
          serviceName={serviceName}
          role={props.role}
          row={row}
          trigger={
            <TooltipTrigger asChild>
              <Button
                // disabled={user?.roles != "ROLE_ADMIN"}
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
  ) : (
    <></>
  );
};

export default ButtonUpdate;

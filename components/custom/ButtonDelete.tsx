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
import { usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { deleteRow } from "@/src/actions/app/service-actions";
import CustomToolTip from "@/components/custom/ui/CustomToolTip";
import { toast } from "sonner";
import {
  DefaultAppRowTypeInterface,
  ExtendedRowType,
  Role,
} from "@/types/app_types";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Row } from "@tanstack/react-table";
import CaisseService from "@/src/services/app/caisse.service";

interface DataTableRowDeleteProps<
  TData extends ExtendedRowType<DefaultAppRowTypeInterface>
> {
  row: Row<TData>;
  tittle?: string;
  serviceName: string;
  role: Role;
}

const ButtonDelete = <
  TData extends ExtendedRowType<DefaultAppRowTypeInterface>
>({
  row,
  serviceName,
  ...props
}: DataTableRowDeleteProps<TData>) => {
  //   useParams<{ administrationId: string }>()?.administrationId ??
  //     "generate-recu-print";

  //   console.log({ dataRow });

  const path = usePathname();

  const muatationDelete = useMutation({
    //row.original.id, serviceName, path
    mutationFn: async () =>
      deleteRow({
        id: row.original.id?.toString() ?? "0",
        serviceName: serviceName,
        path: path,
      }),
    onError: (error) => {
      console.log("supression", error);
      toast.error("erreur au cours de la suppression");
    },
    onSuccess: (data) => toast.success("Suppression réussie"),
  });


  return (
    <AlertDialog>
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
  );
};

export default ButtonDelete;

"use client";

import {
  Dialog,
  DialogContent,
  //DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ReactNode, useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Row } from "@tanstack/react-table";
import Loader from "@/components/custom/Loader";
import { GenerateFieldByType } from "@/components/form/field_manage";
import { toast } from "sonner";
import { CustomInputFieldInterface } from "@/types/fieldsprops";
import { extractValueInValueType } from "@/src/hooks/app_hooks";
import {
  DefaultAppRowTypeInterface,
  ExtendedRowType,
  Role,
} from "@/types/app_types";
import { createData, updateRow } from "@/src/actions/app/service-actions";
import { usePathname } from "next/navigation";

interface DialogFormProps<
  TData extends ExtendedRowType<DefaultAppRowTypeInterface>
> {
  title?: string;
  serviceName: string;
  trigger: ReactNode;
  form: CustomInputFieldInterface[];
  row?: Row<TData>;
  role: Role;
  // handleSubmit: any;
}

const initialState: { message: string; code?: number | string } = {
  message: "",
  code: undefined,
};

export function DialogForm<
  TData extends ExtendedRowType<DefaultAppRowTypeInterface>
>({
  title,
  trigger = <Button variant="outline">Open</Button>,
  // handleSubmit,
  ...props
}: Readonly<DialogFormProps<TData>>) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(initialState);
  // const [state, formAction] = useActionState(handleSubmit, initialState);
  const { pending } = useFormStatus();

  const onSubmit = async (formData: FormData) => {
    if (props.row) {
      const result = await updateRow(
        props.row?.original.id.toString(),
        props.serviceName,
        path,
        state,
        formData
      );
      setState(result);
      console.log("update", { result });
    } else {
      const result = await createData(props.serviceName, path, state, formData);
      setState(result);
      console.log("create", { result });
    }
  };

  useEffect(() => {
    // console.log({ state });
    if (state.code && state.code == 200) {
      if (props.serviceName == "administrations") {
        document.getElementById("file_logo_ad")?.click();
      }
      setOpen(false);
      // toast.success(props.row ? "Modifier avec succès" : "Ajouter avec succès");
      toast.success(state.message);
    } else if (state.code && state.code != 200) {
      toast.error(state.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg p-0">
        <DialogHeader className="p-4">
          <DialogTitle>
            {title ? `${props.row ? "Modifier" : "Ajouter"} ${title}` : ""}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[650px] w-full overflow-x-visible px-6 pb-2">
          <form
            action={onSubmit}
            onSubmit={
              pending || state.code == 200
                ? (event) => {
                    event.preventDefault();
                  }
                : undefined
            }
          >
            <div className="grid grid-cols-2 gap-4 py-4">
              {props.form.map((input, index) => {
                // console.log({ input }, props.row?.original);
                if (props.row) {
                  const defaultValue =
                    input.name in props.row.original
                      ? props.row.original[input.name]
                      : "";
                  input.defaultValue = extractValueInValueType(defaultValue);
                }

                return (
                  <GenerateFieldByType
                    key={`field_dialog_${index}`}
                    type={input.type}
                    input={input}
                  />
                );
              })}
            </div>
            {state.code && state.code != 200 && (
              <span className="flex flex-wrap p-2 text-red-500">
                {state.message}
              </span>
            )}
            <DialogFooter className="flex justify-center">
              <Button
                type="submit"
                variant="default"
                className="font-semibold"
                size="lg"
                disabled={pending || !props.role.write || state.code == 200}
              >
                {pending && <Loader className="mr-2" size={12} />}
                {props.row ? "Modifier" : "Valider"}
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

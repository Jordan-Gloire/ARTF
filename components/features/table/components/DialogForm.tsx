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

import { ReactNode, useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Row } from "@tanstack/react-table";
import Loader from "@/components/custom/Loader";
import { GenerateFieldByType } from "@/components/form/field_manage";
import { toast } from "sonner";
import { CustomInputFieldInterface } from "@/types/fieldsprops";
import { extractValueInValueType } from "@/src/hooks/app_hooks";
import { DefaultAppRowTypeInterface, ExtendedRowType } from "@/types/app_types";

interface DialogFormProps<
  TData extends ExtendedRowType<DefaultAppRowTypeInterface>
> {
  title: string;
  trigger: ReactNode;
  form: CustomInputFieldInterface[];
  row?: Row<TData>;
  handleSubmit: any;
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
  handleSubmit,
  ...props
}: Readonly<DialogFormProps<TData>>) {
  const [open, setOpen] = useState(false);

  console.log({ handleSubmit });
  const [state, formAction] = useActionState(handleSubmit, initialState);
  const { pending } = useFormStatus();

  useEffect(() => {
    console.log({ state });
    if (state.code && state.code == 200) {
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
      <DialogContent className="max-w-lg">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {/* <DialogDescription>
          </DialogDescription> */}
          </DialogHeader>
          {/* {props.row && (
            <input type="hidden" name="id" value={props.row.original.id} />
          )} */}
          <div className="grid grid-cols-2 gap-4 py-4">
            {props.form.map((input, index) => {
              console.log({ input });
              if (props.row) {
                const defaultValue = props.row.original[input.name];
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
              disabled={pending}
            >
              {pending && <Loader className="mr-2" size={12} />}
              {props.row ? "Modifier" : "Valider"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

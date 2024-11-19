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
import { useMutation } from "@tanstack/react-query";

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
  form,
  ...props
}: Readonly<DialogFormProps<TData>>) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(initialState);
  const [theForm, setForm] = useState([...form]);
  const [theTrigger, setTigger] = useState(trigger);
  // const { pending } = useFormStatus();

  const onSubmit = async (formData: FormData) => {
    if (props.row) {
      const result = await updateRow(
        props.row?.original.id?.toString() ?? "0",
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
      // toast.success(props.row ? "Modifier avec succès" : "Ajouter avec succès");
      toast.success(state.message);
      setOpen(false);
      // setState(initialState);
    } else if (state.code && state.code != 200) {
      toast.error(state.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const mutation = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      // toast.success(" réussie");
    },
    onError: (error) => {
      console.error(error);
      // toast.error("Erreu: " + error.message);
    },
  });

  // console.log({pending}, mutation.isPending);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (open) {
          // resetDialog();
          setState(initialState);
        }
      }}
    >
      <DialogTrigger asChild>{theTrigger}</DialogTrigger>
      <DialogContent aria-describedby="custom form" className="max-w-lg p-0">
        <DialogHeader className="p-4">
          <DialogTitle>
            {title ? `${props.row ? "Modifier" : "Ajouter"} ${title}` : ""}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[650px] w-full overflow-x-visible px-6 pb-2">
          <form
            action={mutation.mutate}
            onSubmit={
              mutation.isPending || state.code == 200
                ? (event) => {
                    event.preventDefault();
                  }
                : undefined
            }
          >
            <div className="grid grid-cols-2 gap-4 py-4">
              {open &&
                theForm.map((input, index) => {
                  // console.log({ input }, props.row?.original);
                  const field = { ...input };
                  if (props.row) {
                    const value =
                      field.name in props.row.original
                        ? props.row.original[field.name]
                        : "";
                    const valueExtract = extractValueInValueType(value);

                    if (valueExtract) field.defaultValue = valueExtract;
                  }
                  return (
                    <GenerateFieldByType
                      key={`field_dialog_${index}`}
                      type={field.type}
                      input={field}
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
                disabled={
                  mutation.isPending || !props.role.write || state.code == 200
                }
              >
                {mutation.isPending && <Loader className="mr-2" size={12} />}
                {props.row ? "Modifier" : "Valider"}
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

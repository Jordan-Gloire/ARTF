"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/src/lib/utils";
import {
  InputFieldProps,
  SelectFieldPrestationWithCoutProps,
  SelectFieldProps,
  TextareaFieldProps,
} from "@/types/fieldsprops";
import { MultiSelect } from "../custom/ui/multi-select";
import { ComponentType, useState } from "react";
import { Switch } from "../ui/switch";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { uploadingFile } from "@/src/hooks/server_hooks";

/**
 * Voici les champs dont nous aurons souvent besoin pour nos formulaire customizable à notre sauce
 * On les appelera toujours de la même manière
 *
 * Créer un composant groupes pour regrouper des champs lié
 */

export const generateInput = ({
  label = "",
  customclass,
  classlabel,
  classparent,
  ...input
}: InputFieldProps) => {
  return (
    <div className={cn("flex flex-col gap-2 col-span-2", classparent)}>
      <Label className={cn("", classlabel)} htmlFor={input.name}>
        {label}
      </Label>
      <Input {...input} />
    </div>
  );
};

export const generateSwitch = ({
  label = "",
  customclass,
  classlabel,
  classparent,
  ...input
}: InputFieldProps) => {
  return (
    <div className={cn("flex flex-col gap-2 col-span-1", classparent)}>
      <Label className={cn("", classlabel)} htmlFor={input.name}>
        {label}
      </Label>
      <Switch
        id={input.name}
        name={input.name}
        disabled={input.disabled}
        className={customclass}
        defaultValue={input.defaultValue}
      />
    </div>
  );
};

export const generateSelect = (input: SelectFieldProps) => {
  return (
    <div className={cn("flex flex-col gap-2 col-span-1", input.classparent)}>
      <Label className={cn("", input.classlabel)} htmlFor={input.name}>
        {input.label}
      </Label>
      <Select
        disabled={input.disabled}
        defaultValue={input.defaultValue?.toString()}
        name={input.name}
      >
        <SelectTrigger className={cn("w-full", input.className)}>
          <SelectValue
            placeholder={input.placeholder ?? "Seletionnez une valeur"}
          />
        </SelectTrigger>
        <SelectContent className={cn("", input.customclass)}>
          {input?.options?.map((option, index) => {
            if (option.value) {
              return (
                <SelectItem
                  key={`${index}_${option.label}`}
                  value={option.value.toString()}
                >
                  {option.label}
                </SelectItem>
              );
            }
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export const GenerateSelectPrestationWithCout = (
  input: SelectFieldPrestationWithCoutProps
) => {
  const [value, setValue] = useState(input.defaultValue);
  return (
    <div className="col-span-2 flex flex-col gap-4">
      <div className={cn("flex flex-col gap-2 col-span-2", input.classparent)}>
        <Label className={cn("", input.classlabel)} htmlFor={input.name}>
          {input.label}
        </Label>
        <Select
          defaultValue={input.defaultValue?.toString()}
          value={value?.toString()}
          onValueChange={setValue}
          name={input.name}
        >
          <SelectTrigger className={cn("w-full", input.className)}>
            <SelectValue
              placeholder={input.placeholder ?? "Seletionnez une valeur"}
            />
          </SelectTrigger>
          <SelectContent className={cn("", input.customclass)}>
            {input?.options?.map((option, index) => {
              if (option.value) {
                return (
                  <SelectItem
                    key={index + "_prestation"}
                    value={option.value.toString()}
                  >
                    {option.label}
                  </SelectItem>
                );
              }
            })}
          </SelectContent>
        </Select>
      </div>
      <div className={cn("flex flex-col gap-2 col-span-2", input.classparent)}>
        <Label className={cn("", input.classlabel)} htmlFor="cout_total">
          Coût Total
        </Label>
        <Input
          type="hidden"
          name="cout_total"
          value={
            input?.options?.find((option) => option.value === value)?.cout_total?.toString()
          }
        />
        <Select
          disabled
          defaultValue={input.defaultValue?.toString()}
          value={value?.toString()}
          name="cout_total"
        >
          <SelectTrigger
            className={cn("w-full disabled:opacity-95", input.className)}
          >
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent className={cn("", input.customclass)}>
            {input?.options?.map((option, index) => {
              if (option.value) {
                return (
                  <SelectItem
                    key={index + "_cout"}
                    value={option.value.toString()}
                  >
                    {option.cout_total}
                  </SelectItem>
                );
              }
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export const GenerateSelectMulti = (input: SelectFieldProps) => {
  interface MultiSelectOptionsProps {
    label: string;
    value: string;
    icon?: ComponentType<{ className?: string | undefined }> | undefined;
  }
  const optionsFormat: MultiSelectOptionsProps[] =
    input.options?.map((option) => {
      const op: MultiSelectOptionsProps = {
        label: option.label,
        value: option.value.toString(),
      };
      return op;
    }) ?? [];

  let defaultValue: string[] = [];

  if (input.defaultValue && typeof input.defaultValue === "string") {
    try {
      const parsedValue = JSON.parse(input.defaultValue);
      if (Array.isArray(parsedValue)) {
        defaultValue = parsedValue.map(String);
      } else if (typeof parsedValue === "object") {
        defaultValue = Object.values(parsedValue).map(String);
      } else {
        defaultValue = [String(parsedValue)];
      }
    } catch {
      defaultValue = [input.defaultValue]; // Si JSON.parse échoue, on garde la valeur originale
    }
  }

  const [selectedOptions, setSelectedOptions] = useState<string[] | undefined>(
    defaultValue
  );
  return (
    <div className={cn("flex flex-col gap-2 col-span-1", input.classparent)}>
      <Label className={cn("", input.classlabel)} htmlFor={input.name}>
        {input.label}
      </Label>
      <Input
        name={input.name}
        value={JSON.stringify(selectedOptions)}
        type="hidden"
      />
      <MultiSelect
        onValueChange={setSelectedOptions}
        options={optionsFormat}
        lang="fr"
        className={cn("w-full", input.className)}
        defaultValue={selectedOptions}
        placeholder={input.placeholder ?? "Seletionnez..."}
        variant="inverted"
        animation={2}
        maxCount={optionsFormat.length}
      />
    </div>
  );
};

export const generateTextarea = ({
  label,
  customclass,
  classlabel,
  classparent,
  ...input
}: TextareaFieldProps) => {
  return (
    <div className={cn("flex flex-col gap-2 col-span-2", classparent)}>
      <Label className={cn("", classlabel)} htmlFor={input.name}>
        {label}
      </Label>
      <Textarea {...input}></Textarea>
    </div>
  );
};

export const GenerateInputFileLogoAdministration = ({
  name,
  type,
  label = "",
  defaultValue = "",
  customclass,
  classlabel,
  classparent,
  ...input
}: InputFieldProps) => {
  const [file, setFile] = useState<File | undefined>();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUpload = event.target.files?.[0];
    if (fileUpload) {
      // Mettre à jour la valeur de l'input caché avec le nom du fichier
      const hiddenInput = document.getElementById(name) as HTMLInputElement;
      hiddenInput.value = fileUpload.name; // ou utilisez fileUpload pour d'autres informations
      setFile(fileUpload);
    }
  };

  return (
    <div className={cn("flex flex-col gap-2 col-span-2", classparent)}>
      <Label className={cn("", classlabel)} htmlFor={`file_${name}`}>
        {label}
      </Label>
      <Input type="hidden" defaultValue={defaultValue} name={name} id={name} />
      <Button
        id="file_logo_ad"
        onClick={async () => {
          if (file) {
            const response = await uploadingFile(file);
            if (response.success) toast.success("upload du logo avec success");
          }
        }}
        className="hidden"
      >
        up
      </Button>
      <Input
        type="file"
        id={`file_${name}`}
        // id="file_logo_ad"
        accept="image/*"
        multiple={false}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file && file.size <= 1048576) {
            // 1MB en octets
            handleFileChange(event);
          } else {
            toast.error("La taille de l'image ne peut pas dépasser 1MB.");
          }
        }}
        {...input}
      />
    </div>
  );
};

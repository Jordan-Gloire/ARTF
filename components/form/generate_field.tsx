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
  SelectFieldProps,
  TextareaFieldProps,
} from "@/types/fieldsprops";

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
      <Input {...input}></Input>
    </div>
  );
};

export const generateSelect = (input: SelectFieldProps) => {
  return (
    <div className={cn("flex flex-col gap-2 col-span-1", input.classparent)}>
      <Label className={cn("", input.classlabel)} htmlFor={input.name}>
        {input.label}
      </Label>
      <Select name={input.name}>
        <SelectTrigger className={cn("w-full", input.className)}>
          <SelectValue
            placeholder={input.placeholder ?? "Seletionnez une valeur"}
          />
        </SelectTrigger>
        <SelectContent>
          {input?.options?.map((option, index) => {
            if (option.value) {
              return (
                <SelectItem key={index} value={option.value.toString()}>
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

export const generateTextarea = ({
  label = "",
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

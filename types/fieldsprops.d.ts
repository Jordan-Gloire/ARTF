import { InputProps } from "@/components/ui/input";
import { TextareaProps } from "@/components/ui/textarea";
import { SelectProps } from "@radix-ui/react-select";

export interface CustomInputFieldInterface {
  name: string;
  label?: string;
  type: string;
  disabled?: boolean;
  defaultValue?: string;
  classparent?: string;
  placeholder?: string;
  className?: string;
  customclass?: string;
  classlabel?: string;
}

interface optionsProps {
  label: string;
  value: string | number;
}

export interface CustomSelectFieldProps extends CustomInputFieldInterface {
  options?: optionsProps[];
}

//update props
type InputFieldProps = InputProps & CustomInputFieldInterface;
type TextareaFieldProps = TextareaProps & CustomInputFieldInterface;
type SelectFieldProps = SelectProps & CustomSelectFieldProps;
type SelectFieldPrestationWithCoutProps = SelectProps &
  CustomInputFieldInterface & {
    options?: {
      label: string;
      value: string | number;
      cout_total?: string | number;
    }[];
  };

type CustomFieldProps = CustomInputFieldInterface | CustomSelectFieldProps;

export {
  InputFieldProps,
  TextareaFieldProps,
  SelectFieldProps,
  SelectFieldPrestationWithCoutProps,
  CustomFieldProps,
};

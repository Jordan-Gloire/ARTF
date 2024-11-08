import {
  generateInput,
  generateSelect,
  generateTextarea,
} from "./generate_field";




// une petite fonction pour un champ en fonction de son type
// le type inout est le type par défaut
export const GenerateFieldByType = ({
  type,
  input,
}: {
  type: string;
  input: any;
}) => {
  switch (type) {
    case "select":
      return generateSelect(input);
    case "textarea":
      return generateTextarea(input);
    default:
      return generateInput(input);
  }
};

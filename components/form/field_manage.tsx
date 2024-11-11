import {
  generateInput,
  GenerateInputFileLogoAdministration,
  generateSelect,
  GenerateSelectMulti,
  GenerateSelectPrestationWithCout,
  generateSwitch,
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
    case "select_multi":
      return GenerateSelectMulti(input);
    case "textarea":
      return generateTextarea(input);
    case "file_logo_ad":
      return GenerateInputFileLogoAdministration(input);
    case "switch":
      return generateSwitch(input);
    case "select_prestation_with_cout":
      return GenerateSelectPrestationWithCout(input);
    default:
      return generateInput(input);
  }
};

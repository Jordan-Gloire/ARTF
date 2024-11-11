import { ValueTypeDataRow } from "@/types/app_types";

//fonction pour avoir le value de le formulaire
export const extractValueInValueType = (value: ValueTypeDataRow): string => {
  if (typeof value === "string" || typeof value === "number") {
    return value.toString();
  } else if (value && typeof value === "object" && "id" in value) {
    return value.id.toString();
  }
  return "";
  // throw new Error("Invalid ValueTypeDataRow");
};

export const extractValueOptimizedForRow = (
  value: ValueTypeDataRow
): string => {
  if (typeof value === "string" || typeof value === "number") {
    return value.toString();
  } else if (typeof value === "object" && "id" in value) {
    // Rechercher une clé qui n'est pas "id" et qui a une valeur de type `string`
    const dynamicKey = Object.keys(value).find(
      (key) => key !== "id" && typeof value[key] === "string"
    );
    if (dynamicKey) {
      return value[dynamicKey].toString();
    }
    return value.id.toString();
  }

  return "";
};

export const isValueTypeDataRow = (value: any): value is ValueTypeDataRow => {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    (typeof value === "object" && value !== null && "id" in value)
  );
};



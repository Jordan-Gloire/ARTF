"use client";

import {
  AdministrationInterface,
  DefaultAppRowTypeInterface,
} from "@/types/app_types";
import { CellContext } from "@tanstack/react-table";
import Link from "next/link";
import { extractValueOptimizedForRow } from "./app_hooks";
import { OverrideLink } from "@/components/custom/ui/override-link";
import { useAppStore } from "../stores/app_store";

// export const cellLink = (url: string, label: string) => {};
export const cellColor = (props: CellContext<any, any>) => {
  //   console.log("color input", extractValueOptimizedForRow(props.getValue()));

  return (
    <input
      type="color"
      disabled
      value={extractValueOptimizedForRow(props.getValue())}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed"
    />
  );
};

export const cellMoney = (props: CellContext<any, any>) => {
  //   console.log("color input", extractValueOptimizedForRow(props.getValue()));

  if (props.getValue()) {
    return (
      <span>
        {new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "XAF",
        }).format(Number(props.getValue()))}
      </span>
    );
  }

  return <></>;
};

//link
export const CellLinkAdministration = (
  cell: CellContext<AdministrationInterface, any>
) => {
  // const updateAdministration = useAppStore(
  //   (state) => state.updateCurrentAdministration
  // );
  // const updateTitle = useAppStore((state) => state.updateTitle);

  const data = cell.row.original;

  return (
    <OverrideLink
      onClick={() => {
        // console.log({ data });
        localStorage.setItem(`current_ad_${data.uuid}`, JSON.stringify(data));
        // updateTitle(data.nom);
        //console.log("Administration mise à jour avec les données :", data); // Ajout d'un log pour vérifier
      }}
      href={`/administrations/${data.uuid}`}
    >
      {extractValueOptimizedForRow(cell.getValue())}
    </OverrideLink>
  );
};

export const CellLinkPrestation = (
  cell: CellContext<DefaultAppRowTypeInterface, any>
) => {
  const administrationId = useAppStore((state) => state.administrationId);

  return (
    <Link
      href={`/administrations/${administrationId}/prestations/${cell.row.original.id}`}
    >
      {extractValueOptimizedForRow(cell.getValue())}
    </Link>
  );
};

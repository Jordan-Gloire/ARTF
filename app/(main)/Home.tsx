"use client";
import ItemMenu from "@/components/custom/ui/ItemMenu";
import { itemMenuBorderWith } from "@/src/lib/utils/constantes";
import { useAppStore } from "@/src/stores/app_store";
import {
  LineChart,
  Landmark,
  SquareLibrary,
  Users,
  UserRoundCog,
  HandCoinsIcon,
  Building2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export default function Home() {
  // const session = useSession();

  // useEffect(() => {
  //   console.log({ session });
  // }, [session]);

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-4">
        <ItemMenu
          isMain
          link="/dashboard"
          titre="Rapport Stat"
          icon={<LineChart strokeWidth={itemMenuBorderWith} size={80} />}
        />
        <ItemMenu
          isMain
          link="/operation"
          titre="Opérations"
          icon={<HandCoinsIcon strokeWidth={itemMenuBorderWith} size={80} />}
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {/* <ItemMenu
          link="/partenaires"
          titre="Partenaires"
          icon={<Users strokeWidth={itemMenuBorderWith} size={65} />}
        /> */}
        {/* <ItemMenu
          link="/prestations"
          titre="Prestations"
          icon={<SquareLibrary strokeWidth={itemMenuBorderWith} size={65} />}
        /> */}
        <ItemMenu
          link="/utilisateurs"
          titre="Utilisateurs"
          icon={<UserRoundCog strokeWidth={itemMenuBorderWith} size={65} />}
        />
        <ItemMenu
          link="/organisations"
          titre="Organisations"
          icon={<Building2 strokeWidth={itemMenuBorderWith} size={65} />}
        />
      </div>
    </div>
  );
}

import React from 'react'
import ItemMenu from '@/components/custom/ui/ItemMenu';
import { Landmark, LineChart, UserRoundCog, Users, Banknote, HandCoins } from 'lucide-react';
// import { itemMenuBorderWith } from '@/lib/utils/constantes';
import { itemMenuBorderWith } from "@/src/lib/utils/constantes";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
    {/* Dashboard en haut */}
    <div className="flex items-center gap-4">
      <ItemMenu
        isMain
        link="/Dashboard"
        titre="Dashboard"
        icon={<LineChart strokeWidth={itemMenuBorderWith} size={80} />}
      />
    </div>
  
    {/* Utilisateurs et Caisse en bas */}
    <div className="flex flex-wrap items-center gap-4">
      <ItemMenu
        link="/Utilisateur"
        titre="Utilisateurs"
        icon={<UserRoundCog strokeWidth={itemMenuBorderWith} size={65} />}
      />
      <ItemMenu
        link="/Caisse"
        titre="Caisse"
        icon={<HandCoins strokeWidth={itemMenuBorderWith} size={65} />}
      />
        
    </div>
  </div>
  
  )
}

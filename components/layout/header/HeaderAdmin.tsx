import CustomLink, { CustomLinkGroups } from "../../custom/ui/CustomLink";
import {
  HandCoins,
  Landmark,
  LineChart,
  Settings,
  UserRoundCog,
  Users,
} from "lucide-react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { SiteConfig } from "@/src/lib/utils/site-config";
import { Typography } from "@/components/custom/Typography";

export function HeaderAdmin() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Typography variant="h3" as={Link} href="/">
        {SiteConfig.title}
      </Typography>
      <nav className="flex items-center space-x-1">
        {/* Navigation Market place, etc... */}
        <div className="mx-4 flex gap-4">
          <CustomLink
            icon={<LineChart strokeWidth={1} />}
            text="Rapport Stat"
            link="/dashboard"
          />
          <CustomLink
            icon={<HandCoins strokeWidth={1}/>}
            
            text="Opérations"
            link="/operation"
          />
          <CustomLinkGroups
            trigger={
              <Button variant="outline" className="flex gap-2">
                <Settings strokeWidth={1.5} /> <span>Paramètres</span>
              </Button>
            }
            listCustomLink={[
              // <CustomLink
              //   key={0}
              //   icon={<Users strokeWidth={1} />}
              //   text="Partenaires"
              //   link="/partenaires"
              //   variant="link"
              // />,
              // // <CustomLink
              //   key={1}
              //   icon={<SquareLibrary strokeWidth={1} />}
              //   text="Prestations"
              //   link="/prestations"
              //   variant="link"
              // />,
              <CustomLink
                key={3}
                icon={<UserRoundCog strokeWidth={1} />}
                text="Utilisateurs"
                link="/utilisateurs"
                variant="link"
              />,
              <CustomLink
                key={3}
                icon={<UserRoundCog strokeWidth={1} />}
                text="Organisations"
                link="/organisations"
                variant="link"
              />,
            ]}
          />
        </div>
      </nav>
    </div>
  );
}

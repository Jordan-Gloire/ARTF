import CustomLink, { CustomLinkGroups } from "../../custom/ui/CustomLink";
import {
  Cog,
  HandCoins,
  LineChart,
  MapPinned,
  Notebook,
  Settings,
  SquareLibrary,
  UserRoundCog,
  Users,
} from "lucide-react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { Typography } from "@/components/custom/Typography";

export function HeaderAdministration({
  administrationId = "null",
  appTitle = ''
}: Readonly<{
  administrationId: string;
  appTitle: string;
}>) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Typography
        variant="h3"
        as={Link}
        href={`/administrations/${administrationId}/`}
      >
        CN-{appTitle}
      </Typography>
      <nav className="flex items-center space-x-1">
        {/* Navigation Market place, etc... */}
        <div className="mx-4 flex gap-4">
          <CustomLink
            icon={<LineChart strokeWidth={1} />}
            text="Rapport Stat"
            link={`/administrations/${administrationId}/dashboard`}
          />
          <CustomLink
            icon={<HandCoins strokeWidth={1} />}
            text="Caisse"
            link={`/administrations/${administrationId}/caisse`}
          />
          <CustomLink
            icon={<Notebook strokeWidth={1} />}
            text="Opérations de caisses"
            link={`/administrations/${administrationId}/operation`}
          />
          <CustomLinkGroups
            trigger={
              <Button variant="outline" className="flex gap-2">
                <Settings strokeWidth={1.5} /> <span>Paramètres</span>
              </Button>
            }
            listCustomLink={[
              <CustomLink
                key={3}
                icon={<UserRoundCog strokeWidth={1} />}
                text="Utilisateurs"
                link={`/administrations/${administrationId}/utilisateurs`}
                variant="link"
              />,
              <CustomLink
                key={3}
                icon={<UserRoundCog strokeWidth={1} />}
                text="Organisations"
                link={`/administrations/${administrationId}/organisations`}
                variant="link"
              />,
            ]}
          />
        </div>
      </nav>
    </div>
  );
}

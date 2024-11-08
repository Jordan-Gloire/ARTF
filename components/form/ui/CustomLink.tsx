import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CustomLink = ({
  text = "",
  link,
  icon,
  variant = "link",
}: {
  text: string;
  link: string;
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
  icon: React.ReactNode;
}) => {
  return (
    <Button variant={variant} asChild>
      <Link href={link} className="flex gap-2">
        {icon} <span>{text}</span>
      </Link>
    </Button>
  );
};

export default CustomLink;

const CustomLinkGroups = ({
  trigger,
  listCustomLink,
}: {
  trigger: React.ReactNode;
  listCustomLink: React.ReactNode[];
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuLabel>Paramètres</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {listCustomLink.map((CustomLinkComponent, index) => {
          return (
            <DropdownMenuItem key={index}>
              {CustomLinkComponent}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { CustomLinkGroups };

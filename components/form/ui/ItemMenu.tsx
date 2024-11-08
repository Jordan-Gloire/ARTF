import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ItemMenuProps {
  isMain?: boolean;
  icon: React.ReactNode;
  titre?: string;
  link: string;
}

export default function ItemMenu({
  isMain = false,
  ...props
}: Readonly<ItemMenuProps>) {
  return (
    <Card
      className={`rounded-xl px-4 hover:opacity-75 hover:border-4 ${
        isMain ? "min-w-64 h-44" : "min-w-48 h-32"
      }`}
    >
      <Link href={props.link}>
        <CardContent className="flex size-full flex-col items-center justify-center gap-2 p-6">
          {props.icon}
          <span
            className={`font-semibold ${
              isMain ? "" : "text-sm"
            } `}
          >
            {props.titre}
          </span>
        </CardContent>
      </Link>
    </Card>
  );
}

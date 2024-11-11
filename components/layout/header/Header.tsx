import Link from "next/link";
import { SiteConfig } from "@/src/lib/utils/site-config";
import { Typography } from "../../custom/Typography";
import { ThemeToggle } from "../../theme/ThemeToggle";
import AuthButton from "../../features/auth/AuthButton";

import HeaderDynamic from "./HeaderDynamic";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background print:hidden">
      {/* <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0"> */}
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <HeaderDynamic />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <AuthButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

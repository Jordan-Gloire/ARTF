import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/src/lib/utils";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";
import { SiteConfig } from "@/src/lib/utils/site-config";
import { Providers } from "./Providers";
import { TailwindIndicator } from "../src/lib/utils/TailwindIndicator";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased print:bg-white",
          fontSans.variable
        )}
      >
        <Providers>
          {/* <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div> */}

          {children}
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}

import { Header } from "@/components/layout/header/Header";
import CustomTitle from "@/components/layout/CustomTitle";

import {
  Layout,
  LayoutHeader,
  LayoutContent,
} from "@/components/layout/Layout";

export default function LayoutHome({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        <Layout>
          {/* <LayoutHeader>
            <CustomTitle />
          </LayoutHeader> */}
          <LayoutContent className="pt-8">{children}</LayoutContent>
        </Layout>
      </div>
    </div>
  );
}

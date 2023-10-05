import "../../../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideBarTwoColumn from "../components/sidebarnav";
import getAdminUser from "@/app/data/admin/getadminuser";
import { redirect } from "next/navigation";
import TanStackProvider from "@/app/components/tanstackprovides";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AOAP Admin",
  description: "AOAP Admin",
};

export default async function AdminMainRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAdminUser();
  if (!user) {
    redirect("/admin");
  }
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${inter.className} h-full`}>
        <SideBarTwoColumn user={user}>
          <TanStackProvider>{children}</TanStackProvider>
        </SideBarTwoColumn>
      </body>
    </html>
  );
}

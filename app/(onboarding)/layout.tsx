import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TanStackProvider from "../components/tanstackprovides";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AOAP",
  description: "Amrita Entrance Examination",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${inter.className} h-full`}>
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}

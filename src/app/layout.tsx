import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./reset.css";
import StyledComponentsRegistry from "@/providers/styled-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Faug",
  description: "A Minimoog Model D emulation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}

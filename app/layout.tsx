import type { Metadata } from "next";
import "./globals.css";
import { solverConfig } from "./config/solver";

const siteUrl = solverConfig.metadata.siteUrl;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  icons: { icon: "/assets/solver-logo.webp" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}

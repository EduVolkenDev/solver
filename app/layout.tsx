import type { Metadata } from "next";
import "./globals.css";
import { solverConfig } from "./config/solver";

const siteUrl = solverConfig.metadata.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: solverConfig.metadata.title,
  description: solverConfig.metadata.description,
  keywords: [...solverConfig.metadata.keywords],
  authors: [{ name: solverConfig.metadata.author }],
  creator: solverConfig.metadata.author,
  publisher: solverConfig.metadata.author,
  applicationName: solverConfig.brand.displayName,
  robots: { index: true, follow: true },
  icons: { icon: "/assets/solver-logo.webp" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* The App Router owns the document head; this rule only applies to the legacy pages router. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { solverConfig } from "./config/solver";
import AnalyticsTracker from "./components/solver/AnalyticsTracker";

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
  manifest: "/assets/solver-favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/assets/solver-favicon/favicon.ico", sizes: "48x48" },
      { url: "/assets/solver-favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/solver-favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/assets/solver-favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/assets/solver-favicon/favicon.ico"],
  },
  verification: solverConfig.google.siteVerification
    ? { google: solverConfig.google.siteVerification }
    : undefined,
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
        {solverConfig.google.analyticsId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${solverConfig.google.analyticsId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${solverConfig.google.analyticsId}',{anonymize_ip:true});`,
              }}
            />
          </>
        ) : null}
      </head>
      <body>
        {children}
        <AnalyticsTracker />
      </body>
    </html>
  );
}

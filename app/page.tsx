import type { Metadata } from "next";
import SolverLanding from "./components/solver/SolverLanding";
import { solverConfig } from "./config/solver";

export const metadata: Metadata = {
  title: solverConfig.metadata.title,
  description: solverConfig.metadata.description,
  keywords: [...solverConfig.metadata.keywords],
  authors: [{ name: solverConfig.metadata.author }],
  alternates: { canonical: "/" },
  openGraph: {
    title: solverConfig.metadata.title,
    description: solverConfig.metadata.description,
    url: solverConfig.metadata.siteUrl,
    type: "website",
    locale: "en_GB",
    images: [{ url: "/assets/solver-hero.webp", width: 1800, height: 1013, alt: "Warm boutique accommodation interior in London" }],
  },
  twitter: {
    card: "summary_large_image",
    title: solverConfig.metadata.title,
    description: solverConfig.metadata.description,
    images: ["/assets/solver-hero.webp"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: solverConfig.brand.legalName,
  alternateName: solverConfig.brand.displayName,
  description: solverConfig.metadata.description,
  url: solverConfig.metadata.siteUrl,
  image: `${solverConfig.metadata.siteUrl}/assets/solver-hero.webp`,
  areaServed: { "@type": "City", name: solverConfig.contact.city },
  slogan: solverConfig.brand.slogan,
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SolverLanding />
    </>
  );
}

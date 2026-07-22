const publicSiteUrl = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SITE_URL?.trim() : "";
const publicWhatsAppNumber = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ?? "" : "";
const configuredWhatsAppNumber = publicWhatsAppNumber || "447557287333";
const publicEmail = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "" : "";
const publicAirbnbUrl = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_AIRBNB_URL?.trim() ?? "" : "";
const publicBookingUrl = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_BOOKING_URL?.trim() ?? "" : "";
const publicGoogleAnalyticsId = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?.trim() ?? "" : "";
const publicGoogleSiteVerification = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ?? "" : "";
const publicGoogleMapsQuery = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_QUERY?.trim() ?? "" : "";
const googleMapsQuery = publicGoogleMapsQuery || "London, United Kingdom";

export const solverConfig = {
  brand: {
    legalName: "Solver Accommodation K&D Limited",
    displayName: "Solver Accommodations",
    markAlt: "Solver Accommodations mark",
    slogan: "Your stay, solved.",
  },
  contact: {
    whatsappNumber: configuredWhatsAppNumber,
    email: publicEmail,
    city: "London",
    country: "United Kingdom",
    serviceArea: "London, United Kingdom",
  },
  platforms: {
    airbnb: publicAirbnbUrl,
    bookingCom: publicBookingUrl,
  },
  google: {
    analyticsId: publicGoogleAnalyticsId,
    siteVerification: publicGoogleSiteVerification,
    mapsQuery: googleMapsQuery,
    mapsEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(googleMapsQuery)}&output=embed`,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(googleMapsQuery)}`,
  },
  metadata: {
    title: "Solver Accommodations | Short-Term Stays in London",
    description:
      "Comfortable stays and thoughtfully solved short-term accommodation in London for business trips, city breaks, university visits and property owners.",
    siteUrl: (publicSiteUrl || "https://solveraccommodations.com").replace(/\/+$/, ""),
    author: "Solver Accommodations",
    keywords: [
      "short term accommodation london",
      "serviced apartments london",
      "business stay london",
      "short term property management london",
      "holiday let management london",
    ],
  },
  launch: {
    bookingExperienceLabel: "A new booking experience is coming soon.",
    directBookingReady: false,
  },
  features: {
    multiLanguage: false,
    directBooking: false,
    newsletter: false,
  },
  localization: {
    defaultLanguage: "en",
    availableLanguages: ["en"],
  },
  navigation: [
    { label: "Home", href: "#home" },
    { label: "Our Stays", href: "#stays" },
    { label: "Property Management", href: "#management" },
    { label: "About", href: "#about" },
    { label: "FAQs", href: "#faqs" },
    { label: "Contact", href: "#contact" },
  ],
  primaryNavigationCta: { label: "Check Availability", href: "#availability" },
} as const;

export const defaultWhatsAppMessage =
  "Hello, I found Solver Accommodations through the website and I would like to enquire about availability for a short stay in London.";

export function buildWhatsAppLink(message = defaultWhatsAppMessage) {
  const number = (solverConfig.contact.whatsappNumber ?? "").replace(/\D/g, "");

  if (!number) return null;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getConfiguredContactHref(message?: string) {
  return buildWhatsAppLink(message) ?? "#contact";
}

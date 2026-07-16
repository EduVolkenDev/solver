const publicSiteUrl = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SITE_URL?.trim() : "";
const publicWhatsAppNumber = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ?? "" : "";
const publicEmail = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "" : "";
const publicAirbnbUrl = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_AIRBNB_URL?.trim() ?? "" : "";
const publicBookingUrl = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_BOOKING_URL?.trim() ?? "" : "";

export const solverConfig = {
  brand: {
    legalName: "Solver Accommodation K&D Limited",
    displayName: "Solver Accommodations",
    markAlt: "Solver Accommodations mark",
    slogan: "Your stay, solved.",
  },
  contact: {
    whatsappNumber: publicWhatsAppNumber,
    email: publicEmail,
    city: "London",
    country: "United Kingdom",
    serviceArea: "London, United Kingdom",
  },
  platforms: {
    airbnb: publicAirbnbUrl,
    bookingCom: publicBookingUrl,
  },
  metadata: {
    title: "Solver Accommodation | Short-Term Stays in London",
    description:
      "Flexible short-term accommodation in London for business travellers, tourists and visiting students. Contact Solver Accommodation to enquire about availability.",
    siteUrl: (publicSiteUrl || "https://solveraccommodations.com").replace(/\/+$/, ""),
    author: "Solver Accommodation K&D Limited",
    keywords: [
      "short term accommodation london",
      "serviced apartments london",
      "business stay london",
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
    { label: "About", href: "#about" },
    { label: "Stays", href: "#stays" },
    { label: "Location", href: "#location" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export const defaultWhatsAppMessage =
  "Hello, I found Solver Accommodation through the website and I would like to enquire about availability for a short stay in London.";

export function buildWhatsAppLink(message = defaultWhatsAppMessage) {
  const number = (solverConfig.contact.whatsappNumber ?? "").replace(/\D/g, "");

  if (!number) return null;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getConfiguredContactHref(message?: string) {
  return buildWhatsAppLink(message) ?? "#contact";
}

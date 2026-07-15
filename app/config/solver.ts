export const solverConfig = {
  brand: {
    legalName: "Solver Accommodation K&D Limited",
    displayName: "Solver Accommodations",
    markAlt: "Solver Accommodations mark",
    slogan: "Your stay, solved.",
  },
  contact: {
    whatsappNumber: "",
    email: "",
    city: "London",
    country: "United Kingdom",
    serviceArea: "London, United Kingdom",
  },
  platforms: {
    airbnb: "",
    bookingCom: "",
  },
  metadata: {
    title: "Solver Accommodation | Short-Term Stays in London",
    description:
      "Flexible short-term accommodation in London for business travellers, tourists and visiting students. Contact Solver Accommodation to enquire about availability.",
    siteUrl: "",
  },
  launch: {
    bookingExperienceLabel: "A new booking experience is coming soon.",
    directBookingReady: false,
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
  const number = solverConfig.contact.whatsappNumber.replace(/\D/g, "");

  if (!number) return null;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getConfiguredContactHref(message?: string) {
  return buildWhatsAppLink(message) ?? "#contact";
}

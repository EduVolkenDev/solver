import type { Metadata } from "next";
import { LegalPage } from "../components/solver/LegalPage";
import { solverConfig } from "../config/solver";

const lastUpdated = "July 2026";

export const metadata: Metadata = {
  title: "Privacy Policy | Solver Accommodation",
  description: "How Solver Accommodation K&D Limited collects, uses and protects your personal data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated={lastUpdated} icon="/assets/solver-icons/solver-icons-select26.webp">
      <p>
        {solverConfig.brand.legalName} (&quot;Solver&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;), company number [COMPANY REGISTRATION NUMBER], registered office at [REGISTERED OFFICE ADDRESS], is the data controller responsible for your personal data when you use solveraccommodations.com (the &quot;Site&quot;) or contact us to enquire about a stay.
      </p>
      <p>
        This policy explains what personal data we collect, why we collect it, how we use it and what rights you have. It is written to comply with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
      </p>

      <h2>1. Data we collect</h2>
      <p>We may collect the following personal data:</p>
      <ul>
        <li><strong>Contact details</strong> you provide when you enquire, such as your name, phone number and email address;</li>
        <li><strong>Enquiry and booking details</strong>, such as your travel dates, number of guests and reason for travel;</li>
        <li><strong>Communications</strong> you send us via WhatsApp, email or any other channel, including the content of those messages;</li>
        <li><strong>Technical data</strong>, such as general information about how you interact with the Site (for example, via analytics or hosting logs), which does not directly identify you.</li>
      </ul>
      <p>
        We do not currently collect payment information directly through the Site. If you book through a third-party platform such as Airbnb or Booking.com, that platform collects and processes your payment and booking data under its own privacy policy.
      </p>

      <h2>2. How we use your data</h2>
      <p>We use your personal data to:</p>
      <ul>
        <li>Respond to your enquiries and communicate with you about a possible stay;</li>
        <li>Arrange and manage confirmed bookings;</li>
        <li>Provide support before, during and after your stay;</li>
        <li>Comply with our legal, tax and regulatory obligations;</li>
        <li>Improve the Site and our services.</li>
      </ul>

      <h2>3. Our legal basis for processing</h2>
      <p>We rely on the following legal bases under UK GDPR:</p>
      <ul>
        <li><strong>Contract</strong> — to respond to your enquiry and, where applicable, to arrange or perform a booking with you;</li>
        <li><strong>Legitimate interests</strong> — to operate and improve the Site and our communication channels, in a way that does not override your rights;</li>
        <li><strong>Legal obligation</strong> — to comply with applicable law, such as tax and accommodation-related record-keeping requirements;</li>
        <li><strong>Consent</strong> — where we ask for it specifically, such as for optional marketing communications.</li>
      </ul>

      <h2>4. Who we share your data with</h2>
      <p>We may share your data with:</p>
      <ul>
        <li><strong>WhatsApp / Meta</strong>, as the platform we use for direct messaging with you;</li>
        <li><strong>Booking platforms</strong> such as Airbnb and Booking.com, where your stay is arranged or confirmed through those platforms;</li>
        <li><strong>Service providers</strong> who support our operations (for example, hosting or communication tools), acting under our instructions;</li>
        <li><strong>Authorities</strong>, where required by law, such as tax authorities or law enforcement.</li>
      </ul>
      <p>We do not sell your personal data to third parties.</p>

      <h2>5. International data transfers</h2>
      <p>
        Some of the third parties we use, including WhatsApp/Meta and certain booking platforms, may process data outside the UK. Where this happens, we rely on appropriate safeguards, such as standard contractual clauses or the provider&apos;s own UK/EU-recognised transfer mechanisms, to protect your data.
      </p>

      <h2>6. How long we keep your data</h2>
      <p>
        We keep enquiry and booking data for as long as necessary to respond to you, manage any booking, meet our legal and tax obligations, and resolve any disputes, after which it is deleted or anonymised.
      </p>

      <h2>7. Cookies and similar technologies</h2>
      <p>
        The Site may use essential cookies or similar technologies necessary for it to function, and may use analytics tools to understand general usage of the Site. Where the Site embeds third-party content (such as a WhatsApp chat link or a map), that third party may set its own cookies in line with its own policy. Where required by law, we will ask for your consent before using non-essential cookies. You can control cookies through your browser settings at any time.
      </p>

      <h2>8. Your rights</h2>
      <p>Under UK GDPR, you have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you;</li>
        <li>Ask us to correct inaccurate data;</li>
        <li>Ask us to delete your data, in certain circumstances;</li>
        <li>Object to or restrict certain processing;</li>
        <li>Ask for your data to be provided to you in a portable format;</li>
        <li>Withdraw consent at any time, where processing is based on consent.</li>
      </ul>
      <p>
        To exercise any of these rights, contact us at {solverConfig.contact.email || "[CONTACT EMAIL]"}. You also have the right to complain to the UK Information Commissioner&apos;s Office (ICO) at ico.org.uk if you believe your data has not been handled correctly.
      </p>

      <h2>9. Data security</h2>
      <p>
        We take reasonable technical and organisational measures to protect your personal data against unauthorised access, loss or misuse. However, no method of transmission over the internet or messaging platforms is completely secure.
      </p>

      <h2>10. Children&apos;s data</h2>
      <p>The Site and our services are intended for adults arranging their own accommodation. We do not knowingly collect personal data from children.</p>

      <h2>11. Changes to this policy</h2>
      <p>We may update this Privacy Policy from time to time. The date at the top of this page shows when it was last updated.</p>

      <h2>12. Contact us</h2>
      <p>
        For any questions about this Privacy Policy or how we handle your data, contact us at {solverConfig.contact.email || "[CONTACT EMAIL]"} or via WhatsApp through the Site.
      </p>
    </LegalPage>
  );
}

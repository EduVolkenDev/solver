import type { Metadata } from "next";
import { LegalPage } from "../components/solver/LegalPage";
import { solverConfig } from "../config/solver";

const lastUpdated = "July 2026";

export const metadata: Metadata = {
  title: "Terms of Service | Solver Accommodation",
  description: "Terms of Service for Solver Accommodation K&D Limited, provider of short-term accommodation in London.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated={lastUpdated}>
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your use of the website solveraccommodations.com (the &quot;Site&quot;) and any enquiry, communication or booking-related interaction you have with {solverConfig.brand.legalName} (&quot;Solver&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;), a company registered in England and Wales under company number [COMPANY REGISTRATION NUMBER], with its registered office at [REGISTERED OFFICE ADDRESS].
      </p>
      <p>
        By using the Site or contacting us through WhatsApp, email or any other channel, you agree to these Terms. If you do not agree, please do not use the Site or contact us.
      </p>

      <h2>1. Who we are and what we do</h2>
      <p>
        Solver provides professionally managed short-term accommodation in London for business travellers, short-stay visitors and visiting students. The Site is informational: it describes our accommodation and allows you to make an enquiry. It does not currently process payments or confirm bookings directly.
      </p>

      <h2>2. Enquiries and bookings</h2>
      <p>
        Enquiries made through WhatsApp or any contact method on the Site do not constitute a confirmed booking. A booking is only confirmed once we have agreed the dates, price and terms directly with you, or once a booking has been completed through a third-party platform such as Airbnb or Booking.com.
      </p>
      <p>
        Where you book through a third-party platform, that platform&apos;s own terms, cancellation policy and payment terms apply to your booking in addition to these Terms. We are not responsible for the operation, availability or policies of third-party platforms.
      </p>

      <h2>3. Pricing and availability</h2>
      <p>
        Any pricing or availability information shared with you, whether on the Site or via WhatsApp, is indicative and subject to confirmation. We reserve the right to correct errors, update pricing and decline any enquiry or booking request at our discretion.
      </p>

      <h2>4. Your responsibilities</h2>
      <p>When you stay with us or make an enquiry, you agree to:</p>
      <ul>
        <li>Provide accurate information about yourself and your stay;</li>
        <li>Use the accommodation lawfully and respectfully, and in a way that does not cause damage, nuisance or disturbance;</li>
        <li>Comply with any house rules communicated to you before or during your stay;</li>
        <li>Be responsible for any guests you bring to the property.</li>
      </ul>

      <h2>5. Cancellations and changes</h2>
      <p>
        Cancellation terms will be confirmed with you directly at the time of booking, or will follow the cancellation policy of the third-party platform used to book. We recommend reviewing these terms before confirming any stay.
      </p>

      <h2>6. Intellectual property</h2>
      <p>
        All content on the Site, including text, images, graphics and the Solver name and branding, is owned by or licensed to {solverConfig.brand.legalName} and may not be copied, reproduced or used without our prior written permission.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        We take reasonable care to ensure the information on the Site is accurate, but we do not guarantee that it is complete, current or error-free. To the fullest extent permitted by law, {solverConfig.brand.legalName} shall not be liable for any indirect, incidental or consequential loss arising from your use of the Site or reliance on information provided through it. Nothing in these Terms limits our liability for death or personal injury caused by our negligence, or for fraud, or any other liability that cannot lawfully be excluded.
      </p>

      <h2>8. Third-party platforms</h2>
      <p>
        Where a stay is booked or facilitated through a third-party platform (such as Airbnb, Booking.com or WhatsApp/Meta), your use of that platform is governed by that platform&apos;s own terms and privacy practices, which we encourage you to review.
      </p>

      <h2>9. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time to reflect changes to our services or for legal reasons. The date at the top of this page shows when these Terms were last updated. Continued use of the Site after changes take effect means you accept the updated Terms.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These Terms are governed by the laws of England and Wales. Any disputes arising from these Terms or your use of the Site will be subject to the exclusive jurisdiction of the courts of England and Wales.
      </p>

      <h2>11. Contact us</h2>
      <p>
        If you have any questions about these Terms, please contact us at {solverConfig.contact.email || "[CONTACT EMAIL]"} or via WhatsApp through the Site.
      </p>
    </LegalPage>
  );
}

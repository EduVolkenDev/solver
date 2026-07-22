"use client";

/* Local WebP assets intentionally use <img>: the vinext dev image optimizer is
 * incompatible with this Cloudflare starter's client runtime. */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import {
  buildWhatsAppLink,
  defaultWhatsAppMessage,
  getConfiguredContactHref,
  solverConfig,
} from "../../config/solver";
import { Icon } from "./Icon";

const heroImage = "/assets/solver-hero.webp";
const brandWordmarkImage = "/assets/new-solver-wordmark-complete.webp";
const signatureDoorImage = "/assets/solver-signature-door.webp";

const identityIcons = {
  building: "/assets/solver-icons-select1.webp",
  calendar: "/assets/solver-icons-select10.webp",
  bed: "/assets/solver-icons-select2.webp",
  globe: "/assets/solver-icons-select14.webp",
  home: "/assets/solver-icons-select7.webp",
  keys: "/assets/solver-icons-select9.webp",
  mail: "/assets/solver-icons-select18.webp",
  plane: "/assets/solver-icons-select22.webp",
  shield: "/assets/solver-icons-select16.webp",
  train: "/assets/solver-icons-select23.webp",
  whatsapp: "/assets/solver-icons-select17.webp",
  wifi: "/assets/solver-icons-select15.webp",
} as const;

const detailIcons = {
  tag: "/assets/solver-icons-select11.webp",
  info: "/assets/solver-icons-select12.webp",
  pin: "/assets/solver-icons-select13.webp",
  camera: "/assets/solver-icons-select19.webp",
  star: "/assets/solver-icons-select20.webp",
  bell: "/assets/solver-icons-select21.webp",
  car: "/assets/solver-icons-select24.webp",
  card: "/assets/solver-icons-select25.webp",
  lock: "/assets/solver-icons-select26.webp",
  clock: "/assets/solver-icons-select27.webp",
  user: "/assets/solver-icons-select28.webp",
  question: "/assets/solver-icons-select29.webp",
  wifi: "/assets/solver-icons-select3.webp",
  keys: "/assets/solver-icons-select4.webp",
  headphones: "/assets/solver-icons-select5.webp",
  shield: "/assets/solver-icons-select6.webp",
  bed: "/assets/solver-icons-select8.webp",
  luggage: "/assets/solver-icons-utils2.png",
} as const;

const superIcons = {
  camera: "/assets/solver-icons-super2.webp",
  calendar: "/assets/solver-icons-super5.webp",
  location: "/assets/solver-icons-super1.webp",
  shield: "/assets/solver-icons-super4.webp",
  suitcase: "/assets/solver-icons-super7.webp",
  whatsapp: "/assets/solver-icons-super3.webp",
  wifi: "/assets/solver-icons-super6.webp",
} as const;

const trustHighlights = [
  { src: identityIcons.home, text: "Short stays in London" },
  { src: identityIcons.bed, text: "Comfort-led accommodation" },
  { src: identityIcons.keys, text: "Simple arrival details" },
  { src: identityIcons.whatsapp, text: "Fast WhatsApp assistance" },
  { src: identityIcons.globe, text: "Trusted booking platforms" },
] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  return (
    <div className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

function useRevealObserver() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal");
    if (!items.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function useScrolledHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
}

function BrandLogo({ compact = false, placement = "header" }: { compact?: boolean; placement?: "header" | "footer" }) {
  return (
    <a className={`brand-lockup brand-lockup--${placement} ${compact ? "brand-lockup--compact" : ""}`} href="#home" aria-label="Solver Accommodations home">
      <img className="brand-lockup__complete" src={brandWordmarkImage} alt="Solver Accommodations — Your stay, solved." width="3096" height="1376" loading={compact || placement === "footer" ? "eager" : "lazy"} />
    </a>
  );
}

function WhatsAppLink({ children, className = "button button--gold", message = defaultWhatsAppMessage, analyticsLabel = "WhatsApp enquiry" }: { children: React.ReactNode; className?: string; message?: string; analyticsLabel?: string }) {
  const href = getConfiguredContactHref(message);
  const configured = Boolean(buildWhatsAppLink(message));

  return (
    <a className={`${className}${configured ? "" : " is-config-pending"}`} href={href} data-configured={configured} data-analytics-event="whatsapp_enquiry" data-analytics-label={analyticsLabel}>
      {children}
    </a>
  );
}

function SectionIntro({ eyebrow, title, body, align = "left", headingId }: { eyebrow: string; title: React.ReactNode; body?: string; align?: "left" | "center"; headingId?: string }) {
  return (
    <div className={`section-intro section-intro--${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={headingId}>{title}</h2>
      {body ? <p className="section-intro__body">{body}</p> : null}
    </div>
  );
}

function IdentityIcon({ src, className = "", width = 1530, height = 1326 }: { src: string; className?: string; width?: number; height?: number }) {
  return <img className={`identity-icon ${className}`} src={src} alt="" width={width} height={height} loading="lazy" />;
}

function StayFinder() {
  const [form, setForm] = useState({ checkIn: "", checkOut: "", guests: "", area: "" });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitFinder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const details = [
      form.checkIn ? `Check-in: ${form.checkIn}` : "",
      form.checkOut ? `Check-out: ${form.checkOut}` : "",
      form.guests ? `Guests: ${form.guests}` : "",
      form.area ? `Preferred area: ${form.area}` : "",
    ].filter(Boolean);
    const message = `Hello, I would like to find a Solver stay in London.${details.length ? `\n${details.join("\n")}` : ""}`;
    const contactHref = getConfiguredContactHref(message);
    const whatsappWindow = window.open(contactHref, "_blank", "noopener,noreferrer");
    if (!whatsappWindow) window.location.assign(contactHref);
  };

  return (
    <section className="section section--finder" id="availability" aria-labelledby="finder-title">
      <div className="container finder-panel">
        <div className="finder-heading">
          <p className="eyebrow eyebrow--gold">Check availability</p>
          <h2 id="finder-title">Find your <em>stay.</em></h2>
          <p>Tell us what you need and we&apos;ll help you find the right Solver accommodation in London.</p>
        </div>
        <form className="finder-form" onSubmit={submitFinder}>
          <div className="finder-fields">
            <label><span>Check-in</span><input type="date" value={form.checkIn} onChange={(event) => updateField("checkIn", event.target.value)} /></label>
            <label><span>Check-out</span><input type="date" value={form.checkOut} onChange={(event) => updateField("checkOut", event.target.value)} /></label>
            <label><span>Guests</span><select value={form.guests} onChange={(event) => updateField("guests", event.target.value)}><option value="">Select</option><option>1 guest</option><option>2 guests</option><option>3 guests</option><option>4+ guests</option></select></label>
            <label><span>Location / area</span><input type="text" value={form.area} onChange={(event) => updateField("area", event.target.value)} placeholder="Optional" /></label>
          </div>
          <div className="finder-submit"><button className="button button--gold" type="submit" data-analytics-event="check_availability" data-analytics-label="Availability finder"><Icon name="calendar" size={17} /> Check availability <Icon name="arrow" size={17} /></button><span>We&apos;ll confirm current availability and prices with you directly.</span></div>
        </form>
      </div>
    </section>
  );
}

export default function SolverLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolledHeader();
  useRevealObserver();

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
        <div className="container header-inner">
          <BrandLogo compact />
          <nav className={`site-nav${menuOpen ? " site-nav--open" : ""}`} id="primary-navigation" aria-label="Primary navigation">
            {solverConfig.navigation.map((item) => (
              <a href={item.href} key={item.href} onClick={closeMenu}>{item.label}</a>
            ))}
            <a className="button button--small button--gold" href={solverConfig.primaryNavigationCta.href} onClick={closeMenu} data-analytics-event="check_availability" data-analytics-label="Primary navigation">
              <Icon name="calendar" size={16} />
              <span>{solverConfig.primaryNavigationCta.label}</span>
            </a>
          </nav>
          <div className="header-actions">
            <a className="button button--small button--gold header-whatsapp" href={solverConfig.primaryNavigationCta.href} onClick={closeMenu} data-analytics-event="check_availability" data-analytics-label="Mobile navigation">
              <Icon name="calendar" size={16} />
              <span>{solverConfig.primaryNavigationCta.label}</span>
            </a>
            <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} onClick={() => setMenuOpen((open) => !open)}>
              <Icon name={menuOpen ? "close" : "menu"} size={21} />
            </button>
          </div>
        </div>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <img className="hero__image" src={heroImage} alt="Warm, considered bedroom interior with a London city view" width="1800" height="1013" loading="eager" fetchPriority="high" />
        <div className="hero__veil" />
        <div className="hero__grid" />
        <div className="container hero__inner">
          <div className="hero__content">
            <Reveal delay={80}><h1 id="hero-title">Comfortable London stays.<br /><em>Thoughtfully managed.</em></h1></Reveal>
            <Reveal delay={140}><p className="hero__lede">Discover professionally prepared short-term accommodation for business trips, city breaks and university visits.</p></Reveal>
            <Reveal className="hero__actions" delay={200}>
              <a className="button button--gold" href="#stays" data-analytics-event="view_accommodation" data-analytics-label="Hero CTA"><Icon name="door" size={18} /> View our accommodation <Icon name="arrow" size={18} /></a>
              <a className="button button--quiet" href="#availability" data-analytics-event="check_availability" data-analytics-label="Hero CTA"><Icon name="calendar" size={17} /> Check availability <Icon name="arrow" size={17} /></a>
            </Reveal>
            <Reveal delay={260}>
              <div className="hero__status"><span className="status-dot" /> <strong>{solverConfig.brand.slogan}</strong><span className="hero__status-context">{solverConfig.launch.bookingExperienceLabel}</span></div>
            </Reveal>
          </div>
        </div>
        <a className="hero__scroll" href="#stays"><span>Scroll to explore</span><Icon name="chevron" size={18} /></a>
      </section>

      <section className="trust-strip" aria-label="Solver Accommodations highlights">
        <div className="container trust-strip__inner">
          <div className="trust-strip__track">
            <div className="trust-strip__group">
              {trustHighlights.map(({ src, text }) => <div className="trust-item" key={text}><IdentityIcon className="trust-item__icon" src={src} /><span>{text}</span></div>)}
            </div>
            <div className="trust-strip__group" aria-hidden="true">
              {trustHighlights.map(({ src, text }) => <div className="trust-item" key={`${text}-duplicate`}><IdentityIcon className="trust-item__icon" src={src} /><span>{text}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--featured-stays" id="stays" aria-labelledby="stays-title">
        <div className="container">
          <Reveal><SectionIntro headingId="stays-title" eyebrow="Book your stay" title={<>Find the right stay<br /><em>in London.</em></>} body="Explore professionally prepared short-term accommodation for business trips, city breaks and university visits." /></Reveal>
          <Reveal className="featured-stay" delay={100}>
            <div className="featured-stay__image"><img src={heroImage} alt="Warm, considered bedroom interior prepared for a London stay" width="1800" height="1013" loading="lazy" /><span>Featured accommodation</span></div>
            <div className="featured-stay__content"><p className="eyebrow">Solver accommodation</p><h3>Comfortable London stay</h3><p>Thoughtfully prepared space, clear arrival details and direct support. Property details, availability and prices are confirmed with you before booking.</p><div className="featured-stay__meta"><span><Icon name="user" size={16} /> Short stays</span><span><Icon name="briefcase" size={16} /> Comfort-led</span><span><Icon name="pin" size={16} /> London</span></div><a className="button button--gold" href="#availability" data-analytics-event="check_availability" data-analytics-label="Featured accommodation"><Icon name="calendar" size={17} /> View property <Icon name="arrow" size={17} /></a></div>
          </Reveal>
          <div className="section-action"><a className="text-link" href="#availability" data-analytics-event="view_accommodation" data-analytics-label="Accommodation section">View all accommodation <Icon name="arrow" size={17} /></a></div>
        </div>
      </section>

      <section className="section section--signature" id="why-stay" aria-labelledby="why-stay-title">
        <div className="container signature-grid">
          <Reveal className="signature-art"><img className="signature-art__door" src={signatureDoorImage} alt="" width="1800" height="1800" loading="lazy" /><span className="signature-art__halo" /></Reveal>
          <Reveal className="signature-copy" delay={100}>
            <SectionIntro headingId="why-stay-title" eyebrow="Our approach" title={<>A better way<br />to stay in <em>London.</em></>} body="From the first enquiry to arrival, Solver keeps the essentials clear, comfortable and thoughtfully handled." />
            <div className="signature-points" role="group" aria-label="Reasons to stay with Solver">
              {[[identityIcons.keys, "Professionally prepared"], [identityIcons.whatsapp, "Responsive support"], [identityIcons.building, "Great London locations"], [identityIcons.bed, "Comfort you can rely on"]].map(([src, label]) => <div className="signature-point" key={label}><IdentityIcon className="signature-point__icon" src={src} /><span>{label}</span></div>)}
            </div>
          </Reveal>
        </div>
      </section>

      <StayFinder />

      <section className="section section--booking" id="booking" aria-labelledby="booking-title">
        <div className="container booking-grid">
          <Reveal className="booking-copy"><p className="eyebrow eyebrow--gold">How booking works</p><h2 id="booking-title">Booking your stay<br /><em>is simple.</em></h2><p>Browse a stay, check the dates that work for you and speak with the Solver team about the details.</p><a className="button button--gold" href="#availability" data-analytics-event="check_availability" data-analytics-label="Booking section"><Icon name="calendar" size={17} /> Check availability <Icon name="arrow" size={17} /></a></Reveal>
          <Reveal className="booking-steps" delay={120}><img className="booking-steps__super" src={superIcons.calendar} alt="" width="1180" height="1400" loading="lazy" />{[["01", "Explore", "Browse available Solver accommodation.", detailIcons.camera], ["02", "Check availability", "Choose your dates and number of guests.", identityIcons.calendar], ["03", "Book or enquire", "Reserve directly or contact us with questions.", detailIcons.question], ["04", "Enjoy your stay", "Arrive at a professionally prepared property.", detailIcons.keys]].map(([number, title, copy, icon], index) => <div className="booking-step" key={number}><span className="booking-step__number">{number}</span><div><h3>{title}</h3><p>{copy}</p></div><IdentityIcon className="booking-step__icon" src={icon} width={1530} height={1326} />{index < 3 ? <span className="booking-step__connector" /> : null}</div>)}</Reveal>
        </div>
      </section>

      <section className="section section--management" id="management" aria-labelledby="management-title">
        <div className="container">
          <div className="management-grid"><Reveal className="management-copy"><p className="eyebrow eyebrow--gold">Property Management</p><h2 id="management-title">Own a property<br /><em>in London?</em></h2><p className="management-lede">Let Solver handle the day-to-day work of short-term letting — from guest communication and cleaning coordination to listing management and property care.</p><div className="management-actions"><a className="button button--gold" href="#management-services" data-analytics-event="explore_management" data-analytics-label="Management services">Explore management services <Icon name="arrow" size={17} /></a><WhatsAppLink className="button button--outline" message={"Hello, I own a property in London and would like to arrange a property management consultation."} analyticsLabel="Management consultation">Arrange a consultation <Icon name="arrow" size={17} /></WhatsAppLink></div><a className="text-link management-valuation" href="#contact" data-analytics-event="request_valuation" data-analytics-label="Management section">Request a valuation <Icon name="arrow" size={17} /></a></Reveal><Reveal className="management-visual management-visual--london" delay={100}><img src={superIcons.location} alt="" width="3762" height="3762" loading="lazy" /><div className="management-visual__caption"><span>London property potential</span><p>Thoughtful management, clear communication and a stronger experience for owners and guests.</p></div></Reveal></div>
          <div className="management-services" id="management-services"><Reveal className="management-services__intro"><p className="eyebrow eyebrow--gold">Services</p><h3>Professional property management, without the day-to-day burden.</h3><p>Our management approach is tailored to the property, its goals and the operating requirements confirmed during consultation.</p></Reveal><div className="management-services__grid">{[[detailIcons.info, "Listing management", "Creation, optimisation and ongoing management of your property listing."], [detailIcons.headphones, "Guest communication", "Enquiries, booking communication and guest support."], [detailIcons.keys, "Cleaning coordination", "Reliable turnover planning between stays."], [detailIcons.lock, "Property care", "Ongoing oversight to help keep your property guest-ready."], [identityIcons.calendar, "Pricing and availability", "A considered approach to calendars and availability, discussed with you."]].map(([src, title, copy], index) => <Reveal className="management-service" delay={index * 60} key={title}><IdentityIcon className="management-service__icon" src={src} /><div><h4>{title}</h4><p>{copy}</p></div></Reveal>)}</div></div>
          <div className="management-process" id="how-it-works"><Reveal><p className="eyebrow eyebrow--gold">How it works</p><h3>From property to professionally managed stay.</h3></Reveal><div className="process-grid">{[["01", "Initial consultation", "We learn about your property and objectives."], ["02", "Property assessment", "We review suitability, positioning and operational requirements."], ["03", "Setup and preparation", "Listings, guest journey and management processes are prepared."], ["04", "Ongoing management", "Solver coordinates the day-to-day operation."]].map(([number, title, copy]) => <div className="process-step" key={number}><span>{number}</span><h4>{title}</h4><p>{copy}</p></div>)}</div></div>
          <div className="management-consultation" id="fees-consultation"><div><p className="eyebrow eyebrow--gold">Fees and consultation</p><h3>Management tailored to your property.</h3><p>Every property is different. We&apos;ll understand your goals, property type and management requirements before recommending the right approach.</p></div><WhatsAppLink className="button button--gold" message={"Hello, I own a property in London and would like to discuss management fees and arrange a consultation."}>Arrange a consultation <Icon name="arrow" size={17} /></WhatsAppLink></div>
          <div className="owner-faq" id="owner-faqs"><Reveal><p className="eyebrow eyebrow--gold">Owner FAQs</p><h3>Answers for property owners.</h3></Reveal><div className="owner-faq__grid"><details open><summary>What type of properties do you manage?</summary><p>We discuss the property type, location and goals during an initial consultation to confirm fit.</p></details><details><summary>Which areas of London do you cover?</summary><p>We work with London properties that fit our service model. Exact service coverage is confirmed during consultation.</p></details><details><summary>Can Solver manage an existing listing?</summary><p>Tell us about your current Airbnb or Booking.com listing and we can discuss the right next step.</p></details><details><summary>How are management fees calculated?</summary><p>Fees depend on the property and management requirements, so we explain the approach during consultation.</p></details></div><a className="text-link" href="#contact">View owner FAQs <Icon name="arrow" size={17} /></a></div>
        </div>
      </section>

      <section className="section section--location" id="areas-covered" aria-labelledby="location-title"><div className="container location-grid"><Reveal className="location-card"><div className="location-card__map"><iframe className="location-card__map-embed" title={`Solver Accommodations location: ${solverConfig.google.mapsQuery}`} src={solverConfig.google.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className="map-grid" /><span className="map-route map-route--one" /><span className="map-route map-route--two" /><span className="map-label">LONDON</span><a className="location-card__map-link" href={solverConfig.google.mapsUrl} target="_blank" rel="noreferrer" data-analytics-event="open_google_maps" data-analytics-label="Areas covered">Open in Google Maps <Icon name="arrow" size={15} /></a></div><div className="location-card__footer"><span><IdentityIcon className="location-card__footer-icon" src={identityIcons.train} /> London, UK</span><span>Area details on request</span></div></Reveal><Reveal className="location-copy" delay={100}><SectionIntro headingId="location-title" eyebrow="Areas covered" title={<>Property management<br /><em>across London.</em></>} body="Solver works with London properties that fit our service model. The right location, property fit and operational requirements are confirmed during consultation." /><div className="location-note"><Icon name="pin" size={19} /><p>We only publish areas that are confirmed by the Solver team. Exact residential addresses remain private until a booking is confirmed.</p></div><a className="button button--outline" href="#contact" data-analytics-event="contact_solver" data-analytics-label="Areas covered">See areas we cover <Icon name="arrow" size={17} /></a></Reveal></div></section>

      <section className="section section--contact" id="contact" aria-labelledby="contact-title"><div className="container contact-panel"><img className="contact-panel__super" src={superIcons.whatsapp} alt="" width="1267" height="1400" loading="lazy" /><Reveal><p className="eyebrow eyebrow--gold">Request a valuation or consultation</p><h2 id="contact-title">See what your property<br /><em>could achieve.</em></h2><p className="contact-panel__lede">Tell us about your London property and we&apos;ll discuss its potential, management requirements and the best next steps.</p></Reveal><Reveal className="contact-actions" delay={100}><WhatsAppLink className="button button--gold" message={"Hello, I own a property in London and would like to request a property review or valuation."} analyticsLabel="Property valuation"><Icon name="message" size={18} /> Request a valuation <Icon name="arrow" size={17} /></WhatsAppLink><WhatsAppLink className="button button--outline" message={"Hello, I own a property in London and would like to arrange a consultation."} analyticsLabel="General consultation">Arrange a consultation <Icon name="arrow" size={17} /></WhatsAppLink><div className="contact-detail"><IdentityIcon className="contact-detail__image" src={identityIcons.mail} width={1530} height={1326} /><span>{solverConfig.contact.email || "Email address to be configured"}</span></div><div className="contact-detail"><IdentityIcon className="contact-detail__image" src={detailIcons.pin} width={1530} height={1326} /><span>{solverConfig.contact.serviceArea}</span></div></Reveal></div></section>

      <section className="section section--about" id="about" aria-labelledby="about-title"><div className="container about-grid"><Reveal className="about-visual"><div className="about-visual__frame"><img src={heroImage} alt="A calm, warm bedroom interior prepared for a short stay" width="1800" height="1013" loading="lazy" /><div className="image-caption"><span className="image-caption__line" /> <span>Our approach</span></div></div><IdentityIcon className="about-visual__identity" src={superIcons.shield} width={1066} height={1400} /></Reveal><Reveal className="about-copy" delay={100}><SectionIntro headingId="about-title" eyebrow="Our approach" title={<>Thoughtful stays.<br /><em>Reliable management.</em></>} body="Provides professionally managed short-term accommodation in London. We welcome business travellers." /><div className="editorial-note"><span>Solver Accommodations</span><p>Clear communication, comfortable spaces and careful attention to the details that make a stay or property operation feel easier.</p></div></Reveal></div></section>

      <section className="section section--platforms" aria-labelledby="platforms-title"><div className="container"><Reveal><SectionIntro headingId="platforms-title" align="center" eyebrow="Trust and enquiry" title={<>Choose the channel<br /><em>that suits you.</em></>} body="WhatsApp is our direct enquiry channel. Current listings may also be available through established booking platforms." /></Reveal><div className="platform-grid"><Reveal className="platform-card platform-card--primary"><div className="platform-card__icon"><IdentityIcon src={identityIcons.whatsapp} /></div><div><p className="eyebrow eyebrow--gold">Preferred channel</p><h3>WhatsApp</h3><p>Message our team directly about current availability, stays or property management.</p><WhatsAppLink className="text-link" message={defaultWhatsAppMessage}>Start an enquiry <Icon name="arrow" size={16} /></WhatsAppLink></div></Reveal><Reveal className="platform-card" delay={80}><div className="platform-card__icon"><IdentityIcon src={identityIcons.home} /></div><div><p className="eyebrow">Trusted platform</p><h3>Airbnb</h3><p>{solverConfig.platforms.airbnb ? "Explore our current Airbnb listing and enquire through the platform." : "Our Airbnb link will be added once the official listing URL is confirmed."}</p>{solverConfig.platforms.airbnb ? <a className="text-link" href={solverConfig.platforms.airbnb} target="_blank" rel="noreferrer">View Airbnb listing <Icon name="arrow" size={16} /></a> : <span className="platform-card__pending">Link to be configured</span>}</div></Reveal><Reveal className="platform-card" delay={160}><div className="platform-card__icon"><IdentityIcon src={identityIcons.calendar} /></div><div><p className="eyebrow">Trusted platform</p><h3>Booking.com</h3><p>{solverConfig.platforms.bookingCom ? "Explore our current Booking.com listing and enquire through the platform." : "Our Booking.com link will be added once the official listing URL is confirmed."}</p>{solverConfig.platforms.bookingCom ? <a className="text-link" href={solverConfig.platforms.bookingCom} target="_blank" rel="noreferrer">View Booking.com listing <Icon name="arrow" size={16} /></a> : <span className="platform-card__pending">Link to be configured</span>}</div></Reveal></div></div></section>

      <section className="section section--dual-cta" aria-labelledby="dual-cta-title"><div className="container"><Reveal><SectionIntro headingId="dual-cta-title" align="center" eyebrow="What brings you to Solver?" title={<>Two journeys.<br /><em>One considered approach.</em></>} /></Reveal><div className="dual-cta-grid"><Reveal className="dual-cta-card dual-cta-card--stay"><p className="eyebrow">Looking for somewhere to stay?</p><h3>Explore comfortable, professionally managed London accommodation.</h3><a className="button button--gold" href="#stays">View our stays <Icon name="arrow" size={17} /></a></Reveal><Reveal className="dual-cta-card dual-cta-card--owner" delay={100}><p className="eyebrow eyebrow--gold">Own a property?</p><h3>Discover a simpler way to manage short-term letting.</h3><a className="button button--outline" href="#management">Explore property management <Icon name="arrow" size={17} /></a></Reveal></div></div></section>

      <section className="section section--faqs" id="faqs" aria-labelledby="faqs-title">
        <div className="container faq-single-column"><Reveal><SectionIntro headingId="faqs-title" align="center" eyebrow="Guest FAQs" title={<>Clear answers for<br /><em>your stay.</em></>} body="A few helpful answers for guests planning a short stay with Solver." /></Reveal><Reveal className="faq-column faq-column--guest" delay={100}><details open><summary>What time is check-in and check-out?</summary><p>Arrival details and times are shared through the appropriate booking or enquiry channel once your stay is confirmed.</p></details><details><summary>Is Wi-Fi included?</summary><p>Property amenities and Wi-Fi details are confirmed with the property information before booking.</p></details><details><summary>Are longer stays available?</summary><p>Tell us your dates and requirements and we will confirm the current options available in London.</p></details><details><summary>Can I stay for a business or university visit?</summary><p>Yes. Solver is designed for business trips, city breaks and university visits, subject to availability.</p></details><details><summary>What happens if I need help during my stay?</summary><p>Solver provides a direct enquiry channel for clear communication before and during your stay.</p></details><a className="text-link" href="#booking">Book or enquire <Icon name="arrow" size={17} /></a></Reveal></div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid"><div className="footer-brand"><BrandLogo placement="footer" /><p>{solverConfig.brand.slogan}</p><div className="footer-details" aria-label="Solver details">{[[detailIcons.tag, "Flexible stays"], [detailIcons.star, "Thoughtful service"], [detailIcons.headphones, "Direct support"], [detailIcons.lock, "Private details"]].map(([src, label]) => <span className="footer-detail" key={label}><IdentityIcon className="footer-detail__icon" src={src} width={1530} height={1326} /><span>{label}</span></span>)}</div></div><div className="footer-links"><p className="eyebrow">Explore</p>{solverConfig.navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</div><div className="footer-links"><p className="eyebrow">Connect</p><WhatsAppLink className="footer-link" message={defaultWhatsAppMessage}>WhatsApp</WhatsAppLink><span>London, United Kingdom</span><span>{solverConfig.contact.email || "Email to be configured"}</span></div></div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} {solverConfig.brand.legalName}</span><nav className="footer-legal-links" aria-label="Legal information"><a className="footer-legal-link" href="/privacy">Privacy Policy</a><a className="footer-legal-link" href="/terms">Terms of Service</a><span>Designed and developed by VOLYNX.</span></nav></div>
      </footer>

    </main>
  );
}

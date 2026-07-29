"use client";

/* Local WebP assets intentionally use <img>: the vinext dev image optimizer is
 * incompatible with this Cloudflare starter's client runtime. */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { buildEmailLink, solverConfig } from "../../config/solver";
import { Icon } from "./Icon";

const heroImage = "/assets/solver-hero.webp";
const brandIconImage = "/assets/new-solver-main-icon.webp";
const brandWordmarkImage = "/assets/new-solver-wordmark.webp";
const footerBrandImage = "/assets/new-solver-wordmark-complete.webp";
const signatureDoorImage = "/assets/solver-signature-door.webp";
const launchEmailHref = buildEmailLink();

const identityIcons = {
  building: "/assets/london-pin.webp",
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
  { src: identityIcons.home, text: "A London launch is coming" },
  { src: identityIcons.bed, text: "Thoughtfully prepared stays" },
  { src: identityIcons.keys, text: "A clear guest journey" },
  { src: identityIcons.whatsapp, text: "Updates on the way" },
  { src: identityIcons.globe, text: "Future booking channels" },
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
  const isFooter = placement === "footer";

  return (
    <a className={`brand-lockup brand-lockup--${placement} ${compact ? "brand-lockup--compact" : ""}`} href="#home" aria-label="Solver Accommodations home">
      {isFooter ? (
        <img className="brand-lockup__complete" src={footerBrandImage} alt="Solver Accommodations — Your stay, solved." width="620" height="276" loading="lazy" />
      ) : (
        <>
          <span className="brand-lockup__mark" aria-hidden="true">
            <img src={brandIconImage} alt="" width="122" height="174" loading={compact ? "eager" : "lazy"} />
          </span>
          <img className="brand-lockup__wordmark" src={brandWordmarkImage} alt="Solver Accommodations" width="338" height="174" loading={compact ? "eager" : "lazy"} />
        </>
      )}
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

function LaunchPreview() {
  return (
    <section className="section section--finder" id="launch" aria-labelledby="launch-title">
      <div className="container finder-panel launch-preview">
        <div className="finder-heading">
          <p className="eyebrow eyebrow--gold">Coming soon</p>
          <h2 id="launch-title">A considered London stay experience is <em>on its way.</em></h2>
          <p>Solver is preparing its first accommodation, booking and property-management experiences. They are not available to book or join yet.</p>
        </div>
        <div className="launch-preview__details">
          <p className="launch-preview__status"><span className="status-dot" /> Preview site</p>
          <ul className="launch-preview__list">
            <li><Icon name="door" size={18} /> Accommodation details and property pages</li>
            <li><Icon name="calendar" size={18} /> Availability and booking information</li>
            <li><Icon name="briefcase" size={18} /> Property-management services for owners</li>
          </ul>
          <a className="button button--gold" href={launchEmailHref} data-analytics-event="launch_interest" data-analytics-label="Launch preview">
            <Icon name="mail" size={17} /> Get launch updates <Icon name="arrow" size={17} />
          </a>
        </div>
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
            <a className="button button--small button--gold" href={solverConfig.primaryNavigationCta.href} onClick={closeMenu} data-analytics-event="view_launch_preview" data-analytics-label="Primary navigation">
              <Icon name="spark" size={16} />
              <span>{solverConfig.primaryNavigationCta.label}</span>
            </a>
          </nav>
          <div className="header-actions">
            <a className="button button--small button--gold header-whatsapp" href={solverConfig.primaryNavigationCta.href} onClick={closeMenu} data-analytics-event="view_launch_preview" data-analytics-label="Mobile navigation">
              <Icon name="spark" size={16} />
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
            <Reveal delay={80}><h1 id="hero-title">Comfortable London stays.<br /><em>Coming soon.</em></h1></Reveal>
            <Reveal delay={140}><p className="hero__lede">Solver is preparing a more considered experience for short-term stays and property management in London.</p></Reveal>
            <Reveal className="hero__actions" delay={200}>
              <a className="button button--gold" href="#stays" data-analytics-event="view_launch_preview" data-analytics-label="Hero CTA"><Icon name="spark" size={18} /> Explore what&apos;s coming <Icon name="arrow" size={18} /></a>
              <a className="button button--quiet" href="#launch" data-analytics-event="view_launch_preview" data-analytics-label="Hero CTA"><Icon name="mail" size={17} /> Launch updates <Icon name="arrow" size={17} /></a>
            </Reveal>
            <Reveal delay={260}>
              <div className="hero__status"><span className="status-dot" /> <strong>{solverConfig.brand.slogan}</strong><span className="hero__status-context">{solverConfig.launch.bookingExperienceLabel}</span></div>
            </Reveal>
          </div>
        </div>
        <a className="hero__scroll" href="#stays"><span>Explore the preview</span><Icon name="chevron" size={18} /></a>
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
          <Reveal><SectionIntro headingId="stays-title" eyebrow="Coming soon" title={<>The first Solver stays<br /><em>are being prepared.</em></>} body="This is an early preview of the standard Solver is building for future business trips, city breaks and university visits." /></Reveal>
          <Reveal className="featured-stay" delay={100}>
            <div className="featured-stay__image"><img src={heroImage} alt="Warm, considered bedroom interior representing the future Solver stay experience" width="1800" height="1013" loading="lazy" /><span>Preview concept</span></div>
            <div className="featured-stay__content"><p className="eyebrow">Future Solver stays</p><h3>Comfortable London stays, thoughtfully prepared.</h3><p>Solver is curating its first accommodation experience. Property details, locations, availability and prices will be shared when the service launches.</p><div className="featured-stay__meta"><span><Icon name="spark" size={16} /> In development</span><span><Icon name="briefcase" size={16} /> Future guest experience</span><span><Icon name="pin" size={16} /> London focus</span></div><a className="button button--gold" href="#launch" data-analytics-event="view_launch_preview" data-analytics-label="Featured preview"><Icon name="mail" size={17} /> Get launch updates <Icon name="arrow" size={17} /></a></div>
          </Reveal>
          <div className="section-action"><a className="text-link" href="#launch" data-analytics-event="view_launch_preview" data-analytics-label="Accommodation preview">See what&apos;s coming <Icon name="arrow" size={17} /></a></div>
        </div>
      </section>

      <section className="section section--signature" id="why-stay" aria-labelledby="why-stay-title">
        <div className="container signature-grid">
          <Reveal className="signature-art"><img className="signature-art__door" src={signatureDoorImage} alt="" width="1800" height="1800" loading="lazy" /><span className="signature-art__halo" /></Reveal>
          <Reveal className="signature-copy" delay={100}>
            <SectionIntro headingId="why-stay-title" eyebrow="The Solver standard" title={<>What we&apos;re preparing<br />for <em>London.</em></>} body="The first Solver experience is being shaped around clear communication, comfortable spaces and thoughtful details." />
            <div className="signature-points" role="group" aria-label="What Solver is preparing">
              {[[identityIcons.keys, "Thoughtful preparation"], [identityIcons.whatsapp, "Clear communication"], [identityIcons.building, "London-focused stays"], [identityIcons.bed, "Comfort by design"]].map(([src, label]) => <div className="signature-point" key={label}><IdentityIcon className="signature-point__icon" src={src} /><span>{label}</span></div>)}
            </div>
          </Reveal>
        </div>
      </section>

      <LaunchPreview />

      <section className="section section--booking" id="booking" aria-labelledby="booking-title">
        <div className="container booking-grid">
          <Reveal className="booking-copy"><p className="eyebrow eyebrow--gold">Future guest journey</p><h2 id="booking-title">How a Solver stay<br /><em>will come together.</em></h2><p>The booking journey below is a preview only. Availability checks and reservations will open with the first Solver accommodation.</p><a className="button button--gold" href="#launch" data-analytics-event="view_launch_preview" data-analytics-label="Guest journey preview"><Icon name="spark" size={17} /> Launch updates <Icon name="arrow" size={17} /></a></Reveal>
          <Reveal className="booking-steps" delay={120}><img className="booking-steps__super" src={superIcons.calendar} alt="" width="1180" height="1400" loading="lazy" />{[["01", "Discover", "Explore the first Solver stays when they are announced.", detailIcons.camera], ["02", "Check details", "See property information, dates and guest requirements at launch.", identityIcons.calendar], ["03", "Plan your stay", "Booking and enquiry options will be introduced with the service.", detailIcons.question], ["04", "Enjoy London", "Arrive at a thoughtfully prepared Solver stay.", detailIcons.keys]].map(([number, title, copy, icon], index) => <div className="booking-step" key={number}><span className="booking-step__number">{number}</span><div><h3>{title}</h3><p>{copy}</p></div><IdentityIcon className="booking-step__icon" src={icon} width={1530} height={1326} />{index < 3 ? <span className="booking-step__connector" /> : null}</div>)}</Reveal>
        </div>
      </section>

      <section className="section section--management" id="management" aria-labelledby="management-title">
        <div className="container">
          <div className="management-grid"><Reveal className="management-copy"><p className="eyebrow eyebrow--gold">Property management</p><h2 id="management-title">A new owner service<br /><em>is in development.</em></h2><p className="management-lede">Solver is preparing a future property-management offer for London owners. Consultations, valuations and onboarding are not open yet.</p><div className="management-actions"><a className="button button--gold" href="#management-services" data-analytics-event="view_management_preview" data-analytics-label="Management preview">Explore the preview <Icon name="arrow" size={17} /></a><a className="button button--outline" href="#launch" data-analytics-event="view_launch_preview" data-analytics-label="Management launch">Get launch updates <Icon name="arrow" size={17} /></a></div></Reveal><Reveal className="management-visual management-visual--london" delay={100}><img src={superIcons.location} alt="" width="3762" height="3762" loading="lazy" /><div className="management-visual__caption"><span>Future owner experience</span><p>A considered approach to property care, communication and guest experience is being developed.</p></div></Reveal></div>
          <div className="management-services" id="management-services"><Reveal className="management-services__intro"><p className="eyebrow eyebrow--gold">What&apos;s planned</p><h3>A thoughtful management service, built in stages.</h3><p>The following areas reflect the service Solver is preparing. They are not currently available.</p></Reveal><div className="management-services__grid">{[[detailIcons.info, "Listing management", "A future listing and positioning service for selected properties."], [detailIcons.headphones, "Guest communication", "A clear guest-support approach being designed for launch."], [detailIcons.keys, "Cleaning coordination", "A planned turnover process between future stays."], [detailIcons.lock, "Property care", "A future approach to keeping properties guest-ready."], [identityIcons.calendar, "Pricing and availability", "Future calendar and availability support, shaped around each property."]].map(([src, title, copy], index) => <Reveal className="management-service" delay={index * 60} key={title}><IdentityIcon className="management-service__icon" src={src} /><div><h4>{title}</h4><p>{copy}</p></div></Reveal>)}</div></div>
          <div className="management-process" id="how-it-works"><Reveal><p className="eyebrow eyebrow--gold">Future process</p><h3>How the owner journey is being planned.</h3></Reveal><div className="process-grid">{[["01", "Meet Solver", "Owners will be able to learn about the service when it launches."], ["02", "Review the fit", "Property suitability and service details will be considered in a future phase."], ["03", "Prepare the property", "Launch and guest-experience steps will be shared with participating owners."], ["04", "Operate with care", "Ongoing management will be introduced once the service is live."]].map(([number, title, copy]) => <div className="process-step" key={number}><span>{number}</span><h4>{title}</h4><p>{copy}</p></div>)}</div></div>
          <div className="management-consultation" id="fees-consultation"><div><p className="eyebrow eyebrow--gold">Coming later</p><h3>Owner consultations are not open yet.</h3><p>Fees, valuations and property onboarding will be introduced after Solver launches its property-management service.</p></div><a className="button button--gold" href="#launch" data-analytics-event="view_launch_preview" data-analytics-label="Owner launch preview">Follow the launch <Icon name="arrow" size={17} /></a></div>
          <div className="owner-faq" id="owner-faqs"><Reveal><p className="eyebrow eyebrow--gold">Owner launch FAQs</p><h3>What to expect from the future service.</h3></Reveal><div className="owner-faq__grid"><details open><summary>Can I submit my property now?</summary><p>Not yet. Solver is not currently accepting properties or conducting owner onboarding.</p></details><details><summary>Which areas of London will be covered?</summary><p>The initial coverage will be announced once the service is ready to launch.</p></details><details><summary>Will existing listings be supported?</summary><p>Future service details, including whether existing listings can be supported, will be shared at launch.</p></details><details><summary>When will fees be available?</summary><p>Fees and the consultation process will be introduced when the property-management service opens.</p></details></div><a className="text-link" href="#launch">Get launch updates <Icon name="arrow" size={17} /></a></div>
        </div>
      </section>

      <section className="section section--location" id="areas-covered" aria-labelledby="location-title"><div className="container location-grid"><Reveal className="location-card"><div className="location-card__map"><iframe className="location-card__map-embed" title={`Solver Accommodations launch focus: ${solverConfig.google.mapsQuery}`} src={solverConfig.google.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className="map-grid" /><span className="map-route map-route--one" /><span className="map-route map-route--two" /><span className="map-label">LONDON</span><a className="location-card__map-link" href={solverConfig.google.mapsUrl} target="_blank" rel="noreferrer" data-analytics-event="open_google_maps" data-analytics-label="London launch focus">Explore London <Icon name="arrow" size={15} /></a></div><div className="location-card__footer"><span><IdentityIcon className="location-card__footer-icon" src={identityIcons.train} /> London, UK</span><span>Launch focus</span></div></Reveal><Reveal className="location-copy" delay={100}><SectionIntro headingId="location-title" eyebrow="London launch focus" title={<>A London experience,<br /><em>still to come.</em></>} body="Solver is preparing its first stays and future owner service with London as the focus. Specific locations will be announced only when they are confirmed." /><div className="location-note"><Icon name="pin" size={19} /><p>No accommodation or management areas are live yet. Confirmed locations and property details will be shared at launch.</p></div><a className="button button--outline" href="#launch" data-analytics-event="view_launch_preview" data-analytics-label="London launch">See the launch preview <Icon name="arrow" size={17} /></a></Reveal></div></section>

      <section className="section section--contact" id="contact" aria-labelledby="contact-title"><div className="container contact-panel"><img className="contact-panel__super" src={superIcons.whatsapp} alt="" width="1267" height="1400" loading="lazy" /><Reveal><p className="eyebrow eyebrow--gold">Stay informed</p><h2 id="contact-title">Solver is<br /><em>coming soon.</em></h2><p className="contact-panel__lede">This site is an early preview. Accommodation, booking and property-management services are not live yet. Contact the team if you would like launch updates.</p></Reveal><Reveal className="contact-actions" delay={100}><a className="button button--gold" href={launchEmailHref} data-analytics-event="launch_interest" data-analytics-label="Contact launch updates"><Icon name="mail" size={18} /> Get launch updates <Icon name="arrow" size={17} /></a><a className="button button--outline" href="#launch" data-analytics-event="view_launch_preview" data-analytics-label="Contact launch preview">See what&apos;s coming <Icon name="arrow" size={17} /></a><a className="contact-detail contact-detail--email" href={launchEmailHref} data-analytics-event="email_enquiry" data-analytics-label="Launch email"><IdentityIcon className="contact-detail__image" src={identityIcons.mail} width={1530} height={1326} /><span>{solverConfig.contact.email}</span></a><div className="contact-detail"><IdentityIcon className="contact-detail__image" src={detailIcons.pin} width={1530} height={1326} /><span>{solverConfig.contact.serviceArea}</span></div></Reveal></div></section>

      <section className="section section--about" id="about" aria-labelledby="about-title"><div className="container about-grid"><Reveal className="about-visual"><div className="about-visual__frame"><img src={heroImage} alt="A calm, warm bedroom interior representing the future Solver experience" width="1800" height="1013" loading="lazy" /><div className="image-caption"><span className="image-caption__line" /> <span>What we&apos;re building</span></div></div><IdentityIcon className="about-visual__identity" src={superIcons.shield} width={1066} height={1400} /></Reveal><Reveal className="about-copy" delay={100}><SectionIntro headingId="about-title" eyebrow="The vision" title={<>Thoughtful stays.<br /><em>Reliable care.</em></>} body="Solver is building a future London experience around comfortable spaces, clear communication and thoughtful property care." /><div className="editorial-note"><span>Solver Accommodations</span><p>More details will be shared when the first accommodation and owner-service phases are ready to launch.</p></div></Reveal></div></section>

      <section className="section section--platforms" aria-labelledby="platforms-title"><div className="container"><Reveal><SectionIntro headingId="platforms-title" align="center" eyebrow="Future channels" title={<>Ways to discover Solver<br /><em>are coming soon.</em></>} body="No accommodation listings or booking channels are live yet. Official details will be shared here when Solver is ready to launch." /></Reveal><div className="platform-grid"><Reveal className="platform-card platform-card--primary"><div className="platform-card__icon"><IdentityIcon src={identityIcons.mail} /></div><div><p className="eyebrow eyebrow--gold">Available now</p><h3>Launch updates</h3><p>Contact Solver to receive updates about the upcoming accommodation and property-management launch.</p><a className="text-link" href={launchEmailHref} data-analytics-event="launch_interest" data-analytics-label="Platform launch updates">Get launch updates <Icon name="arrow" size={16} /></a></div></Reveal><Reveal className="platform-card" delay={80}><div className="platform-card__icon"><IdentityIcon src={identityIcons.home} /></div><div><p className="eyebrow">Future channel</p><h3>Airbnb</h3><p>An official Airbnb listing may be introduced as part of the future Solver launch.</p><span className="platform-card__pending">To be announced</span></div></Reveal><Reveal className="platform-card" delay={160}><div className="platform-card__icon"><IdentityIcon src={identityIcons.calendar} /></div><div><p className="eyebrow">Future channel</p><h3>Booking.com</h3><p>A Booking.com channel may be added once accommodation listings are ready.</p><span className="platform-card__pending">To be announced</span></div></Reveal></div></div></section>

      <section className="section section--dual-cta" aria-labelledby="dual-cta-title"><div className="container"><Reveal><SectionIntro headingId="dual-cta-title" align="center" eyebrow="What&apos;s ahead" title={<>Two future journeys.<br /><em>One considered approach.</em></>} /></Reveal><div className="dual-cta-grid"><Reveal className="dual-cta-card dual-cta-card--stay"><p className="eyebrow">Looking for somewhere to stay?</p><h3>Preview the accommodation experience Solver is preparing for London.</h3><a className="button button--gold" href="#stays" data-analytics-event="view_launch_preview" data-analytics-label="Guest preview">Preview future stays <Icon name="arrow" size={17} /></a></Reveal><Reveal className="dual-cta-card dual-cta-card--owner" delay={100}><p className="eyebrow eyebrow--gold">Own a property?</p><h3>Explore the owner service Solver is developing for a future phase.</h3><a className="button button--outline" href="#management" data-analytics-event="view_management_preview" data-analytics-label="Owner preview">Preview property management <Icon name="arrow" size={17} /></a></Reveal></div></div></section>

      <section className="section section--faqs" id="faqs" aria-labelledby="faqs-title">
        <div className="container faq-single-column"><Reveal><SectionIntro headingId="faqs-title" align="center" eyebrow="Launch FAQs" title={<>Clear answers about<br /><em>what&apos;s next.</em></>} body="A few helpful answers about the current Solver preview and the upcoming launch." /></Reveal><Reveal className="faq-column faq-column--guest" delay={100}><details open><summary>Can I book a Solver stay now?</summary><p>No. Accommodation listings, availability and reservations are not available yet.</p></details><details><summary>Can I submit a property for management?</summary><p>Not yet. Property-management consultations, valuations and owner onboarding will be introduced in a future phase.</p></details><details><summary>When will the first stays be announced?</summary><p>Solver will share confirmed accommodation details and launch timing when the service is ready.</p></details><details><summary>Will Airbnb and Booking.com be available?</summary><p>Any official booking-platform links will be published once listings are live.</p></details><details><summary>How can I receive updates?</summary><p>You can contact Solver through the launch-update email available on this preview site.</p></details><a className="text-link" href="#launch">See the launch preview <Icon name="arrow" size={17} /></a></Reveal></div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid"><div className="footer-brand"><BrandLogo placement="footer" /><p>Coming soon to London.</p><div className="footer-details" aria-label="Solver launch details">{[[detailIcons.tag, "Launch preview"], [detailIcons.star, "Thoughtful service in development"], [detailIcons.headphones, "Updates by email"], [detailIcons.lock, "Details to be announced"]].map(([src, label]) => <span className="footer-detail" key={label}><IdentityIcon className="footer-detail__icon" src={src} width={1530} height={1326} /><span>{label}</span></span>)}</div></div><div className="footer-links"><p className="eyebrow">Explore</p>{solverConfig.navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</div><div className="footer-links"><p className="eyebrow">Stay informed</p><a className="footer-link" href={launchEmailHref} data-analytics-event="launch_interest" data-analytics-label="Footer launch updates">Get launch updates</a><span>London, United Kingdom</span><a className="footer-email" href={launchEmailHref} data-analytics-event="email_enquiry" data-analytics-label="Footer email">{solverConfig.contact.email}</a></div></div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} {solverConfig.brand.legalName}</span><nav className="footer-legal-links" aria-label="Legal information"><a className="footer-legal-link" href="/privacy">Privacy Policy</a><a className="footer-legal-link" href="/terms">Terms of Service</a><span>Designed and developed by VOLYNX.</span></nav></div>
      </footer>

    </main>
  );
}

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
const brandMarkImage = "/assets/solver-mark.webp";
const brandWordmarkImage = "/assets/solver-wordmark.webp";
const signatureDoorImage = "/assets/solver-signature-door.webp";

const identityIcons = {
  building: "/assets/solver-icons/solver-icons-select1.webp",
  calendar: "/assets/solver-icons/solver-icons-select10.webp",
  bed: "/assets/solver-icons/solver-icons-select2.webp",
  globe: "/assets/solver-icons/solver-icons-select14.webp",
  home: "/assets/solver-icons/solver-icons-select7.webp",
  keys: "/assets/solver-icons/solver-icons-select9.webp",
  mail: "/assets/solver-icons/solver-icons-select18.webp",
  plane: "/assets/solver-icons/solver-icons-select22.webp",
  shield: "/assets/solver-icons/solver-icons-select16.webp",
  train: "/assets/solver-icons/solver-icons-select23.webp",
  whatsapp: "/assets/solver-icons/solver-icons-select17.webp",
  wifi: "/assets/solver-icons/solver-icons-select15.webp",
} as const;

const superIcons = {
  camera: "/assets/solver-super-icons/optimized/solver-icons-super2.webp",
  calendar: "/assets/solver-super-icons/optimized/solver-icons-super5.webp",
  location: "/assets/solver-super-icons/optimized/solver-icons-super1.webp",
  shield: "/assets/solver-super-icons/optimized/solver-icons-super4.webp",
  suitcase: "/assets/solver-super-icons/optimized/solver-icons-super7.webp",
  whatsapp: "/assets/solver-super-icons/optimized/solver-icons-super3.webp",
  wifi: "/assets/solver-super-icons/optimized/solver-icons-super6.webp",
} as const;

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

function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand-lockup ${compact ? "brand-lockup--compact" : ""}`} href="#home" aria-label="Solver Accommodations home">
      <span className="brand-lockup__mark">
        <img src={brandMarkImage} alt="" width="1400" height="1400" loading={compact ? "eager" : "lazy"} />
      </span>
      <img className="brand-lockup__wordmark" src={brandWordmarkImage} alt="" width="1280" height="370" loading={compact ? "eager" : "lazy"} />
    </a>
  );
}

function WhatsAppLink({ children, className = "button button--gold", message = defaultWhatsAppMessage }: { children: React.ReactNode; className?: string; message?: string }) {
  const href = getConfiguredContactHref(message);
  const configured = Boolean(buildWhatsAppLink(message));

  return (
    <a className={`${className}${configured ? "" : " is-config-pending"}`} href={href} data-configured={configured}>
      {children}
    </a>
  );
}

function SectionIntro({ eyebrow, title, body, align = "left" }: { eyebrow: string; title: React.ReactNode; body?: string; align?: "left" | "center" }) {
  return (
    <div className={`section-intro section-intro--${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {body ? <p className="section-intro__body">{body}</p> : null}
    </div>
  );
}

function IdentityIcon({ src, className = "", width = 1530, height = 1326 }: { src: string; className?: string; width?: number; height?: number }) {
  return <img className={`identity-icon ${className}`} src={src} alt="" width={width} height={height} loading="lazy" />;
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
            <WhatsAppLink className="button button--small button--gold" message={"Hello, I would like to enquire about a short stay in London."}>
              <Icon name="message" size={16} />
              <span>Book via WhatsApp</span>
            </WhatsAppLink>
          </nav>
          <div className="header-actions">
            <WhatsAppLink className="button button--small button--gold header-whatsapp" message={"Hello, I would like to enquire about a short stay in London."}>
              <Icon name="message" size={16} />
              <span>Book via WhatsApp</span>
            </WhatsAppLink>
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
            <Reveal><p className="eyebrow eyebrow--gold">Short stays in London</p></Reveal>
            <Reveal delay={80}><h1 id="hero-title">Comfortable stays.<br /><em>Thoughtfully solved.</em></h1></Reveal>
            <Reveal delay={140}><p className="hero__lede">Flexible short-term accommodation in London for business travellers, tourists and visiting students.</p></Reveal>
            <Reveal className="hero__actions" delay={200}>
              <WhatsAppLink message={defaultWhatsAppMessage}><Icon name="message" size={18} /> Book via WhatsApp <Icon name="arrow" size={18} /></WhatsAppLink>
              <a className="button button--quiet" href="#about">Discover Solver <Icon name="arrow" size={17} /></a>
            </Reveal>
            <Reveal delay={260}>
              <div className="hero__status"><span className="status-dot" /> {solverConfig.launch.bookingExperienceLabel}</div>
            </Reveal>
          </div>
          <Reveal className="hero__signature" delay={180}>
            <img src={signatureDoorImage} alt="" width="1800" height="1800" loading="eager" />
          </Reveal>
        </div>
        <a className="hero__scroll" href="#about"><span>Scroll to explore</span><Icon name="chevron" size={18} /></a>
      </section>

      <section className="trust-strip" aria-label="Solver Accommodations highlights">
        <div className="container trust-strip__inner">
          {[
            [identityIcons.home, "Short stays in London"],
            [identityIcons.bed, "Comfort-led accommodation"],
            [identityIcons.keys, "Simple arrival details"],
            [identityIcons.whatsapp, "Fast WhatsApp assistance"],
            [identityIcons.globe, "Trusted booking platforms"],
          ].map(([src, text]) => <div className="trust-item" key={text}><IdentityIcon className="trust-item__icon" src={src} /><span>{text}</span></div>)}
        </div>
      </section>

      <section className="section section--signature" aria-labelledby="signature-title">
        <div className="container signature-grid">
          <Reveal className="signature-art">
            <img className="signature-art__door" src={signatureDoorImage} alt="" width="1800" height="1800" loading="lazy" />
            <span className="signature-art__halo" />
          </Reveal>
          <Reveal className="signature-copy" delay={100}>
            <SectionIntro eyebrow="Solver signature" title={<>A welcome<br />that feels<br /><em>already<span className="signature-mobile-break"><br /></span><span className="signature-desktop-space"> </span>considered.</em></>} body="This piece carries the Solver identity: a calm entrance, warm details and the sense that the stay has been prepared before you arrive." />
            <div className="signature-points" aria-label="Solver identity principles">
              {[
                [identityIcons.keys, "Clear arrival"],
                [identityIcons.bed, "Comfort first"],
                [identityIcons.shield, "Trusted handling"],
              ].map(([src, label]) => (
                <div className="signature-point" key={label}>
                  <IdentityIcon className="signature-point__icon" src={src} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--about" id="about" aria-labelledby="about-title">
        <div className="container about-grid">
          <Reveal className="about-visual">
            <div className="about-visual__frame">
              <img src={heroImage} alt="A calm, warm bedroom interior prepared for a short stay" width="1800" height="1013" loading="lazy" />
              <div className="image-caption"><span className="image-caption__line" /> <span>Stay with intention</span></div>
            </div>
            <IdentityIcon className="about-visual__identity" src={superIcons.shield} width={1066} height={1400} />
            <div className="about-visual__stamp"><Icon name="spark" size={21} /><span>London<br />short stays</span></div>
          </Reveal>
          <Reveal className="about-copy" delay={100}>
            <SectionIntro eyebrow="About Solver" title={<>A more considered way<br />to stay in London.</>} body="Solver Accommodation K&D Limited provides professionally managed short-term accommodation in London. We welcome business travellers, short-stay tourists and university students looking for a comfortable and convenient place to stay." />
            <div className="editorial-note"><span>Our approach</span><p>Clear communication, a comfortable base and a simpler way to arrange your stay.</p></div>
            <a className="text-link" href="#stays">See who we welcome <Icon name="arrow" size={17} /></a>
          </Reveal>
        </div>
      </section>

      <section className="section section--profiles" id="stays" aria-labelledby="profiles-title">
        <div className="container">
          <Reveal><SectionIntro eyebrow="Who we welcome" title={<>A stay shaped around<br /><em>your reason for travelling.</em></>} body="Different journeys ask for different kinds of comfort. Solver keeps the essentials simple, considered and easy to arrange." /></Reveal>
          <div className="profile-grid">
            {[
              { number: "01", image: superIcons.suitcase, width: 1062, height: 1400, title: "Business Travellers", copy: "Convenient short stays, reliable communication and a comfortable environment for work trips." },
              { number: "02", image: superIcons.camera, width: 1400, height: 1025, title: "Short-Stay Visitors", copy: "A practical base for discovering London without committing to a long-term tenancy." },
              { number: "03", image: superIcons.calendar, width: 1180, height: 1400, title: "Visiting Students", copy: "Flexible accommodation for university visits, interviews, events and short academic stays." },
            ].map((profile, index) => (
              <Reveal className="profile-card" delay={index * 80} key={profile.number}>
                <div className="profile-card__top"><span className="profile-card__number">{profile.number}</span><img className="profile-card__icon" src={profile.image} alt="" width={profile.width} height={profile.height} loading="lazy" /></div>
                <h3>{profile.title}</h3>
                <p>{profile.copy}</p>
                <span className="profile-card__rule" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--experience" aria-labelledby="experience-title">
        <div className="container experience-grid">
          <Reveal className="experience-copy"><SectionIntro eyebrow="The stay experience" title={<>The essentials,<br /><em>thoughtfully handled.</em></>} body="A short stay should feel clear from the first enquiry. These are the principles behind the Solver experience." /><WhatsAppLink className="button button--outline" message={"Hello, I would like to learn more about staying with Solver Accommodation."}>Talk to our team <Icon name="arrow" size={17} /></WhatsAppLink></Reveal>
          <div className="experience-system">
            <Reveal className="super-feature super-feature--wifi" delay={80}>
              <img className="super-feature__art" src={superIcons.wifi} alt="" width="1400" height="1347" loading="lazy" />
              <div className="super-feature__copy"><span>Connected support</span><p>Direct, clear communication before and during the stay.</p></div>
            </Reveal>
            <div className="benefit-list">
            {[
              [identityIcons.calendar, "Short and flexible stays", "Stay for the length your London plans require."],
              [identityIcons.building, "London location", "A considered base for work, study and exploring the city."],
              [identityIcons.whatsapp, "Direct support", "Get clear answers through a direct enquiry channel."],
              [identityIcons.shield, "Trusted platform bookings", "Current stays are managed through established booking platforms."],
            ].map(([src, title, copy], index) => <Reveal className="benefit-item" delay={index * 60} key={title}><IdentityIcon className="benefit-item__icon" src={src} /><div><h3>{title}</h3><p>{copy}</p></div></Reveal>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--accommodation" aria-labelledby="accommodation-title">
        <div className="container accommodation-panel">
          <img className="accommodation-panel__super accommodation-panel__super--suitcase" src={superIcons.suitcase} alt="" width="1062" height="1400" loading="lazy" />
          <IdentityIcon className="accommodation-panel__mini accommodation-panel__mini--bed" src={identityIcons.bed} />
          <div className="accommodation-panel__ornament"><span /> <Icon name="door" size={22} /> <span /></div>
          <Reveal><SectionIntro align="center" eyebrow="Accommodation preview" title={<>Room details are<br /><em>being prepared.</em></>} body="Our accommodation experience is being prepared with the same care we bring to every stay. Direct booking options will be available soon." /></Reveal>
          <Reveal className="accommodation-panel__meta" delay={100}><span><Icon name="spark" size={16} /> Designed for short stays</span><span><Icon name="message" size={16} /> Ask about current availability</span></Reveal>
          <Reveal delay={160}><WhatsAppLink className="button button--gold" message={"Hello, I would like to ask about current accommodation availability in London."}>Ask about current availability <Icon name="arrow" size={17} /></WhatsAppLink></Reveal>
        </div>
      </section>

      <section className="section section--booking" aria-labelledby="booking-title">
        <div className="container booking-grid">
          <Reveal className="booking-copy"><p className="eyebrow eyebrow--gold">The next chapter</p><h2 id="booking-title">A better booking experience<br /><em>is on the way.</em></h2><p>We are preparing a dedicated booking experience designed to make discovering availability and arranging your stay even simpler.</p><WhatsAppLink message={"Hello, I found Solver Accommodation through the website and I would like to check availability for a short stay in London."}>Check availability on WhatsApp <Icon name="arrow" size={17} /></WhatsAppLink></Reveal>
          <Reveal className="booking-steps" delay={120}>
            <img className="booking-steps__super" src={superIcons.calendar} alt="" width="1180" height="1400" loading="lazy" />
            {[
              ["01", "Browse", "Discover the right stay for your London plans."],
              ["02", "Enquire", "Ask a simple question through your preferred channel."],
              ["03", "Confirm", "Arrange the details directly with our team."],
              ["04", "Stay", "Arrive with the essentials already solved."],
            ].map(([number, title, copy], index) => <div className="booking-step" key={number}><span className="booking-step__number">{number}</span><div><h3>{title}</h3><p>{copy}</p></div>{index < 3 ? <span className="booking-step__connector" /> : null}</div>)}
          </Reveal>
        </div>
      </section>

      <section className="section section--platforms" aria-labelledby="platforms-title">
        <div className="container">
          <Reveal><SectionIntro align="center" eyebrow="How to enquire" title={<>Choose the channel<br /><em>that suits you.</em></>} body="WhatsApp is our direct enquiry channel. Current listings may also be available through trusted booking platforms." /></Reveal>
          <div className="platform-grid">
            <Reveal className="platform-card platform-card--primary"><div className="platform-card__icon"><IdentityIcon src={identityIcons.whatsapp} /></div><div><p className="eyebrow eyebrow--gold">Preferred channel</p><h3>WhatsApp</h3><p>Message our team directly about current availability and short stays in London.</p><WhatsAppLink className="text-link" message={defaultWhatsAppMessage}>Start an enquiry <Icon name="arrow" size={16} /></WhatsAppLink></div></Reveal>
            <Reveal className="platform-card" delay={80}><div className="platform-card__icon"><IdentityIcon src={identityIcons.home} /></div><div><p className="eyebrow">Trusted platform</p><h3>Airbnb</h3><p>Our Airbnb link will be added here once the official listing URL is confirmed.</p><span className="platform-card__pending">Link to be configured</span></div></Reveal>
            <Reveal className="platform-card" delay={160}><div className="platform-card__icon"><IdentityIcon src={identityIcons.calendar} /></div><div><p className="eyebrow">Trusted platform</p><h3>Booking.com</h3><p>Our Booking.com link will be added here once the official listing URL is confirmed.</p><span className="platform-card__pending">Link to be configured</span></div></Reveal>
          </div>
        </div>
      </section>

      <section className="section section--location" id="location" aria-labelledby="location-title">
        <div className="container location-grid">
          <Reveal className="location-card"><div className="location-card__map"><div className="map-grid" /><span className="map-route map-route--one" /><span className="map-route map-route--two" /><img className="location-card__super-pin" src={superIcons.location} alt="" width="1354" height="1400" loading="lazy" /><span className="map-label">LONDON</span></div><div className="location-card__footer"><span><IdentityIcon className="location-card__footer-icon" src={identityIcons.train} /> London, UK</span><span>Area details on request</span></div></Reveal>
          <Reveal className="location-copy" delay={100}><SectionIntro eyebrow="Location" title={<>Your base for<br /><em>London.</em></>} body="Solver Accommodation operates in London, offering a practical and comfortable base for short stays across the city." /><div className="location-note"><Icon name="shield" size={19} /><p>We keep exact residential addresses private until a booking is confirmed through the appropriate channel.</p></div><a className="button button--outline" href="#contact">Contact the team <Icon name="arrow" size={17} /></a></Reveal>
        </div>
      </section>

      <section className="section section--contact" id="contact" aria-labelledby="contact-title">
        <div className="container contact-panel">
          <img className="contact-panel__super" src={superIcons.whatsapp} alt="" width="1267" height="1400" loading="lazy" />
          <Reveal><p className="eyebrow eyebrow--gold">Contact Solver</p><h2 id="contact-title">Let&apos;s solve<br /><em>your stay.</em></h2><p className="contact-panel__lede">Tell us a little about your plans and we&apos;ll help you understand the next step.</p></Reveal>
          <Reveal className="contact-actions" delay={100}><WhatsAppLink className="button button--gold" message={defaultWhatsAppMessage}><Icon name="message" size={18} /> Enquire on WhatsApp <Icon name="arrow" size={17} /></WhatsAppLink><div className="contact-detail"><Icon name="mail" size={18} /><span>{solverConfig.contact.email || "Email address to be configured"}</span></div><div className="contact-detail"><Icon name="pin" size={18} /><span>{solverConfig.contact.serviceArea}</span></div></Reveal>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid"><div className="footer-brand"><BrandLogo /><p>{solverConfig.brand.slogan}</p></div><div className="footer-links"><p className="eyebrow">Explore</p>{solverConfig.navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</div><div className="footer-links"><p className="eyebrow">Connect</p><WhatsAppLink className="footer-link" message={defaultWhatsAppMessage}>WhatsApp</WhatsAppLink><span>London, United Kingdom</span><span>{solverConfig.contact.email || "Email to be configured"}</span></div></div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} {solverConfig.brand.legalName}</span><div><a href="#contact">Privacy Policy</a><a href="#contact">Terms</a><span>Designed and developed by VOLYNX.</span></div></div>
      </footer>

    </main>
  );
}

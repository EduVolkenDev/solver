import Link from "next/link";

type LegalPageProps = {
  title: string;
  lastUpdated: string;
  icon: string;
  children: React.ReactNode;
};

export function LegalPage({ title, lastUpdated, icon, children }: LegalPageProps) {
  return (
    <main className="legal-page" aria-labelledby="legal-page-title">
      <div className="legal-page__shell">
        <Link className="legal-page__back" href="/">
          <span aria-hidden="true">←</span> Back to Solver Accommodations
        </Link>
        <header className="legal-header">
          <p className="legal-eyebrow">Legal</p>
          <h1 id="legal-page-title">{title}</h1>
          <p className="legal-updated">Last updated: {lastUpdated}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="legal-header__icon" src={icon} alt="" width="1530" height="1326" />
        </header>
        <section className="legal-content">{children}</section>
        <nav className="legal-page__actions" aria-label="Legal pages">
          <a className="button button--outline" href="/privacy">Privacy Policy</a>
          <a className="button button--outline" href="/terms">Terms of Service</a>
        </nav>
      </div>
    </main>
  );
}

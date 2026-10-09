import Link from 'next/link';

// Shared layout for the Privacy and Terms pages: a narrow reading column,
// the title, when it last changed, and the sections passed in.
export default function LegalPage({ title, updated, intro, children }) {
  return (
    <main className="legal">
      <div className="legal-inner">
        <Link href="/" className="pd-back">
          <svg className="chev" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ transform: 'scaleX(-1)' }}>
            <path d="M4.5 2.5 8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Home
        </Link>
        <h1 className="headline">{title}</h1>
        <p className="legal-updated">Last updated {updated}</p>
        <p className="lede legal-intro">{intro}</p>
        <div className="legal-body">{children}</div>
      </div>
    </main>
  );
}

import Link from 'next/link';

export const metadata = { title: 'Page not found — Daniyal Zia' };

export default function NotFound() {
  return (
    <main className="nf">
      <div className="nf-code">404</div>
      <h1 className="headline">This page doesn&apos;t exist.</h1>
      <p className="lede">The link may be old, or the address mistyped.</p>
      <div className="nf-ctas">
        <Link href="/" className="btn-pill btn-primary">Back to the homepage</Link>
        <Link href="/#projects" className="link-arrow">See the projects ›</Link>
      </div>
    </main>
  );
}

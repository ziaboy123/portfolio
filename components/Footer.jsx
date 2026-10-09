'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { label: 'Projects', id: 'projects' },
  { label: 'Capabilities', id: 'capabilities' },
  { label: 'About', id: 'about' },
  { label: 'Timeline', href: '/timeline' },
  { label: 'Contact', id: 'contact' },
];

export default function Footer() {
  const isHome = usePathname() === '/';
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span className="footer-legal">
          <span>Copyright © {year} Daniyal Zia.</span>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </span>
        <nav className="footer-links">
          {LINKS.map(({ label, id, href }) => (
            <Link
              key={label}
              href={href ?? (isHome ? `#${id}` : `/#${id}`)}
              onClick={(e) => {
                if (href || !isHome) return;
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

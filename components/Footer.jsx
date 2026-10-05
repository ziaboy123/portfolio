'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { label: 'Projects', id: 'projects' },
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
        <span>Copyright © {year} Daniyal Zia. Designed, built and self-hosted by me.</span>
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

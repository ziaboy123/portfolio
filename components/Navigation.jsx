'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Projects', id: 'projects', type: 'anchor' },
  { label: 'About', id: 'about', type: 'anchor' },
  { label: 'Timeline', id: 'timeline', type: 'page', href: '/timeline' },
  { label: 'Contact', id: 'contact', type: 'anchor' },
];

export default function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Arriving here via a cross-page link like /#projects: the browser tries to
  // jump to the hash before the client-rendered layout has settled (fonts,
  // reveal animations, etc.), so it lands short. Re-scroll once mounted.
  useEffect(() => {
    if (!isHome || !window.location.hash) return;
    const id = window.location.hash.slice(1);
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }, [isHome]);

  useEffect(() => {
    if (!isHome) return;
    const sections = ['hero', 'projects', 'about', 'timeline', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id === 'hero' ? '' : e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const handleNav = (e, id) => {
    if (!isHome) return; // let it navigate to /#id normally
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.3s ease, border-color 0.3s ease',
        background: scrolled ? 'rgba(10,10,12,0.92)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <nav
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          onClick={(e) => { if (isHome) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              border: '1.5px solid var(--red-bright)',
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                inset: '4px',
                background: 'var(--red-core)',
                opacity: 0.6,
              }}
            />
          </span>
          <span
            className="mono"
            style={{
              fontSize: '13px',
              letterSpacing: '0.2em',
              color: 'var(--text-primary)',
              fontWeight: 600,
            }}
          >
            D.ZIA
          </span>
        </Link>

        {/* Desktop links */}
        <ul
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            listStyle: 'none',
          }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => {
            const linkHref = link.type === 'page' ? link.href : (isHome ? `#${link.id}` : `/#${link.id}`);
            const isActive = link.type === 'page' ? pathname === link.href : (isHome && active === link.id);
            return (
              <li key={link.id}>
                <Link
                  href={linkHref}
                  onClick={link.type === 'anchor' ? (e) => handleNav(e, link.id) : () => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '6px 14px',
                    fontSize: '13px',
                    letterSpacing: '0.04em',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? 'var(--text-primary)' : 'var(--text-muted)'; }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '14px',
                        right: '14px',
                        height: '1px',
                        background: 'var(--red-bright)',
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Status tag */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
          className="hidden-mobile"
        >
          <div
            className="mono"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              fontSize: '11px',
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
            }}
          >
            <span
              className="status-pulse"
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--red-bright)',
                display: 'inline-block',
              }}
            />
            OPERATIONAL
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
          }}
          className="show-mobile"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: menuOpen && i === 1 ? 'transparent' : 'var(--text-secondary)',
                transition: 'all 0.2s ease',
                transform:
                  menuOpen && i === 0 ? 'rotate(45deg) translate(4px, 4px)' :
                  menuOpen && i === 2 ? 'rotate(-45deg) translate(4px, -4px)' :
                  'none',
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: 'var(--bg-surface)',
            borderTop: '1px solid var(--border)',
            padding: '8px 0 16px',
          }}
        >
          {navLinks.map((link) => {
            const linkHref = link.type === 'page' ? link.href : (isHome ? `#${link.id}` : `/#${link.id}`);
            return (
              <Link
                key={link.id}
                href={linkHref}
                onClick={link.type === 'anchor' ? (e) => handleNav(e, link.id) : () => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '12px 24px',
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

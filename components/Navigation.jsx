'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '@/components/ui/motion';

const navLinks = [
  { label: 'Projects', id: 'projects', type: 'anchor' },
  { label: 'Capabilities', id: 'capabilities', type: 'anchor' },
  { label: 'About', id: 'about', type: 'anchor' },
  { label: 'Timeline', id: 'timeline', type: 'page', href: '/timeline' },
  { label: 'Contact', id: 'contact', type: 'anchor' },
];

function clearHash() {
  if (window.location.hash) window.history.replaceState(null, '', window.location.pathname);
}

export default function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Arriving here via a cross-page link like /#projects: the browser tries to
  // jump to the hash before the client-rendered layout has settled (fonts,
  // reveal animations, etc.), so it lands short. Re-scroll once mounted, then
  // drop the hash so a later refresh restores where you actually are instead
  // of jumping back to that section.
  useEffect(() => {
    if (!isHome || !window.location.hash) return;
    const id = window.location.hash.slice(1);
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      clearHash();
    }, 100);
    return () => clearTimeout(timer);
  }, [isHome]);

  useEffect(() => {
    if (!isHome) return;
    const sections = ['hero', 'projects', 'capabilities', 'about', 'timeline', 'contact'];
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = (e, id) => {
    setMenuOpen(false);
    if (!isHome) return; // let it navigate to /#id normally
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    clearHash();
  };

  const hrefFor = (link) => (link.type === 'page' ? link.href : isHome ? `#${link.id}` : `/#${link.id}`);
  const clickFor = (link) => (link.type === 'anchor' ? (e) => handleNav(e, link.id) : () => setMenuOpen(false));

  return (
    <header className={`nav${scrolled || menuOpen ? ' is-scrolled' : ''}`}>
      <nav className="nav-inner">
        <Link
          href="/"
          className="nav-mark"
          onClick={(e) => {
            setMenuOpen(false);
            if (isHome) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); clearHash(); }
          }}
        >
          <span className="nav-mark-dot" />
          Daniyal Zia
        </Link>

        <ul className="nav-links">
          {navLinks.map((link) => {
            const isActive = link.type === 'page' ? pathname === link.href : (isHome && active === link.id) || (link.id === 'projects' && pathname.startsWith('/projects/'));
            return (
              <li key={link.id}>
                <Link href={hrefFor(link)} onClick={clickFor(link)} className={`nav-link${isActive ? ' is-active' : ''}`}>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href={isHome ? '#contact' : '/#contact'} onClick={(e) => handleNav(e, 'contact')} className="nav-cta">
          Get in touch
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`nav-burger${menuOpen ? ' is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.05 + i * 0.05 }}
              >
                <Link href={hrefFor(link)} onClick={clickFor(link)}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const CHANNELS = [
  {
    id: 'github',
    label: 'GitHub',
    handle: '@ziaboy123',
    description: 'Source code, repositories, and project activity across the full ecosystem.',
    href: 'https://github.com/ziaboy123',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'Daniyal Zia',
    description: 'Professional background and career milestones.',
    href: 'https://www.linkedin.com/in/daniyalzia/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'Email',
    handle: 'daniyalzia01@gmail.com',
    description: 'Direct communication for collaborations and inquiries.',
    href: 'mailto:daniyalzia01@gmail.com',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
      </svg>
    ),
  },
];

function ContactCard({ channel, index }) {
  const [ref, visible] = useReveal(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <a
      ref={ref}
      href={channel.href}
      target={channel.id !== 'email' ? '_blank' : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '36px',
        background: 'var(--bg-elevated)',
        border: '1px solid',
        borderColor: hovered ? 'var(--border)' : 'var(--border-subtle)',
        textDecoration: 'none',
        transition: 'border-color 0.2s ease, background 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        cursor: 'pointer',
      }}
      className="contact-card"
    >
      <style>{`.contact-card{transition:border-color 0.2s ease, background 0.2s ease, opacity 0.55s ease ${index * 0.1}s, transform 0.55s ease ${index * 0.1}s !important;}`}</style>

      {/* Top accent */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: hovered ? 'linear-gradient(90deg, var(--red-bright), transparent)' : 'transparent',
          transition: 'background 0.3s ease',
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: hovered ? 'var(--red-accent)' : 'var(--text-muted)',
          marginBottom: '24px',
          transition: 'color 0.2s ease, border-color 0.2s ease',
          borderColor: hovered ? 'var(--red-dim)' : 'var(--border)',
          background: hovered ? 'rgba(153,27,27,0.08)' : 'var(--bg-base)',
        }}
      >
        {channel.icon}
      </div>

      <div
        className="mono"
        style={{
          fontSize: '10px',
          letterSpacing: '0.15em',
          color: 'var(--text-muted)',
          marginBottom: '6px',
        }}
      >
        {channel.label.toUpperCase()}
      </div>
      <div
        style={{
          fontSize: '17px',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: '12px',
          letterSpacing: '-0.01em',
        }}
      >
        {channel.handle}
      </div>
      <div
        style={{
          fontSize: '14px',
          color: 'var(--text-muted)',
          lineHeight: 1.55,
          flex: 1,
        }}
      >
        {channel.description}
      </div>

      {/* Arrow */}
      <div
        style={{
          marginTop: '28px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          color: hovered ? 'var(--red-accent)' : 'var(--text-faint)',
          transition: 'color 0.2s ease',
          letterSpacing: '0.06em',
        }}
        className="mono"
      >
        {channel.id === 'email' ? 'SEND MESSAGE' : 'OPEN PROFILE'}
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{
            transform: hovered ? 'translate(3px, -3px)' : 'translate(0, 0)',
            transition: 'transform 0.2s ease',
          }}
        >
          <path d="M1 11L11 1M11 1H5M11 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </a>
  );
}

export default function Contact() {
  const [headerRef, headerVisible] = useReveal(0.2);

  return (
    <section
      id="contact"
      style={{
        padding: 'clamp(80px,10vw,120px) 0',
        borderTop: '1px solid var(--border-subtle)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient red glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-200px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '600px',
          background: 'radial-gradient(ellipse, rgba(153,27,27,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        <div
          ref={headerRef}
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            textAlign: 'center',
            marginBottom: '64px',
          }}
        >
          <SectionHeader
            eyebrow="Contact"
            title="Open Channels"
            description="Reach out via any of the channels below. More will be added as the ecosystem grows."
            align="center"
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2px',
            maxWidth: '900px',
            margin: '0 auto',
          }}
          className="contact-grid"
        >
          {CHANNELS.map((channel, i) => (
            <ContactCard key={channel.id} channel={channel} index={i} />
          ))}
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '64px',
            paddingTop: '48px',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <div
            className="mono"
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: 'var(--text-muted)',
            }}
          >
            NEXUS — ONE BUILDER. MULTIPLE SYSTEMS.
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

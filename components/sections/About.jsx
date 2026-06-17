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

const DISCIPLINES = [
  {
    id: 'se',
    label: 'Software Engineering',
    detail: 'Full-stack development with an emphasis on clean architecture, performance, and products that work well at every layer — from database to UI.',
  },
  {
    id: 'ai',
    label: 'Artificial Intelligence',
    detail: 'Applying AI and machine learning to real problems — building systems that are smarter, more adaptive, and genuinely useful rather than impressive for its own sake.',
  },
  {
    id: 'cs',
    label: 'Computer Science',
    detail: 'Algorithms, data structures, and systems theory as the bedrock — not just knowing how to build things, but understanding why they work and when they break.',
  },
  {
    id: 'auto',
    label: 'Automation',
    detail: 'Eliminating manual work at every level. If something can be scripted, scheduled, or triggered automatically, it should be. Human time is better spent elsewhere.',
  },
  {
    id: 'infra',
    label: 'Infrastructure',
    detail: 'Self-hosted systems, homelab operations, and the discipline of running production-grade services yourself — because understanding infrastructure makes you a better engineer.',
  },
];

function DisciplineItem({ item, index }) {
  const [ref, visible] = useReveal(0.1);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      ref={ref}
      onClick={() => setExpanded(!expanded)}
      style={{
        borderBottom: '1px solid var(--border-subtle)',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-16px)',
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="mono" style={{ fontSize: '11px', color: 'var(--red-bright)', letterSpacing: '0.1em', minWidth: '32px' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span style={{ fontSize: '17px', fontWeight: 500, color: expanded ? 'var(--text-primary)' : 'var(--text-secondary)', transition: 'color 0.2s ease' }}>
            {item.label}
          </span>
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ flexShrink: 0, transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', color: expanded ? 'var(--red-accent)' : 'var(--text-muted)' }}>
          <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      {expanded && (
        <div style={{ paddingBottom: '18px', paddingLeft: '48px', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.65, animation: 'fadeIn 0.2s ease' }}>
          {item.detail}
        </div>
      )}
    </div>
  );
}

export default function About() {
  const [headerRef, headerVisible] = useReveal(0.2);
  const [rightRef, rightVisible] = useReveal(0.15);

  return (
    <section
      id="about"
      style={{ padding: 'clamp(80px,10vw,120px) 0', borderTop: '1px solid var(--border-subtle)' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 480px', gap: '80px', alignItems: 'start' }}
          className="about-grid"
        >
          {/* Left */}
          <div
            ref={headerRef}
            style={{ opacity: headerVisible ? 1 : 0, transition: 'opacity 0.6s ease' }}
          >
            <SectionHeader
              eyebrow="About"
              title="The Builder"
              description="Building ambitious technical systems, one layer at a time."
            />
            <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
              {DISCIPLINES.map((item, i) => (
                <DisciplineItem key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>

          {/* Right */}
          <div
            ref={rightRef}
            style={{
              opacity: rightVisible ? 1 : 0,
              transform: rightVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.65s ease 0.15s, transform 0.65s ease 0.15s',
            }}
          >
            {/* Philosophy card */}
            <div style={{ padding: '36px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderLeft: '2px solid var(--red-core)', marginBottom: '2px' }}>
              <div className="mono" style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'var(--red-accent)', marginBottom: '20px' }}>
                APPROACH
              </div>
              <blockquote style={{ fontSize: 'clamp(17px, 2.2vw, 21px)', fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '20px', letterSpacing: '-0.01em' }}>
                "Ship real products. Understand every layer. Operate what you build."
              </blockquote>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                Every project in this ecosystem is designed, built, and run by one person. That means
                taking full ownership of the stack — from the database to the deployment, from the
                algorithm to the UI. No outsourcing the hard parts.
              </p>
            </div>

            {/* Attribute grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
              {[
                { label: 'Role', value: 'Solo Builder' },
                { label: 'Background', value: 'Computer Science' },
                { label: 'Focus', value: 'Products + Systems' },
                { label: 'Stack', value: 'Full, end to end' },
                { label: 'Approach', value: 'Ship and operate' },
                { label: 'Domains', value: 'CS · AI · Infra' },
              ].map(({ label, value }) => (
                <div key={label} style={{ padding: '18px 20px', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                  <div className="mono" style={{ fontSize: '10px', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '6px' }}>{label.toUpperCase()}</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 960px) { .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  );
}

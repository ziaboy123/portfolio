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
    detail: 'Full-stack development — building things end to end, from database schema to the UI, and figuring out everything in between as I go.',
  },
  {
    id: 'ai',
    label: 'Artificial Intelligence',
    detail: 'One of the main reasons I got into CS. I want to understand how it actually works — not just call APIs, but know the foundations.',
  },
  {
    id: 'cs',
    label: 'Computer Science',
    detail: 'Currently studying CS and using everything I learn to build real things. Theory and practice together — it's the only way it sticks.',
  },
  {
    id: 'infra',
    label: 'Infrastructure',
    detail: 'Running a Proxmox homelab and self-hosting everything on it. Broke things more than once. Learned more from that than anything else.',
  },
  {
    id: 'auto',
    label: 'Automation',
    detail: 'If something can be scripted or automated, I want to know how. Repetitive manual work is the enemy.',
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
              title="Still Learning"
              description="A computer science student building real things to figure out how it all works."
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
                "Build something real. Break it. Fix it. Repeat until it makes sense."
              </blockquote>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                I&apos;m a computer science student who learns by doing. Every project here started
                because I wanted to understand something — how auth works, how to run a server,
                how to build something people can actually use. I&apos;m figuring it out as I go,
                and building this ecosystem is how I do that.
              </p>
            </div>

            {/* Attribute grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
              {[
                { label: 'Status', value: 'CS Student' },
                { label: 'Background', value: 'Self-taught + studying' },
                { label: 'Focus', value: 'Build and learn' },
                { label: 'Stack', value: 'Full, end to end' },
                { label: 'Approach', value: 'Ship and iterate' },
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

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

const EVENTS = [
  {
    seq: '01',
    type: 'milestone',
    title: 'Nexus (Portfolio) Conceived',
    description: 'Decided to build a central hub above all individual projects — a permanent home for the full ecosystem as it grows.',
    tag: 'Foundation',
    project: 'NEXUS',
  },
  {
    seq: '02',
    type: 'launch',
    title: 'DeckForge — Initiated',
    description: 'Started building a professional-grade Yu-Gi-Oh! deck builder and hand simulator. Established the landing page, auth flows, and core architecture.',
    tag: 'DeckForge',
    project: 'DeckForge',
  },
  {
    seq: '03',
    type: 'launch',
    title: 'DeckForge — Deck Builder Live',
    description: 'Shipped the core deck builder interface: full 13,000+ card database, search with filters, deck management, two-column layout, and a click-to-pin card preview panel.',
    tag: 'DeckForge',
    project: 'DeckForge',
  },
  {
    seq: '04',
    type: 'launch',
    title: 'Cipher — Built & Shipped',
    description: 'Built an ephemeral chat platform from scratch. Flask + SocketIO backend, in-memory rooms, zero persistence, zero accounts. Private by design.',
    tag: 'Cipher',
    project: 'Cipher',
  },
  {
    seq: '05',
    type: 'launch',
    title: 'WatchMatch — Built & Shipped',
    description: 'Built a personalised watch recommendation engine. Quiz flow, swipe mode, and a curated database of 100+ watches matched by lifestyle, budget, wrist size, and style.',
    tag: 'WatchMatch',
    project: 'WatchMatch',
  },
  {
    seq: '06',
    type: 'milestone',
    title: 'Nexus (Portfolio) v1.0 — Live',
    description: 'Portfolio launched at daniyalzia.co.uk. All three projects showcased. Infrastructure dashboard, timeline, and contact sections live. The ecosystem is now publicly visible.',
    tag: 'Portfolio',
    project: 'NEXUS',
  },
  {
    seq: '07',
    type: 'launch',
    title: 'Home Server — Self-Hosted',
    description: 'Moved all projects off cloud hosting onto a self-managed home server. Everything self-hosted and self-maintained.',
    tag: 'Infrastructure',
    project: 'Infra',
  },
  {
    seq: '08',
    type: 'launch',
    title: 'Full Ecosystem Live',
    description: 'DeckForge, Cipher, WatchMatch, and the portfolio are all publicly accessible under daniyalzia.co.uk. Project links active across the portfolio.',
    tag: 'Ecosystem',
    project: 'All',
  },
];

const TYPE_COLORS = {
  milestone:     { dot: 'var(--red-bright)',  line: 'var(--red-dim)' },
  launch:        { dot: '#22c55e',            line: '#14532d' },
  infrastructure:{ dot: '#3b82f6',            line: '#1e3a5f' },
  planned:       { dot: 'var(--text-muted)',  line: 'var(--border)' },
};

const PROJECT_COLORS = {
  DeckForge: '#d97706',
  Cipher:    '#6b7280',
  WatchMatch:'#0ea5e9',
  NEXUS:     'var(--red-bright)',
  Portfolio: 'var(--red-bright)',
  Infra:     '#3b82f6',
  All:       '#22c55e',
};

function TimelineItem({ event, index, isLast }) {
  const [ref, visible] = useReveal(0.1);
  const colors = TYPE_COLORS[event.type] || TYPE_COLORS.planned;
  const isPlanned = event.type === 'planned';
  const projColor = PROJECT_COLORS[event.project] || 'var(--text-muted)';

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '56px 40px 1fr',
        gap: '0 20px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.55s ease ${index * 0.07}s, transform 0.55s ease ${index * 0.07}s`,
        minHeight: '72px',
      }}
    >
      {/* Sequence */}
      <div style={{ paddingTop: '2px', textAlign: 'right', paddingRight: '4px' }}>
        <span className="mono" style={{ fontSize: '13px', fontWeight: 700, color: isPlanned ? 'var(--text-faint)' : colors.dot, letterSpacing: '0.02em', opacity: isPlanned ? 0.5 : 1 }}>
          {event.seq}
        </span>
      </div>

      {/* Spine */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: isPlanned ? 'var(--bg-elevated)' : colors.dot, border: `2px solid ${isPlanned ? 'var(--border)' : colors.dot}`, flexShrink: 0, marginTop: '4px', zIndex: 1 }} />
        {!isLast && (
          <div style={{ width: '1px', flex: 1, background: isPlanned ? 'var(--border-subtle)' : colors.line, marginTop: '4px', minHeight: '40px', opacity: isPlanned ? 0.4 : 0.7 }} />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: isPlanned ? 'var(--text-muted)' : 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            {event.title}
          </h3>
          <span className="mono" style={{ padding: '2px 8px', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', fontSize: '10px', color: isPlanned ? 'var(--text-faint)' : projColor, letterSpacing: '0.1em', opacity: isPlanned ? 0.6 : 1 }}>
            {event.tag.toUpperCase()}
          </span>
          {isPlanned && (
            <span className="mono" style={{ fontSize: '10px', color: 'var(--text-faint)', letterSpacing: '0.08em' }}>UPCOMING</span>
          )}
        </div>
        <p style={{ fontSize: '14px', color: isPlanned ? 'var(--text-faint)' : 'var(--text-muted)', lineHeight: 1.6, maxWidth: '520px' }}>
          {event.description}
        </p>
      </div>
    </div>
  );
}

export default function Timeline() {
  const [headerRef, headerVisible] = useReveal(0.2);

  return (
    <section
      id="timeline"
      style={{ padding: 'clamp(80px,10vw,120px) 0', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div
          ref={headerRef}
          style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
        >
          <SectionHeader
            eyebrow="Timeline"
            title="The Record"
            description="Every project launched, system built, and milestone reached — in order."
          />
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '24px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {[
            { color: 'var(--red-bright)', label: 'Milestone' },
            { color: '#22c55e',           label: 'Launch' },
            { color: 'var(--text-muted)', label: 'Planned' },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, display: 'inline-block' }} />
              <span className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{label.toUpperCase()}</span>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: '700px' }}>
          {EVENTS.map((event, i) => (
            <TimelineItem key={event.seq} event={event} index={i} isLast={i === EVENTS.length - 1} />
          ))}

          {/* Future */}
          <div style={{ display: 'grid', gridTemplateColumns: '56px 40px 1fr', gap: '0 20px', opacity: 0.2 }}>
            <div />
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '4px' }}>
              <div style={{ width: '10px', height: '10px', border: '1.5px dashed var(--border)', borderRadius: '50%' }} />
            </div>
            <div className="mono" style={{ fontSize: '11px', color: 'var(--text-faint)', letterSpacing: '0.1em', paddingTop: '2px' }}>
              FUTURE MILESTONES — ONGOING
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

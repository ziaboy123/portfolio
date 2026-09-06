'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
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

export default function TimelineTeaser() {
  const [ref, visible] = useReveal(0.2);

  return (
    <section
      id="timeline"
      style={{ padding: 'clamp(80px,10vw,120px) 0', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        <SectionHeader
          eyebrow="Timeline"
          title="The Record"
          description="Every project launched, system built, and milestone reached — in order."
        />

        <Link
          href="/timeline"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 28px',
            background: 'var(--red-core)',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            border: '1px solid var(--red-bright)',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--red-bright)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--red-core)'; }}
        >
          VIEW FULL TIMELINE
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

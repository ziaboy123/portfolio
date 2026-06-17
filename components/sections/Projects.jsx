'use client';

import { useEffect, useRef, useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/ui/ProjectCard';

const PROJECTS = [
  {
    id: 'deckforge',
    name: 'DeckForge',
    status: 'active',
    screenshot: '/screenshots/deckforge.jpg',
    description:
      'Professional-grade deck building and testing platform for competitive Yu-Gi-Oh! players. Search 13,000+ cards, build and manage decks, simulate opening hands, and analyse consistency — all in one place.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    metrics: [
      { label: 'Cards', value: '13,000+' },
      { label: 'Hand Speed', value: '<50ms' },
      { label: 'Cost', value: 'Free' },
    ],
  },
  {
    id: 'cipher',
    name: 'Cipher',
    status: 'active',
    screenshot: '/screenshots/cipher.jpg',
    description:
      'Ephemeral, zero-persistence chat platform. Create a room, share the code, talk — then it\'s gone. No accounts, no message history, no traces. Private by design.',
    stack: ['Python', 'Flask', 'SocketIO', 'Eventlet'],
    metrics: [
      { label: 'Stored Messages', value: '0' },
      { label: 'Accounts Needed', value: 'None' },
      { label: 'Persistence', value: 'None' },
    ],
  },
  {
    id: 'watchmatch',
    name: 'WatchMatch',
    status: 'active',
    screenshot: '/screenshots/watchmatch.jpg',
    description:
      'Personalised watch recommendation engine. Answer a short quiz covering wrist size, style, lifestyle, and budget — get matched to the right watch from a curated database of 100+ timepieces across all price points.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    metrics: [
      { label: 'Watches', value: '100+' },
      { label: 'Time to Match', value: '<3 min' },
      { label: 'Sign-up', value: 'None' },
    ],
  },
];

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

function AnimatedCard({ project, index }) {
  const [ref, visible] = useReveal(0.05);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${index * 0.1}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s`,
      }}
    >
      <ProjectCard project={project} index={index} />
    </div>
  );
}

export default function Projects() {
  const [headerRef, headerVisible] = useReveal(0.2);

  return (
    <section
      id="projects"
      style={{
        padding: 'clamp(80px,10vw,120px) 0',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div
          ref={headerRef}
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <SectionHeader
            eyebrow="Projects"
            title="The Ecosystem"
            description="A collection of software products and tools — each solving a distinct problem, all part of one expanding network."
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {PROJECTS.map((project, i) => (
            <AnimatedCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Future slot */}
        <div
          style={{
            marginTop: '2px',
            padding: '28px 56px',
            border: '1px dashed var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            opacity: 0.35,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2v14M2 9h14" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="mono" style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
            FUTURE PROJECT SLOT — EXPANDABLE
          </span>
        </div>
      </div>
    </section>
  );
}

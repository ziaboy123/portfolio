'use client';

import { useEffect, useRef, useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/ui/ProjectCard';

const PUBLIC_PROJECTS = [
  {
    id: 'gambit',
    name: 'Gambit',
    status: 'active',
    url: 'https://daniyalzia.co.uk/gambit',
    screenshot: '/screenshots/gambit.jpg',
    description:
      'Full 3D medieval chess with animated piece combat. A cinematic camera cuts to every capture, three AI tiers cover all skill levels, and private rooms let you challenge a friend with a six-character code. Ranked games are tracked and replayable — no account needed to play.',
    stack: ['Three.js', 'Node.js', 'Socket.io', 'Stockfish'],
    metrics: [
      { label: 'AI Tiers', value: '3' },
      { label: 'Board', value: '3D' },
      { label: 'Cost', value: 'Free' },
    ],
  },
  {
    id: 'cipher',
    name: 'Cipher',
    status: 'active',
    url: 'https://daniyalzia.co.uk/cipher',
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
    url: 'https://daniyalzia.co.uk/watchmatch',
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
  {
    id: 'deckforge',
    name: 'DeckForge',
    status: 'active',
    url: 'https://daniyalzia.co.uk/deckforge',
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
];

const PERSONAL_PROJECTS = [
  {
    id: 'the-ultimate-realm',
    name: 'The Ultimate Realm',
    status: 'personal',
    url: null,
    urlNote: 'WHITELIST ONLY',
    screenshot: null,
    noVisual: true,
    hideLink: true,
    description: 'A private Minecraft server built from my own singleplayer world, running around the clock for me and a handful of friends. Real accounts, a strict whitelist, automatic backups, and a proper admin setup — not a rented server, a real one I run and maintain myself on the home server.',
    stack: ['Minecraft', 'Paper', 'Java 21', 'systemd'],
    metrics: [
      { label: 'Friends', value: '5' },
      { label: 'Uptime', value: '24/7' },
      { label: 'Access', value: 'Whitelist' },
    ],
  },
  {
    id: 'the-seven',
    name: 'The Seven',
    status: 'personal',
    url: null,
    urlNote: 'INTERNAL USE',
    screenshot: null,
    noVisual: true,
    hideLink: true,
    description: 'Seven distinct AI companions living on Discord, each with its own name, voice, and job — no single assistant wearing every hat. One handles email and the calendar, one plans trips, one helps prototype rough ideas, one tracks job applications against a strict checklist before anything gets submitted, one is just there for everyday chat, one keeps track of meals against a goal, and one has full, ongoing memory of every project I build and can pick up coding work directly. Runs around the clock on the home server, reachable anytime from Discord. Built to operate — not a public product.',
    stack: ['Python', 'FastAPI', 'Discord.py', 'Groq'],
    metrics: [
      { label: 'Agents', value: '7' },
      { label: 'Providers', value: '3' },
      { label: 'Access', value: 'Discord DM' },
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

        {/* Public projects */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <span className="mono" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>PUBLIC — ACCESSIBLE</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {PUBLIC_PROJECTS.map((project, i) => (
            <AnimatedCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Personal projects */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', marginTop: '56px' }}>
          <span className="mono" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>PERSONAL — INTERNAL USE</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {PERSONAL_PROJECTS.map((project, i) => (
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

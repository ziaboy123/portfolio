'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Reveal, Chevron, EASE } from '@/components/ui/motion';

const PUBLIC_PROJECTS = [
  {
    id: 'cipher',
    name: 'Cipher',
    status: 'active',
    url: 'https://daniyalzia.co.uk/cipher',
    screenshot: '/screenshots/cipher.jpg',
    accent: '#8e8e93',
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
    accent: '#0ea5e9',
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
    id: 'gambit',
    name: 'Gambit',
    status: 'active',
    url: 'https://daniyalzia.co.uk/gambit',
    screenshot: '/screenshots/gambit.jpg',
    accent: '#c4953a',
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
    id: 'deckforge',
    name: 'DeckForge',
    status: 'active',
    url: 'https://daniyalzia.co.uk/deckforge',
    screenshot: '/screenshots/deckforge.jpg',
    accent: '#d97706',
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

const ICONS = {
  screen: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M7 8h4v5H7zM14 8h3M14 11h3" />
      <path d="M12 17v3M8 20h8" />
    </svg>
  ),
  radar: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <path d="M12 12 18.5 5.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  phone: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2.5" width="12" height="19" rx="3" />
      <path d="M9 7h2.5v2.5H9zM12.5 7H15v2.5h-2.5zM9 10.5h2.5V13H9zM12.5 10.5H15V13h-2.5z" />
      <path d="M10.5 18.5h3" />
    </svg>
  ),
  chat: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
      <path d="M19 9h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v2.5L16 18h-3" />
    </svg>
  ),
  cube: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7Z" />
      <path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" />
    </svg>
  ),
  signal: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 13v8" />
      <circle cx="12" cy="11" r="2" />
      <path d="M8 7.5a5.5 5.5 0 0 0 0 7M16 7.5a5.5 5.5 0 0 1 0 7M5 4.5a9.5 9.5 0 0 0 0 13M19 4.5a9.5 9.5 0 0 1 0 13" />
    </svg>
  ),
};

const PERSONAL_PROJECTS = [
  {
    id: 'zias-panel',
    name: 'The Panel',
    status: 'personal',
    urlNote: 'PHYSICAL HARDWARE',
    icon: 'screen',
    accent: '#f59e0b',
    span: 4,
    description: 'A 7-inch touchscreen mounted on my office wall running firmware I wrote myself — live status tiles for my home server and network, PC power control, TV control, and quick glances at things like GitHub activity and sim-racing lap times. Real hardware, not a simulation.',
    stack: ['ESP32-S3', 'C++', 'LVGL', 'Wi-Fi'],
    metrics: [
      { label: 'Display', value: '7"' },
      { label: 'Tiles', value: 'Live' },
      { label: 'Build', value: 'Custom' },
    ],
  },
  {
    id: 'arc',
    name: 'Arc',
    status: 'personal',
    urlNote: 'INTERNAL USE',
    icon: 'radar',
    accent: '#e11d48',
    span: 2,
    description: 'An always-on AI that watches over my home server and speaks up in Discord the moment something needs attention — no checking, no polling, it just tells me. Tracks server and network health, keeps an eye out for anything suspicious, handles live Minecraft server admin through natural conversation, and knows when I get home. One voice, always paying attention.',
    stack: ['Python', 'Discord.py', 'MCP', 'RCON'],
    metrics: [
      { label: 'Senses', value: '5' },
      { label: 'Alerts', value: 'Real-Time' },
      { label: 'Access', value: 'Discord DM' },
    ],
  },
  {
    id: 'the-grid',
    name: 'The Grid',
    status: 'personal',
    urlNote: 'PERSONAL USE',
    icon: 'phone',
    accent: '#d97757',
    span: 2,
    description: 'A native iOS app for freeform notes and a daily dashboard — collapsible boards with checklists and rich text, a Today view pulling in the day\'s calendar and unread mail, Face ID lock, and a home screen widget. Built with SwiftUI, running on my own phone.',
    stack: ['Swift', 'SwiftUI', 'SwiftData', 'iOS'],
    metrics: [
      { label: 'Notes', value: 'Freeform' },
      { label: 'Lock', value: 'Face ID' },
      { label: 'Sync', value: 'On-Device' },
    ],
  },
  {
    id: 'the-five',
    name: 'The Five',
    status: 'personal',
    urlNote: 'INTERNAL USE',
    icon: 'chat',
    accent: '#8b5cf6',
    span: 4,
    description: 'Five AI companions living on Discord, each scoped to one part of everyday life — calendar and email, trip planning, casual chat, and food tracking, among others. No single assistant wearing every hat, each with its own name and voice. Runs around the clock on the home server, reachable anytime from Discord. Built to operate — not a public product.',
    stack: ['Python', 'FastAPI', 'Discord.py', 'Groq'],
    metrics: [
      { label: 'Agents', value: '5' },
      { label: 'Providers', value: '3' },
      { label: 'Access', value: 'Discord DM' },
    ],
  },
  {
    id: 'minecraft-server',
    name: 'Minecraft Server',
    status: 'personal',
    urlNote: 'WHITELIST ONLY',
    icon: 'cube',
    accent: '#65a30d',
    span: 2,
    description: 'A private Minecraft server built from my own singleplayer world, running around the clock for me and a handful of friends. Real accounts, a strict whitelist, automatic backups, and a proper admin setup — not a rented server, a real one I run and maintain myself on the home server.',
    stack: ['Minecraft', 'Paper', 'Java 21', 'systemd'],
    metrics: [
      { label: 'Friends', value: '5' },
      { label: 'Uptime', value: '24/7' },
      { label: 'Access', value: 'Whitelist' },
    ],
  },
  {
    id: 'beacon',
    name: 'Beacon',
    status: 'personal',
    urlNote: 'LAN ONLY',
    icon: 'signal',
    accent: '#0891b2',
    span: 2,
    description: 'A private admin dashboard for my Minecraft server — live console access, whitelist management, and a full inventory viewer that renders real armor, enchantments, and trims. Built for total visibility over my own server without putting another admin surface on the open internet.',
    stack: ['Python', 'FastAPI', 'JavaScript', 'RCON'],
    metrics: [
      { label: 'Console', value: 'Live' },
      { label: 'Inventory', value: 'Full' },
      { label: 'Access', value: 'LAN Only' },
    ],
  },
];

function Showcase({ project, index }) {
  const stageRef = useRef(null);
  const reduce = useReducedMotion();

  // The window tilts up and grows into place as it scrolls toward the centre of the viewport.
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start end', 'center center'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [0, 1]);
  const glow = useTransform(scrollYProgress, [0.3, 1], [0, 0.45]);
  const host = project.url.replace(/^https?:\/\//, '');

  return (
    <article className="showcase" id={`project-${project.id}`}>
      <div className="showcase-head">
        <Reveal>
          <div className="showcase-status"><i />Live at {host}</div>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="showcase-name text-gradient-silver">{project.name}</h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="showcase-desc">{project.description}</p>
        </Reveal>
        <Reveal delay={0.15} className="showcase-chips">
          {project.stack.map((tech) => <span key={tech} className="chip">{tech}</span>)}
        </Reveal>
      </div>

      <div className="showcase-stage" ref={stageRef}>
        <motion.div className="showcase-glow" style={{ background: project.accent, opacity: glow }} />
        <motion.a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.name}`}
          className="browser"
          style={{ rotateX, scale, opacity, display: 'block' }}
          whileHover={reduce ? undefined : { y: -6 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="browser-bar">
            <b style={{ background: '#ff5f57' }} />
            <b style={{ background: '#febc2e' }} />
            <b style={{ background: '#28c840' }} />
            <span className="browser-url">{host}</span>
          </div>
          <div className="browser-view">
            <Image
              src={project.screenshot}
              alt={`${project.name} screenshot`}
              fill
              quality={90}
              sizes="(max-width: 1080px) 100vw, 1040px"
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
              priority={index === 0}
            />
          </div>
        </motion.a>
      </div>

      <Reveal className="showcase-foot" amount={0.6}>
        {project.metrics.map(({ label, value }) => (
          <div key={label}>
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-arrow">
          Visit {project.name} <Chevron />
        </a>
      </Reveal>
    </article>
  );
}

function Tile({ project, index }) {
  const reduce = useReducedMotion();
  const wide = project.span === 4;

  const copy = (
    <>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <div className="tile-stack">
        {project.stack.map((tech) => <span key={tech} className="chip">{tech}</span>)}
      </div>
    </>
  );

  const onPointerMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      className={`tile tile-span-${project.span}`}
      style={{ '--accent': project.accent }}
      onPointerMove={onPointerMove}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE, delay: (index % 2) * 0.08 }}
    >
      <div className="tile-top">
        <span className="tile-icon">{ICONS[project.icon]}</span>
        <span className="tile-note">{project.urlNote}</span>
      </div>
      {wide ? (
        <div className="tile-wide-body">
          <div>
            {copy}
          </div>
          <div className="tile-bigstats">
            {project.metrics.map(({ label, value }) => (
              <div key={label}>
                <div className="stat-value">{value}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {copy}
          <dl className="tile-spec">
            {project.metrics.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </>
      )}
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section" style={{ paddingTop: 'clamp(64px, 8vw, 120px)' }}>
      <div className="wrap">
        <div className="section-intro">
          <Reveal><div className="eyebrow">Projects</div></Reveal>
          <Reveal delay={0.05}><h2 className="headline">The Ecosystem.</h2></Reveal>
          <Reveal delay={0.1}>
            <p className="lede">
              A collection of software products and tools — each solving a distinct problem, all part of one expanding network.
            </p>
          </Reveal>
        </div>

        <Reveal className="group-label">Public · Live on the web</Reveal>
        {PUBLIC_PROJECTS.map((project, i) => (
          <Showcase key={project.id} project={project} index={i} />
        ))}

        <div style={{ marginTop: 'clamp(120px, 16vw, 200px)' }} className="section-intro">
          <Reveal><div className="eyebrow">Personal</div></Reveal>
          <Reveal delay={0.05}><h2 className="headline">Built for home.</h2></Reveal>
          <Reveal delay={0.1}>
            <p className="lede">
              Systems that run my own life and hardware. Not public, but very real.
            </p>
          </Reveal>
        </div>

        <div className="bento">
          {PERSONAL_PROJECTS.map((project, i) => (
            <Tile key={project.id} project={project} index={i} />
          ))}
          <Reveal className="tile tile-span-2 tile-future" amount={0.4}>
            <svg width="22" height="22" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Next project in progress
          </Reveal>
        </div>
      </div>
    </section>
  );
}

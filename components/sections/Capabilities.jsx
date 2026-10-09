'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal, EASE } from '@/components/ui/motion';
import ProjectIcon from '@/components/ui/ProjectIcon';
import { CAPABILITIES } from '@/lib/capabilities';
import { PROJECTS, getProject } from '@/lib/projects';
import { languages } from '@/lib/tech';

const LANGUAGES = languages();
const STATS = [
  { value: LANGUAGES.length, label: 'Languages' },
  // Only the tech actually shown on the cards, so the number is never padded.
  { value: new Set(CAPABILITIES.flatMap((c) => c.tech)).size, label: 'Technologies' },
  { value: PROJECTS.length, label: 'Projects shipped' },
];

function Proof({ slug }) {
  if (slug === 'site') return <span className="cap-proof">This website</span>;
  const project = getProject(slug);
  if (!project) return null;
  return (
    <Link href={`/projects/${slug}`} className="cap-proof" style={{ '--accent': project.accent }} transitionTypes={['nav-forward']}>
      <i />{project.name}
    </Link>
  );
}

function Card({ cap, index }) {
  const reduce = useReducedMotion();

  const onPointerMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      className={`cap cap-span-${cap.span}`}
      style={{ '--accent': cap.accent }}
      onPointerMove={onPointerMove}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE, delay: (index % 3) * 0.08 }}
    >
      <span className="tile-icon"><ProjectIcon name={cap.icon} /></span>
      <h3>{cap.title}</h3>
      <p>{cap.line}</p>
      <div className="cap-proofs">
        <span className="cap-label">Proven in</span>
        {cap.proof.map((slug) => <Proof key={slug} slug={slug} />)}
      </div>
      <div className="cap-tech">
        {cap.tech.map((tech) => <span key={tech} className="chip">{tech}</span>)}
      </div>
    </motion.article>
  );
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-intro">
          <Reveal><div className="eyebrow">Capabilities</div></Reveal>
          <Reveal delay={0.05}>
            <h2 className="headline">
              Front end <span className="text-gradient-silver" style={{ opacity: 0.55 }}>to bare metal.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede">
              Interfaces, backends, real-time systems, AI agents, native apps, firmware,
              and the servers they run on.
            </p>
          </Reveal>
        </div>

        <Reveal className="cap-stats" delay={0.15}>
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <div className="stat-value">{value}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </Reveal>

        <div className="cap-grid">
          {CAPABILITIES.map((cap, i) => <Card key={cap.id} cap={cap} index={i} />)}
        </div>

        <Reveal className="cap-langs" y={24}>
          <span className="cap-label">Languages I write</span>
          <div className="cap-lang-list">
            {LANGUAGES.map(({ name, count }) => (
              <span key={name} className="cap-lang">
                {name}
                <small>{count} project{count > 1 ? 's' : ''}</small>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

'use client';

import { ViewTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal, Chevron, EASE } from '@/components/ui/motion';
import ProjectIcon from '@/components/ui/ProjectIcon';
import { PUBLIC_PROJECTS, PERSONAL_PROJECTS, hostOf } from '@/lib/projects';

function LineupCard({ project, index }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 48 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: EASE, delay: (index % 2) * 0.1 }}
    >
      <Link href={`/projects/${project.slug}`} className="lineup-card" style={{ '--accent': project.accent }} transitionTypes={['nav-forward']}>
        <div className="lineup-media">
          <ViewTransition name={`shot-${project.slug}`}>
            <div className="browser">
              <div className="browser-bar">
                <b style={{ background: '#ff5f57' }} />
                <b style={{ background: '#febc2e' }} />
                <b style={{ background: '#28c840' }} />
                <span className="browser-url">{hostOf(project)}</span>
              </div>
              <div className="browser-view">
                <Image
                  src={project.screenshot}
                  alt={`${project.name} screenshot`}
                  fill
                  sizes="(max-width: 900px) 100vw, 540px"
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                />
              </div>
            </div>
          </ViewTransition>
        </div>
        <div className="lineup-body">
          <ViewTransition name={`name-${project.slug}`}>
            <h3>{project.name}</h3>
          </ViewTransition>
          <p>{project.tagline}</p>
          <div className="lineup-foot">
            <span>{project.stack.slice(0, 3).join(' · ')}</span>
            <span className="link-arrow">Learn more <Chevron /></span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function MiniTile({ project, index }) {
  const reduce = useReducedMotion();

  const onPointerMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      style={{ display: 'flex' }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 36, scale: 0.97 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE, delay: (index % 3) * 0.08 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="mini"
        style={{ '--accent': project.accent, flex: 1 }}
        onPointerMove={onPointerMove}
        transitionTypes={['nav-forward']}
      >
        <div className="mini-top">
          <ViewTransition name={`icon-${project.slug}`}>
            <span className="tile-icon"><ProjectIcon name={project.icon} /></span>
          </ViewTransition>
          <span className="mini-go" aria-hidden="true"><Chevron size={14} /></span>
        </div>
        <ViewTransition name={`name-${project.slug}`}>
          <h3>{project.name}</h3>
        </ViewTransition>
        <p>{project.tagline}</p>
        <span className="tile-note" style={{ marginTop: '18px' }}>{project.note}</span>
      </Link>
    </motion.div>
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

        <Reveal className="group-label">Live on the web</Reveal>
        <div className="lineup">
          {PUBLIC_PROJECTS.map((project, i) => (
            <LineupCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <Reveal className="group-label">Built for home · Personal systems on my own hardware</Reveal>
        <div className="minis">
          {PERSONAL_PROJECTS.map((project, i) => (
            <MiniTile key={project.slug} project={project} index={i} />
          ))}
          <Reveal className="mini mini-future" amount={0.6}>
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Next project in progress
          </Reveal>
        </div>
      </div>
    </section>
  );
}

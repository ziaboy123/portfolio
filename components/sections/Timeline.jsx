'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Reveal, Chevron, EASE } from '@/components/ui/motion';
import { EVENTS, PROJECT_COLORS } from '@/lib/timeline';
import { PROJECTS } from '@/lib/projects';

const SLUG_BY_KEY = Object.fromEntries(PROJECTS.map((p) => [p.timelineKey, p.slug]));

function Tag({ event }) {
  const slug = SLUG_BY_KEY[event.project];
  const style = { '--accent': PROJECT_COLORS[event.project] || 'var(--fg-3)' };
  if (!slug) {
    return <span className="tl-tag" style={style}><i />{event.tag}</span>;
  }
  return (
    <Link href={`/projects/${slug}`} className="tl-tag" style={style} transitionTypes={['nav-forward']}>
      <i />{event.tag} <Chevron size={10} />
    </Link>
  );
}

function TimelineItem({ event }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="tl-item"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className={`tl-dot${event.type === 'milestone' ? ' is-milestone' : ''}`}>{event.seq}</div>
      <div className="tl-card">
        <Tag event={event} />
        <h3>{event.title}</h3>
        <p>{event.description}</p>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.7', 'end 0.7'] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="timeline" className="section" style={{ paddingTop: '140px' }}>
      <div className="wrap">
        <div className="section-intro">
          <Reveal><div className="eyebrow">Timeline</div></Reveal>
          <Reveal delay={0.05}><h1 className="headline">The Record.</h1></Reveal>
          <Reveal delay={0.1}>
            <p className="lede">Every project launched, system built, and milestone reached — in order.</p>
          </Reveal>
        </div>

        <div className="tl" ref={listRef}>
          <div className="tl-spine" aria-hidden="true">
            <motion.span style={{ scaleY: draw }} />
          </div>
          {EVENTS.map((event) => (
            <TimelineItem key={event.seq} event={event} />
          ))}
          <Reveal className="tl-end">
            <span />
            More to come.
          </Reveal>
        </div>
      </div>
    </section>
  );
}

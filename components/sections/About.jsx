'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Reveal, EASE } from '@/components/ui/motion';

const STATEMENT = 'Build something real. Break it. Fix it. Repeat until it makes sense.';

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
    detail: "Currently studying CS and using everything I learn to build real things. Theory and practice together — it's the only way it sticks.",
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

const ATTRIBUTES = [
  { label: 'Status', value: 'CS Student' },
  { label: 'Background', value: 'Self-taught + studying' },
  { label: 'Focus', value: 'Build and learn' },
  { label: 'Stack', value: 'Full, end to end' },
  { label: 'Approach', value: 'Ship and iterate' },
  { label: 'Domains', value: 'CS · AI · Infra' },
];

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </>
  );
}

// Each word lights up in turn as the statement scrolls through the viewport.
function ScrollStatement({ text }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] });
  const words = text.split(' ');

  if (reduce) return <p ref={ref} className="statement">{text}</p>;

  return (
    <p ref={ref} className="statement" aria-label={text}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  );
}

function Discipline({ item, open, onToggle }) {
  return (
    <div className={`disc-item${open ? ' is-open' : ''}`}>
      <button className="disc-btn" onClick={onToggle} aria-expanded={open}>
        {item.label}
        <span className="disc-plus" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="disc-detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <p>{item.detail}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function About() {
  const [open, setOpen] = useState('se');

  return (
    <section id="about" className="section">
      <div className="wrap">
        <Reveal><div className="eyebrow" style={{ marginBottom: '20px' }}>About · Still learning</div></Reveal>
        <ScrollStatement text={STATEMENT} />

        <div className="about-grid">
          <div>
            <Reveal>
              <p className="about-copy">
                I&apos;m a <strong>computer science student who learns by doing.</strong>{' '}Every project here started
                because I wanted to understand something — how auth works, how to run a server,
                how to build something people can actually use. I&apos;m figuring it out as I go,
                and building this ecosystem is how I do that.
              </p>
            </Reveal>
            <div className="attr-grid">
              {ATTRIBUTES.map(({ label, value }, i) => (
                <Reveal key={label} className="attr" delay={i * 0.05} y={20}>
                  <div className="attr-label">{label}</div>
                  <div className="attr-value">{value}</div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="disc" delay={0.1}>
            {DISCIPLINES.map((item) => (
              <Discipline
                key={item.id}
                item={item}
                open={open === item.id}
                onToggle={() => setOpen(open === item.id ? null : item.id)}
              />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

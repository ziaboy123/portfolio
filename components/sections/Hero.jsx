'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { EASE, Chevron } from '@/components/ui/motion';

const TAGLINE_WORDS = ['Systems.', 'Infrastructure.', 'Products.', 'Experiments.', 'Automation.'];
const NAME = ['Daniyal', 'Zia.'];

const STATS = [
  { label: 'Projects', value: 10, count: true },
  { label: 'Uptime', value: '24/7' },
  { label: 'Est.', value: '2026' },
  { label: 'Status', value: 'Building' },
];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % TAGLINE_WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.span layout className="hero-rotator" transition={{ layout: { duration: 0.5, ease: EASE } }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={TAGLINE_WORDS[index]}
          className="text-gradient-brand"
          style={{ display: 'inline-block' }}
          initial={{ opacity: 0, y: '0.45em' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-0.45em' }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {TAGLINE_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

function CountUp({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 1.6, ease: EASE, delay: 0.9, onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{value}</span>;
}

function Title({ reduce }) {
  let n = 0;
  return (
    <h1 className="hero-title" aria-label={NAME.join(' ')}>
      {NAME.map((word, w) => (
        <span key={word} className="hero-word" aria-hidden="true">
          {[...word].map((ch) => {
            const i = n++;
            return (
              <motion.span
                key={i}
                className="hero-letter"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: '0.4em', filter: 'blur(14px)' }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.15 + i * 0.045 }}
              >
                {ch}
              </motion.span>
            );
          })}
          {w < NAME.length - 1 && ' '}
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // Content gently recedes as you scroll past the hero.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.88]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);

  // Aurora drifts toward the pointer.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 30, damping: 18 });
  const sy = useSpring(py, { stiffness: 30, damping: 18 });
  const ax = useTransform(sx, (v) => v * 90);
  const ay = useTransform(sy, (v) => v * 60);
  const bx = useTransform(sx, (v) => v * -60);
  const by = useTransform(sy, (v) => v * -40);

  const onPointerMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const fadeIn = (delay) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: 'blur(8px)' },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section id="hero" ref={ref} className="hero" onPointerMove={onPointerMove}>
      <div className="hero-aurora" aria-hidden="true">
        <motion.div style={{ x: ax, y: ay, position: 'absolute', inset: 0 }}>
          <div className="aurora-blob aurora-a" />
        </motion.div>
        <motion.div style={{ x: bx, y: by, position: 'absolute', inset: 0 }}>
          <div className="aurora-blob aurora-b" />
          <div className="aurora-blob aurora-c" />
        </motion.div>
        <div className="hero-grid" />
        <div className="hero-fade" />
      </div>

      <motion.div className="hero-inner" style={{ scale, opacity, y }}>
        <motion.div {...fadeIn(0)}>
          <span className="hero-kicker">
            <span className="hero-kicker-dot" />
            Computer Science · Software · Infrastructure
          </span>
        </motion.div>

        <Title reduce={reduce} />

        <motion.p className="hero-sub" {...fadeIn(0.6)}>
          <motion.span layout="position" style={{ display: 'inline-block' }} transition={{ layout: { duration: 0.5, ease: EASE } }}>
            One builder.
          </motion.span>{' '}
          <RotatingWord />
        </motion.p>

        <motion.div className="hero-ctas" {...fadeIn(0.8)}>
          <a
            href="#projects"
            className="btn-pill btn-primary"
            onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            View projects
          </a>
          <a
            href="#contact"
            className="link-arrow"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            Get in touch <Chevron />
          </a>
        </motion.div>
      </motion.div>

      <motion.div style={{ opacity, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <motion.div className="hero-stats" {...fadeIn(1)}>
          {STATS.map(({ label, value, count }) => (
            <div key={label}>
              <div className="stat-value">{count ? <CountUp to={value} /> : value}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-cue"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={reduce ? { opacity: 0.7 } : { opacity: [0, 0.7, 0.7], y: [0, 0, 6] }}
        transition={reduce ? { delay: 1.6 } : { delay: 1.6, duration: 1.6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}

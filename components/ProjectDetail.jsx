'use client';

import { useRef, ViewTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Reveal, Chevron, EASE } from '@/components/ui/motion';
import ProjectIcon from '@/components/ui/ProjectIcon';
import { hostOf } from '@/lib/projects';

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </>
  );
}

// The overview lights up word by word as it scrolls through the viewport.
function Overview({ text }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');

  if (reduce) return <p ref={ref} className="pd-overview">{text}</p>;

  return (
    <p ref={ref} className="pd-overview" aria-label={text}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  );
}

function IconHero({ project }) {
  const reduce = useReducedMotion();
  return (
    <ViewTransition name={`icon-${project.slug}`}>
      <motion.div
        className="pd-icon-hero"
        initial={reduce ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
      >
        <ProjectIcon name={project.icon} size={76} />
      </motion.div>
    </ViewTransition>
  );
}

function ScreenshotHero({ project }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // The window settles back as you scroll past it, the inverse of the homepage tilt-in.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.6', 'end start'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -14]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.9]);

  return (
    <div className="pd-stage" ref={ref}>
      <motion.div style={{ rotateX, scale }}>
        <ViewTransition name={`shot-${project.slug}`}>
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="browser" style={{ display: 'block' }} aria-label={`Open ${project.name}`}>
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
                priority
                quality={90}
                sizes="(max-width: 1120px) 100vw, 1080px"
                style={{ objectFit: 'cover', objectPosition: 'top center' }}
              />
            </div>
          </a>
        </ViewTransition>
      </motion.div>
    </div>
  );
}

export default function ProjectDetail({ project, stack, milestones, prev, next }) {
  const reduce = useReducedMotion();
  const isPublic = project.kind === 'public';

  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 24, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <article style={{ '--accent': project.accent }}>
      <header className="pd-hero">
        <div className="pd-glow" aria-hidden="true" />
        <div className="wrap">
          <motion.div {...rise(0)}>
            <Link href="/#projects" className="pd-back" transitionTypes={['nav-back']}>
              <Chevron size={12} /> All projects
            </Link>
          </motion.div>
          <motion.div {...rise(0.05)}>
            <div className="pd-status">
              <i className={isPublic ? 'live' : ''} style={isPublic ? undefined : { '--dot': project.accent }} />
              {isPublic ? `Live at ${hostOf(project)}` : project.note}
            </div>
          </motion.div>
          <ViewTransition name={`name-${project.slug}`}>
            <h1 className="pd-name">{project.name}</h1>
          </ViewTransition>
          <motion.p className="pd-tagline" {...rise(0.15)}>{project.tagline}</motion.p>
          {isPublic && (
            <motion.div className="pd-ctas" {...rise(0.25)}>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-pill btn-primary">
                Open {project.name}
              </a>
              <a href="#stack" className="link-arrow">See how it&apos;s built <Chevron /></a>
            </motion.div>
          )}
        </div>
        <div className="wrap">
          {isPublic ? <ScreenshotHero project={project} /> : <IconHero project={project} />}
        </div>
      </header>

      <section className="wrap pd-section">
        <Reveal><div className="pd-label">Overview</div></Reveal>
        <Overview text={project.description} />
      </section>

      <section className="wrap pd-section">
        <div className="pd-stats">
          {project.metrics.map(({ label, value }, i) => (
            <Reveal key={label} className="pd-stat" delay={i * 0.08} y={40}>
              <div className="stat-value">{value}</div>
              <div className="stat-label">{label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap pd-section" id="stack" style={{ scrollMarginTop: '80px' }}>
        <div className="pd-stack-intro">
          <div>
            <Reveal><div className="pd-label">Built with</div></Reveal>
            <Reveal delay={0.05}><h2 className="headline">The stack.</h2></Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="lede" style={{ maxWidth: '420px' }}>
              {stack.length} technologies, designed, built and run end to end by me.
            </p>
          </Reveal>
        </div>
        <div className="pd-stack">
          {stack.map(({ tech, role }, i) => (
            <Reveal key={tech} className="pd-tech" delay={i * 0.07} y={40} amount={0.4}>
              <span className="pd-tech-num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <div className="pd-tech-name">{tech}</div>
                <div className="pd-tech-role">{role}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {milestones.length > 0 && (
        <section className="wrap pd-section">
          <Reveal><div className="pd-label">Milestones</div></Reveal>
          <Reveal delay={0.05}><h2 className="headline" style={{ marginBottom: '40px' }}>On the record.</h2></Reveal>
          <div className="pd-miles">
            {milestones.map((m, i) => (
              <Reveal key={m.seq} className="pd-mile" delay={i * 0.06} y={24}>
                <span className="pd-mile-seq">{m.seq}</span>
                <div>
                  <h3>{m.title}</h3>
                  <p>{m.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} style={{ marginTop: '28px' }}>
            <Link href="/timeline" className="link-arrow">See the full timeline <Chevron /></Link>
          </Reveal>
        </section>
      )}

      {isPublic && (
        <section className="wrap pd-section">
          <Reveal className="pd-cta-band" y={48} amount={0.3}>
            <h2 className="headline">Try {project.name}.</h2>
            <p className="lede" style={{ margin: '16px auto 32px', maxWidth: '520px' }}>
              It&apos;s live and free to use, self-hosted on my own hardware.
            </p>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-pill btn-primary">
              Open {project.name}
            </a>
          </Reveal>
        </section>
      )}

      <nav className="wrap pd-section pd-nav" aria-label="More projects">
        <Link href={`/projects/${prev.slug}`} transitionTypes={['nav-back']}>
          <small>‹ Previous</small>
          <strong>{prev.name}</strong>
        </Link>
        <Link href={`/projects/${next.slug}`} transitionTypes={['nav-forward']}>
          <small>Next ›</small>
          <strong>{next.name}</strong>
        </Link>
      </nav>
    </article>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';

const TAGLINE_WORDS = ['Systems.', 'Infrastructure.', 'Products.', 'Experiments.', 'Automation.'];

function AnimatedTagline() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = () => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % TAGLINE_WORDS.length);
        setVisible(true);
      }, 400);
    };
    const id = setInterval(cycle, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      style={{
        display: 'inline-block',
        color: 'var(--red-accent)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(6px)',
      }}
    >
      {TAGLINE_WORDS[index]}
    </span>
  );
}

function HeroBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Grid */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />

      {/* Radial vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 40%, var(--bg-base) 100%)',
        }}
      />

      {/* Red ambient glow — top center */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '700px',
          background:
            'radial-gradient(ellipse, rgba(153,27,27,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Geometric accent — large circle outline */}
      <svg
        style={{
          position: 'absolute',
          right: '-120px',
          top: '10%',
          width: '640px',
          height: '640px',
          opacity: 0.04,
        }}
        viewBox="0 0 640 640"
        fill="none"
      >
        <circle cx="320" cy="320" r="318" stroke="white" strokeWidth="1" />
        <circle cx="320" cy="320" r="240" stroke="white" strokeWidth="0.5" />
        <circle cx="320" cy="320" r="160" stroke="white" strokeWidth="0.5" />
        <line x1="2" y1="320" x2="638" y2="320" stroke="white" strokeWidth="0.5" />
        <line x1="320" y1="2" x2="320" y2="638" stroke="white" strokeWidth="0.5" />
        <line x1="96" y1="96" x2="544" y2="544" stroke="white" strokeWidth="0.3" />
        <line x1="544" y1="96" x2="96" y2="544" stroke="white" strokeWidth="0.3" />
      </svg>

      {/* Small geometric accent — left */}
      <svg
        style={{
          position: 'absolute',
          left: '-60px',
          bottom: '15%',
          width: '280px',
          height: '280px',
          opacity: 0.05,
        }}
        viewBox="0 0 280 280"
        fill="none"
      >
        <rect x="1" y="1" width="278" height="278" stroke="white" strokeWidth="0.8" />
        <rect x="40" y="40" width="200" height="200" stroke="white" strokeWidth="0.4" />
        <rect x="80" y="80" width="120" height="120" stroke="white" strokeWidth="0.4" />
        <line x1="0" y1="0" x2="280" y2="280" stroke="white" strokeWidth="0.3" />
        <line x1="280" y1="0" x2="0" y2="280" stroke="white" strokeWidth="0.3" />
      </svg>

      {/* Scan line */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(185,28,28,0.15) 30%, rgba(185,28,28,0.15) 70%, transparent)',
          animation: 'scanUp 8s ease-in-out infinite',
          animationDelay: '2s',
        }}
      />

      {/* Corner brackets */}
      {[
        { top: '60px', left: '24px' },
        { top: '60px', right: '24px' },
        { bottom: '24px', left: '24px' },
        { bottom: '24px', right: '24px' },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '20px',
            height: '20px',
            ...pos,
            opacity: 0.2,
          }}
        >
          <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
            {i === 0 && <><path d="M0 20 L0 0 L20 0" stroke="#dc2626" strokeWidth="1.5" /></>}
            {i === 1 && <><path d="M20 20 L20 0 L0 0" stroke="#dc2626" strokeWidth="1.5" /></>}
            {i === 2 && <><path d="M0 0 L0 20 L20 20" stroke="#dc2626" strokeWidth="1.5" /></>}
            {i === 3 && <><path d="M20 0 L20 20 L0 20" stroke="#dc2626" strokeWidth="1.5" /></>}
          </svg>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '120px 24px 80px',
      }}
    >
      <HeroBackground />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '860px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* System label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '40px',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span
            style={{
              display: 'block',
              width: '24px',
              height: '1px',
              background: 'var(--red-bright)',
            }}
          />
          <span
            className="mono"
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: 'var(--red-accent)',
              textTransform: 'uppercase',
            }}
          >
            daniyalzia.co.uk — Active
          </span>
        </div>

        {/* Main heading */}
        <h1
          style={{
            fontSize: 'clamp(64px, 12vw, 128px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            color: 'var(--text-primary)',
            marginBottom: '32px',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
          }}
        >
          DANIYAL ZIA
        </h1>

        {/* Tagline */}
        <div
          style={{
            fontSize: 'clamp(20px, 3vw, 28px)',
            fontWeight: 400,
            color: 'var(--text-secondary)',
            lineHeight: 1.4,
            marginBottom: '20px',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
          }}
        >
          One builder.{' '}
          <AnimatedTagline />
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: 'clamp(15px, 1.8vw, 17px)',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            maxWidth: '520px',
            marginBottom: '52px',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
          }}
        >
          Central command for a growing ecosystem of software products, automated systems,
          and self-hosted infrastructure. Built and operated by one.
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: 'flex',
            gap: '14px',
            flexWrap: 'wrap',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
          }}
        >
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
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
              transition: 'background 0.2s ease, border-color 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--red-bright)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--red-core)'; }}
          >
            VIEW PROJECTS
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#infrastructure"
            onClick={(e) => { e.preventDefault(); document.getElementById('infrastructure')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              background: 'transparent',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.06em',
              border: '1px solid var(--border)',
              transition: 'border-color 0.2s ease, color 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--text-muted)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            INFRASTRUCTURE
          </a>
        </div>

        {/* Metrics strip */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            marginTop: '80px',
            paddingTop: '40px',
            borderTop: '1px solid var(--border-subtle)',
            flexWrap: 'wrap',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.8s ease 0.6s',
          }}
        >
          {[
            { label: 'Projects', value: '3' },
            { label: 'Systems Online', value: '4' },
            { label: 'Est.', value: '2026' },
            { label: 'Status', value: 'Building' },
          ].map(({ label, value }) => (
            <div key={label}>
              <div
                className="mono stat-number"
                style={{
                  fontSize: 'clamp(20px, 3vw, 26px)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                {value}
              </div>
              <div
                className="mono"
                style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.1em',
                  marginTop: '4px',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          opacity: mounted ? 0.4 : 0,
          transition: 'opacity 1s ease 1s',
        }}
      >
        <div
          className="mono"
          style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--text-muted)' }}
        >
          SCROLL
        </div>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--border), transparent)',
          }}
        />
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import StatusBadge from './StatusBadge';

export default function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: isEven ? '1fr 440px' : '440px 1fr',
        gap: '0',
        border: '1px solid',
        borderColor: hovered ? 'var(--border)' : 'var(--border-subtle)',
        background: 'var(--bg-surface)',
        transition: 'border-color 0.25s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="project-card"
    >
      {/* Red left accent bar */}
      <div
        style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: '2px',
          background: 'var(--red-bright)',
          opacity: hovered ? 1 : 0.3,
          transition: 'opacity 0.25s ease',
          zIndex: 2,
        }}
      />

      {/* Content panel */}
      <div
        style={{
          padding: '48px 48px 48px 56px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          order: isEven ? 0 : 1,
          minHeight: '360px',
        }}
      >
        <div>
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: '8px' }}>
                PROJECT {String(index + 1).padStart(2, '0')}
              </div>
              <h3 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                {project.name}
              </h3>
            </div>
            <StatusBadge status={project.status} />
          </div>

          {/* Description */}
          <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '28px', maxWidth: '400px' }}>
            {project.description}
          </p>

          {/* Stack */}
          <div style={{ marginBottom: '28px' }}>
            <div className="mono" style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--text-faint)', marginBottom: '10px' }}>STACK</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.stack.map((tech) => (
                <span key={tech} className="mono" style={{ padding: '3px 10px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          {project.metrics && (
            <div style={{ display: 'flex', gap: '28px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap' }}>
              {project.metrics.map(({ label, value }) => (
                <div key={label}>
                  <div className="mono stat-number" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{value}</div>
                  <div className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', marginTop: '2px' }}>{label.toUpperCase()}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '8px 18px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '12px', letterSpacing: '0.06em', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red-bright)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              VISIT PROJECT
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H5M11 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </a>
          ) : (
            <>
              <button disabled style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '8px 18px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '12px', letterSpacing: '0.06em', cursor: 'not-allowed', opacity: 0.5, fontFamily: 'inherit' }}>
                VISIT PROJECT
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H5M11 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </button>
              <span className="mono" style={{ fontSize: '11px', color: 'var(--text-faint)', letterSpacing: '0.08em' }}>LINK PENDING</span>
            </>
          )}
        </div>
      </div>

      {/* Visual panel */}
      <div
        className="project-visual"
        style={{
          order: isEven ? 1 : 0,
          position: 'relative',
          overflow: 'hidden',
          borderLeft: isEven ? '1px solid var(--border-subtle)' : 'none',
          borderRight: !isEven ? '1px solid var(--border-subtle)' : 'none',
          minHeight: '340px',
          background: 'var(--bg-elevated)',
        }}
      >
        {project.screenshot ? (
          <>
            <div style={{ position: 'absolute', inset: 0 }}>
              <Image
                src={project.screenshot}
                alt={`${project.name} screenshot`}
                fill
                quality={95}
                style={{ objectFit: 'cover', objectPosition: 'top center', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.03)' : 'scale(1)' }}
                sizes="(max-width: 900px) 100vw, 440px"
                priority={index === 0}
              />
            </div>
            {/* Overlay gradient */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(10,10,12,0.7) 100%)', pointerEvents: 'none' }} />
            {/* Bottom label */}
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
              <div className="mono" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', padding: '6px 10px', background: 'rgba(10,10,12,0.6)', border: '1px solid rgba(255,255,255,0.06)', display: 'inline-block' }}>
                ↳ {project.name.toUpperCase()} — PREVIEW
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid-bg-dense" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
            <div style={{ position: 'absolute', inset: '24px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'rgba(10,10,12,0.5)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '28px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 10px', gap: '6px' }}>
                {['var(--red-dim)', 'var(--text-faint)', 'var(--text-faint)'].map((c, i) => (
                  <span key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: c }} />
                ))}
              </div>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ opacity: 0.15 }}>
                <rect x="1" y="1" width="38" height="38" stroke="white" strokeWidth="1" />
                <path d="M1 15h38M1 25h38M15 1v38M25 1v38" stroke="white" strokeWidth="0.5" />
              </svg>
              <span className="mono" style={{ fontSize: '11px', color: 'var(--text-faint)', letterSpacing: '0.12em' }}>SCREENSHOT PLACEHOLDER</span>
            </div>
          </>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .project-card { display: flex !important; flex-direction: column !important; }
          .project-card > div:first-of-type { order: 0 !important; min-height: auto !important; }
          .project-card .project-visual { display: none !important; }
        }
      `}</style>
    </article>
  );
}

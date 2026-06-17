'use client';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
        padding: '32px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              border: '1px solid var(--red-dim)',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <span style={{ position: 'absolute', inset: '3px', background: 'var(--red-dim)', opacity: 0.5 }} />
          </span>
          <span
            className="mono"
            style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.15em' }}
          >
            NEXUS
          </span>
          <span style={{ color: 'var(--text-faint)', fontSize: '12px' }}>·</span>
          <span
            className="mono"
            style={{ fontSize: '11px', color: 'var(--text-faint)', letterSpacing: '0.06em' }}
          >
            © {year} Daniyal Zia
          </span>
        </div>

        <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
          {['Projects', 'Infrastructure', 'About', 'Contact'].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(label.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                fontSize: '12px',
                color: 'var(--text-faint)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-faint)'; }}
            >
              {label}
            </a>
          ))}
        </div>

        <div
          className="mono"
          style={{
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: 'var(--text-faint)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: 'var(--red-dim)',
              display: 'inline-block',
            }}
          />
          SYSTEM ONLINE
        </div>
      </div>
    </footer>
  );
}

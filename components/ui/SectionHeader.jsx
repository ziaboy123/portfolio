export default function SectionHeader({ eyebrow, title, description, align = 'left' }) {
  return (
    <div style={{ textAlign: align, marginBottom: '64px' }}>
      {eyebrow && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            justifyContent: align === 'center' ? 'center' : 'flex-start',
          }}
        >
          <span
            style={{
              display: 'block',
              width: '20px',
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
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        style={{
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          lineHeight: 1.05,
          marginBottom: description ? '20px' : 0,
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          style={{
            fontSize: '16px',
            color: 'var(--text-muted)',
            lineHeight: 1.65,
            maxWidth: '520px',
            marginLeft: align === 'center' ? 'auto' : 0,
            marginRight: align === 'center' ? 'auto' : 0,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

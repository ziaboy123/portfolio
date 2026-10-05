export default function SectionHeader({ eyebrow, title, description, align = 'left' }) {
  const center = align === 'center';
  return (
    <div style={{ textAlign: align, marginBottom: '64px', maxWidth: center ? '820px' : 'none', marginInline: center ? 'auto' : 0 }}>
      {eyebrow && <div className="eyebrow" style={{ marginBottom: '14px' }}>{eyebrow}</div>}
      <h2 className="headline">{title}</h2>
      {description && (
        <p className="lede" style={{ marginTop: '20px', maxWidth: '640px', marginInline: center ? 'auto' : 0 }}>
          {description}
        </p>
      )}
    </div>
  );
}

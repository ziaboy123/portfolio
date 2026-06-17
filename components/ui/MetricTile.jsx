'use client';

import { useState } from 'react';

export default function MetricTile({ label, value, unit, subtext, icon, status = 'nominal' }) {
  const [hovered, setHovered] = useState(false);

  const statusColors = {
    nominal: 'var(--text-muted)',
    online:  '#22c55e',
    good:    '#22c55e',
    warning: '#f59e0b',
    critical: '#dc2626',
    offline: '#4b5563',
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '24px',
        background: 'var(--bg-elevated)',
        border: '1px solid',
        borderColor: hovered ? 'var(--border)' : 'var(--border-subtle)',
        transition: 'border-color 0.2s ease, background 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: hovered
            ? `linear-gradient(90deg, ${statusColors[status]}, transparent)`
            : 'transparent',
          transition: 'background 0.3s ease',
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <span
          className="mono"
          style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--text-muted)' }}
        >
          {label.toUpperCase()}
        </span>
        {icon && (
          <span style={{ color: 'var(--text-faint)', fontSize: '14px' }}>{icon}</span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <span
          className="mono stat-number"
          style={{
            fontSize: 'clamp(24px, 3vw, 32px)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          {value}
        </span>
        {unit && (
          <span
            className="mono"
            style={{ fontSize: '12px', color: 'var(--text-muted)' }}
          >
            {unit}
          </span>
        )}
      </div>

      {subtext && (
        <div
          className="mono"
          style={{
            fontSize: '11px',
            color: statusColors[status],
            marginTop: '8px',
            letterSpacing: '0.06em',
          }}
        >
          {subtext}
        </div>
      )}
    </div>
  );
}

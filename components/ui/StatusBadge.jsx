const STATUS_CONFIG = {
  active:       { label: 'Active',       color: '#22c55e', bg: 'rgba(34,197,94,0.1)',  pulse: true },
  beta:         { label: 'Beta',         color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', pulse: false },
  development:  { label: 'In Dev',       color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', pulse: true },
  planned:      { label: 'Planned',      color: '#6b7280', bg: 'rgba(107,114,128,0.1)',pulse: false },
  archived:     { label: 'Archived',     color: '#4b5563', bg: 'rgba(75,85,99,0.1)',   pulse: false },
};

export default function StatusBadge({ status = 'planned' }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.planned;

  return (
    <div
      className="mono"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        background: cfg.bg,
        border: `1px solid ${cfg.color}30`,
        fontSize: '10px',
        letterSpacing: '0.1em',
        color: cfg.color,
      }}
    >
      <span
        style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          background: cfg.color,
          display: 'inline-block',
          animation: cfg.pulse ? 'pulseRed 2.5s ease-in-out infinite' : 'none',
          boxShadow: cfg.pulse ? `0 0 0 0 ${cfg.color}80` : 'none',
        }}
      />
      {cfg.label.toUpperCase()}
      <style>{`
        @keyframes pulseRed {
          0%,100% { box-shadow: 0 0 0 0 ${cfg.color}60; }
          50%      { box-shadow: 0 0 0 4px ${cfg.color}00; }
        }
      `}</style>
    </div>
  );
}

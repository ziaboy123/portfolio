'use client';

import { useEffect, useRef, useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import MetricTile from '@/components/ui/MetricTile';

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function ServiceRow({ name, type, status, uptime, latency, delay = 0 }) {
  const [ref, visible] = useReveal(0.05);
  const colors = { online: '#22c55e', degraded: '#f59e0b', offline: '#6b7280', maintenance: '#3b82f6' };
  const color = colors[status] || '#6b7280';

  return (
    <div
      ref={ref}
      className="svc-row-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 100px 80px 80px 80px',
        gap: '16px',
        alignItems: 'center',
        padding: '14px 20px',
        borderBottom: '1px solid var(--border-subtle)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-12px)',
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: color,
            display: 'inline-block',
            flexShrink: 0,
            animation: status === 'online' ? 'svcPulse 2.5s ease-in-out infinite' : 'none',
          }}
        />
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>{name}</span>
      </div>
      <span className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>{type}</span>
      <span className="mono" style={{ fontSize: '11px', color, letterSpacing: '0.05em' }}>{status.toUpperCase()}</span>
      <span className="mono" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{uptime}</span>
      <span className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{latency}</span>
      <style>{`@keyframes svcPulse { 0%,100%{box-shadow:0 0 0 0 ${color}60} 50%{box-shadow:0 0 0 4px ${color}00} }`}</style>
    </div>
  );
}

function ResourceBar({ label, used, total, unit, pct, color = 'var(--red-bright)' }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div ref={ref} style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
        <span className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
          {label.toUpperCase()}
        </span>
        <span className="mono" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
          {used}{unit} / {total}{unit}
        </span>
      </div>
      <div style={{ height: '4px', background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            left: 0, top: 0, bottom: 0,
            width: visible ? `${pct}%` : '0%',
            background: color,
            transition: 'width 1.2s cubic-bezier(0.22,1,0.36,1) 0.2s',
          }}
        />
      </div>
      <div className="mono" style={{ fontSize: '10px', color: 'var(--text-faint)', marginTop: '4px', letterSpacing: '0.06em' }}>
        {pct}% UTILIZED
      </div>
    </div>
  );
}

function HardwareCard({ name, role, specs, delay = 0 }) {
  const [ref, visible] = useReveal(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '28px',
        background: 'var(--bg-elevated)',
        border: '1px solid',
        borderColor: hovered ? 'var(--border)' : 'var(--border-subtle)',
        position: 'relative',
        transition: 'border-color 0.2s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition2: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
      className="hw-card"
    >
      <style>{`.hw-card{transition:border-color 0.2s ease, opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s !important;}`}</style>
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, bottom: 0,
          width: '2px',
          background: 'var(--red-core)',
          opacity: hovered ? 0.7 : 0.2,
          transition: 'opacity 0.2s ease',
        }}
      />
      <div style={{ paddingLeft: '12px' }}>
        <div className="mono" style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '8px' }}>
          {role.toUpperCase()}
        </div>
        <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>{name}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {specs.map(({ k, v }) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>{k}</span>
              <span className="mono" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SERVICES = [
  { name: 'Portfolio',         type: 'Web App',   status: 'online',  uptime: '—', latency: '—ms' },
  { name: 'DeckForge',         type: 'Web App',   status: 'online',  uptime: '—', latency: '—ms' },
  { name: 'WatchMatch',        type: 'Web App',   status: 'online',  uptime: '—', latency: '—ms' },
  { name: 'Cipher',            type: 'Chat',      status: 'online',  uptime: '—', latency: '—ms' },
  { name: 'PostgreSQL',        type: 'Database',  status: 'online',  uptime: '—', latency: '—ms' },
  { name: 'Cloudflare Tunnel', type: 'Network',   status: 'online',  uptime: '—', latency: '—ms' },
];

const HARDWARE = [
  {
    name: 'apps (LXC)',
    role: 'App Server — pve1',
    specs: [
      { k: 'CPU', v: '2 vCPU' },
      { k: 'RAM', v: '4 GB' },
      { k: 'Disk', v: '40 GB' },
      { k: 'OS', v: 'Ubuntu 22.04' },
    ],
  },
  {
    name: 'Proxmox Cluster',
    role: 'Hypervisor',
    specs: [
      { k: 'Nodes', v: '3' },
      { k: 'Version', v: 'PVE 9.1' },
      { k: 'Active', v: 'pve1, pve2' },
      { k: 'Network', v: 'Unifi' },
    ],
  },
  {
    name: 'Cloudflare',
    role: 'Edge / DNS',
    specs: [
      { k: 'Domain', v: 'daniyalzia.co.uk' },
      { k: 'Tunnel', v: 'Active' },
      { k: 'Proxy', v: 'Enabled' },
      { k: 'Port Forward', v: 'None' },
    ],
  },
];

export default function Infrastructure() {
  const [headerRef, headerVisible] = useReveal(0.2);

  return (
    <section
      id="infrastructure"
      style={{
        padding: 'clamp(80px,10vw,120px) 0',
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        <div
          ref={headerRef}
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '64px' }}>
            <SectionHeader
              eyebrow="Infrastructure"
              title="The Stack"
              description="Self-hosted on a Proxmox homelab cluster, routed through Cloudflare Tunnel. Services are live — uptime and metrics monitoring coming soon."
            />
            <div
              className="mono"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                border: '1px solid var(--border)',
                background: 'var(--bg-base)',
                fontSize: '11px',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                alignSelf: 'flex-start',
                marginTop: '48px',
              }}
            >
              <span
                style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: 'var(--text-faint)', display: 'inline-block',
                }}
              />
              LIVE MONITORING — COMING SOON
            </div>
          </div>
        </div>

        {/* Top metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2px',
            marginBottom: '40px',
          }}
        >
          <MetricTile label="Nodes" value="1" subtext="APP CONTAINER" status="online" />
          <MetricTile label="Services" value="6" subtext="ALL RUNNING" status="online" />
          <MetricTile label="Uptime %" value="—" subtext="MONITORING SOON" status="offline" />
          <MetricTile label="Network In" value="—" unit="Mbps" subtext="MONITORING SOON" status="offline" />
          <MetricTile label="Network Out" value="—" unit="Mbps" subtext="MONITORING SOON" status="offline" />
          <MetricTile label="Alerts" value="0" subtext="ALL CLEAR" status="online" />
        </div>

        {/* Main grid: services + resources */}
        <div
          className="infra-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 320px',
            gap: '2px',
            marginBottom: '2px',
          }}
        >
          {/* Services panel */}
          <div
            style={{
              background: 'var(--bg-base)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span className="mono" style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'var(--text-muted)' }}>
                SERVICE STATUS
              </span>
              <div className="svc-row-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 100px 80px 80px 80px', gap: '16px', flex: 1, paddingLeft: '32px' }}>
                {['SERVICE', 'TYPE', 'STATUS', 'UPTIME', 'LATENCY'].map((h) => (
                  <span key={h} className="mono" style={{ fontSize: '10px', color: 'var(--text-faint)', letterSpacing: '0.1em' }}>{h}</span>
                ))}
              </div>
            </div>
            {SERVICES.map((svc, i) => (
              <ServiceRow
                key={svc.name}
                name={svc.name}
                type={svc.type}
                status={svc.status}
                uptime="—"
                latency="—"
                delay={i * 0.06}
              />
            ))}
            <div
              className="mono"
              style={{
                padding: '12px 20px',
                fontSize: '10px',
                color: 'var(--text-faint)',
                letterSpacing: '0.1em',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              ↳ UPTIME & LATENCY MONITORING — COMING SOON
            </div>
          </div>

          {/* Resources panel */}
          <div
            style={{
              background: 'var(--bg-base)',
              border: '1px solid var(--border-subtle)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              className="mono"
              style={{
                fontSize: '11px', letterSpacing: '0.15em',
                color: 'var(--text-muted)', marginBottom: '24px',
                display: 'block',
              }}
            >
              RESOURCE USAGE
            </span>
            <ResourceBar label="CPU" used="—" total="—" unit="%" pct={0} />
            <ResourceBar label="Memory" used="—" total="—" unit="GB" pct={0} color="#3b82f6" />
            <ResourceBar label="Disk" used="—" total="—" unit="TB" pct={0} color="#8b5cf6" />
            <ResourceBar label="Network" used="—" total="—" unit="Gbps" pct={0} color="#22c55e" />
            <div
              className="mono"
              style={{
                marginTop: 'auto',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)',
                fontSize: '10px',
                color: 'var(--text-faint)',
                letterSpacing: '0.1em',
              }}
            >
              LAST UPDATED: — / SOURCE: OFFLINE
            </div>
          </div>
        </div>

        {/* Hardware row */}
        <div
          className="hw-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2px',
          }}
        >
          {HARDWARE.map((hw, i) => (
            <HardwareCard key={hw.name} {...hw} delay={i * 0.1} />
          ))}
        </div>

        {/* Network overview placeholder */}
        <div
          style={{
            marginTop: '2px',
            padding: '28px',
            background: 'var(--bg-base)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div>
            <div className="mono" style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '6px' }}>
              NETWORK OVERVIEW
            </div>
            <div className="mono" style={{ fontSize: '11px', color: 'var(--text-faint)' }}>
              Topology map, VLAN configuration, and traffic analytics — API integration pending
            </div>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['LAN', 'WAN', 'VPN', 'DMZ'].map((label) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div className="mono" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-faint)' }}>—</div>
                <div className="mono" style={{ fontSize: '10px', color: 'var(--text-faint)', letterSpacing: '0.1em', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .infra-grid { grid-template-columns: 1fr !important; }
          .hw-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .svc-row-grid { grid-template-columns: 1fr auto !important; }
          .svc-row-grid > *:nth-child(2),
          .svc-row-grid > *:nth-child(4),
          .svc-row-grid > *:nth-child(5) { display: none !important; }
        }
      `}</style>
    </section>
  );
}

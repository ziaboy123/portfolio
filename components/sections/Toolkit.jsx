'use client';

import { Reveal } from '@/components/ui/motion';
import { buildToolkit } from '@/lib/tech';
import { PROJECTS } from '@/lib/projects';

const GROUPS = buildToolkit();
const TECH_COUNT = GROUPS.reduce((n, g) => n + g.items.length, 0);
const LANGUAGE_COUNT = GROUPS.find((g) => g.id === 'languages').items.length;

export default function Toolkit() {
  return (
    <section id="toolkit" className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-intro">
          <Reveal><div className="eyebrow">Toolkit</div></Reveal>
          <Reveal delay={0.05}>
            <h2 className="headline">
              {LANGUAGE_COUNT} languages.{' '}
              <span className="text-gradient-silver" style={{ opacity: 0.55 }}>{TECH_COUNT} technologies.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede">
              Everything used to build the {PROJECTS.length} projects above, from embedded C++ on a microcontroller to native Swift on iOS.
            </p>
          </Reveal>
        </div>

        <div className="toolkit-grid">
          {GROUPS.map((group, gi) => (
            <Reveal key={group.id} className="tk-group" delay={(gi % 2) * 0.08} y={40} amount={0.25}>
              <div className="tk-head">
                <h3>{group.label}</h3>
                <span>{group.items.length}</span>
              </div>
              <div className="tk-list">
                {group.items.map(({ tech, role, projects }) => (
                  <span key={tech} className="tk-item" tabIndex={0}>
                    {tech}
                    {projects.length > 1 && <small>×{projects.length}</small>}
                    <span className="tk-tip" role="tooltip">
                      {role} · {projects.map((p) => p.name).join(', ')}
                    </span>
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

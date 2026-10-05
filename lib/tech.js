import { PROJECTS } from './projects';

// What each piece of the stack does, and which toolkit group it belongs to.
export const TECH = {
  'Python':        { role: 'Language', group: 'languages' },
  'TypeScript':    { role: 'Language', group: 'languages' },
  'JavaScript':    { role: 'Language', group: 'languages' },
  'C++':           { role: 'Language', group: 'languages' },
  'Swift':         { role: 'Language', group: 'languages' },
  'Java 21':       { role: 'Language', group: 'languages' },

  'Next.js':       { role: 'Web framework', group: 'frameworks' },
  'Flask':         { role: 'Web framework', group: 'frameworks' },
  'FastAPI':       { role: 'API framework', group: 'frameworks' },
  'SwiftUI':       { role: 'UI framework', group: 'frameworks' },
  'Tailwind CSS':  { role: 'Styling', group: 'frameworks' },
  'Framer Motion': { role: 'Animation', group: 'frameworks' },
  'Three.js':      { role: '3D graphics', group: 'frameworks' },
  'LVGL':          { role: 'Embedded UI', group: 'frameworks' },
  'Discord.py':    { role: 'Bot framework', group: 'frameworks' },

  'SocketIO':      { role: 'Realtime', group: 'data' },
  'Socket.io':     { role: 'Realtime', group: 'data' },
  'Eventlet':      { role: 'Concurrency', group: 'data' },
  'PostgreSQL':    { role: 'Database', group: 'data' },
  'SwiftData':     { role: 'Persistence', group: 'data' },
  'Stockfish':     { role: 'Chess engine', group: 'data' },
  'Groq':          { role: 'LLM inference', group: 'data' },
  'MCP':           { role: 'AI tooling', group: 'data' },

  'Node.js':       { role: 'Runtime', group: 'platforms' },
  'iOS':           { role: 'Platform', group: 'platforms' },
  'ESP32-S3':      { role: 'Microcontroller', group: 'platforms' },
  'Wi-Fi':         { role: 'Connectivity', group: 'platforms' },
  'RCON':          { role: 'Remote admin', group: 'platforms' },
  'Minecraft':     { role: 'Game server', group: 'platforms' },
  'Paper':         { role: 'Server software', group: 'platforms' },
  'systemd':       { role: 'Service manager', group: 'platforms' },
};

export const TOOLKIT_GROUPS = [
  { id: 'languages', label: 'Languages' },
  { id: 'frameworks', label: 'Frameworks & libraries' },
  { id: 'data', label: 'Realtime, data & AI' },
  { id: 'platforms', label: 'Platforms & hardware' },
];

export function roleOf(tech) {
  return TECH[tech]?.role ?? 'Tooling';
}

// Socket.io and SocketIO are the same thing spelled two ways across projects.
const canonical = (tech) => (tech === 'SocketIO' ? 'Socket.io' : tech);

// Every technology across all projects, grouped, with the projects that use it.
export function buildToolkit() {
  const byTech = new Map();
  for (const project of PROJECTS) {
    for (const raw of project.stack) {
      const tech = canonical(raw);
      if (!byTech.has(tech)) byTech.set(tech, []);
      byTech.get(tech).push({ slug: project.slug, name: project.name });
    }
  }
  return TOOLKIT_GROUPS.map((group) => ({
    ...group,
    items: [...byTech.entries()]
      .filter(([tech]) => (TECH[tech]?.group ?? 'platforms') === group.id)
      .map(([tech, projects]) => ({ tech, role: roleOf(tech), projects }))
      .sort((a, b) => b.projects.length - a.projects.length || a.tech.localeCompare(b.tech)),
  }));
}

import { PROJECTS } from './projects';

// What each piece of the stack does, and which group it belongs to (languages are counted on the homepage).
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
  'Web Crypto':    { role: 'Encryption', group: 'data' },
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

export function roleOf(tech) {
  return TECH[tech]?.role ?? 'Tooling';
}

// Languages written across all projects, most-used first, with project counts.
export function languages() {
  const counts = new Map();
  for (const project of PROJECTS) {
    for (const tech of project.stack) {
      if (TECH[tech]?.group === 'languages') counts.set(tech, (counts.get(tech) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tech, count]) => ({ name: tech.replace(/ \d+$/, ''), count }));
}

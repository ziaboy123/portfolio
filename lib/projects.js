// Single source of truth for every project: the homepage lineup and the
// /projects/[slug] detail pages both render from this list.

export const PROJECTS = [
  {
    slug: 'cipher',
    name: 'Cipher',
    kind: 'public',
    url: 'https://daniyalzia.co.uk/cipher',
    screenshot: '/screenshots/cipher.jpg',
    accent: '#a1a1aa',
    icon: 'lock',
    timelineKey: 'Cipher',
    tagline: 'Chat that leaves no trace.',
    description:
      'Ephemeral, zero-persistence chat platform. Create a room, share the code, talk — then it\'s gone. No accounts, no message history, no traces. Private by design.',
    stack: ['Python', 'Flask', 'SocketIO', 'Eventlet'],
    metrics: [
      { label: 'Stored Messages', value: '0' },
      { label: 'Accounts Needed', value: 'None' },
      { label: 'Persistence', value: 'None' },
    ],
  },
  {
    slug: 'watchmatch',
    name: 'WatchMatch',
    kind: 'public',
    url: 'https://daniyalzia.co.uk/watchmatch',
    screenshot: '/screenshots/watchmatch.jpg',
    accent: '#0ea5e9',
    icon: 'watch',
    timelineKey: 'WatchMatch',
    tagline: 'Find the watch that actually fits you.',
    description:
      'Personalised watch recommendation engine. Answer a short quiz covering wrist size, style, lifestyle, and budget — get matched to the right watch from a curated database of 100+ timepieces across all price points.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    metrics: [
      { label: 'Watches', value: '100+' },
      { label: 'Time to Match', value: '<3 min' },
      { label: 'Sign-up', value: 'None' },
    ],
  },
  {
    slug: 'gambit',
    name: 'Gambit',
    kind: 'public',
    url: 'https://daniyalzia.co.uk/gambit',
    screenshot: '/screenshots/gambit.jpg',
    accent: '#c4953a',
    icon: 'crown',
    timelineKey: 'Gambit',
    tagline: 'Medieval chess, in three dimensions.',
    description:
      'Full 3D medieval chess with animated piece combat. A cinematic camera cuts to every capture, three AI tiers cover all skill levels, and private rooms let you challenge a friend with a six-character code. Ranked games are tracked and replayable — no account needed to play.',
    stack: ['Three.js', 'Node.js', 'Socket.io', 'Stockfish'],
    metrics: [
      { label: 'AI Tiers', value: '3' },
      { label: 'Board', value: '3D' },
      { label: 'Cost', value: 'Free' },
    ],
  },
  {
    slug: 'deckforge',
    name: 'DeckForge',
    kind: 'public',
    url: 'https://daniyalzia.co.uk/deckforge',
    screenshot: '/screenshots/deckforge.jpg',
    accent: '#eab308',
    icon: 'cards',
    timelineKey: 'DeckForge',
    tagline: 'Build smarter. Test faster.',
    description:
      'Professional-grade deck building and testing platform for competitive Yu-Gi-Oh! players. Search 13,000+ cards, build and manage decks, simulate opening hands, and analyse consistency — all in one place.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    metrics: [
      { label: 'Cards', value: '13,000+' },
      { label: 'Hand Speed', value: '<50ms' },
      { label: 'Cost', value: 'Free' },
    ],
  },
  {
    slug: 'the-panel',
    name: 'The Panel',
    kind: 'personal',
    note: 'Physical hardware',
    accent: '#f59e0b',
    icon: 'screen',
    timelineKey: 'ZiasPanel',
    tagline: 'A touchscreen on my office wall, running my own firmware.',
    description: 'A 7-inch touchscreen mounted on my office wall running firmware I wrote myself — live status tiles for my home server and network, PC power control, TV control, and quick glances at things like GitHub activity and sim-racing lap times. Real hardware, not a simulation.',
    stack: ['ESP32-S3', 'C++', 'LVGL', 'Wi-Fi'],
    metrics: [
      { label: 'Display', value: '7"' },
      { label: 'Tiles', value: 'Live' },
      { label: 'Build', value: 'Custom' },
    ],
  },
  {
    slug: 'arc',
    name: 'Arc',
    kind: 'personal',
    note: 'Internal use',
    accent: '#e11d48',
    icon: 'radar',
    timelineKey: 'Arc',
    tagline: 'An always-on AI that watches over my home server.',
    description: 'An always-on AI that watches over my home server and speaks up in Discord the moment something needs attention — no checking, no polling, it just tells me. Tracks server and network health, keeps an eye out for anything suspicious, handles live Minecraft server admin through natural conversation, and knows when I get home. One voice, always paying attention.',
    stack: ['Python', 'Discord.py', 'MCP', 'RCON'],
    metrics: [
      { label: 'Senses', value: '5' },
      { label: 'Alerts', value: 'Real-Time' },
      { label: 'Access', value: 'Discord DM' },
    ],
  },
  {
    slug: 'the-grid',
    name: 'The Grid',
    kind: 'personal',
    note: 'Personal use',
    accent: '#d97757',
    icon: 'phone',
    timelineKey: 'TheGrid',
    tagline: 'Notes and a daily dashboard, native on iOS.',
    description: 'A native iOS app for freeform notes and a daily dashboard — collapsible boards with checklists and rich text, a Today view pulling in the day\'s calendar and unread mail, Face ID lock, and a home screen widget. Built with SwiftUI, running on my own phone.',
    stack: ['Swift', 'SwiftUI', 'SwiftData', 'iOS'],
    metrics: [
      { label: 'Notes', value: 'Freeform' },
      { label: 'Lock', value: 'Face ID' },
      { label: 'Sync', value: 'On-Device' },
    ],
  },
  {
    slug: 'the-five',
    name: 'The Five',
    kind: 'personal',
    note: 'Internal use',
    accent: '#8b5cf6',
    icon: 'chat',
    timelineKey: 'TheFive',
    tagline: 'Five AI companions, each scoped to one part of life.',
    description: 'Five AI companions living on Discord, each scoped to one part of everyday life — calendar and email, trip planning, casual chat, and food tracking, among others. No single assistant wearing every hat, each with its own name and voice. Runs around the clock on the home server, reachable anytime from Discord. Built to operate — not a public product.',
    stack: ['Python', 'FastAPI', 'Discord.py', 'Groq'],
    metrics: [
      { label: 'Agents', value: '5' },
      { label: 'Providers', value: '3' },
      { label: 'Access', value: 'Discord DM' },
    ],
  },
  {
    slug: 'minecraft-server',
    name: 'Minecraft Server',
    kind: 'personal',
    note: 'Whitelist only',
    accent: '#65a30d',
    icon: 'cube',
    timelineKey: 'MinecraftServer',
    tagline: 'A private world, self-hosted and always on.',
    description: 'A private Minecraft server built from my own singleplayer world, running around the clock for me and a handful of friends. Real accounts, a strict whitelist, automatic backups, and a proper admin setup — not a rented server, a real one I run and maintain myself on the home server.',
    stack: ['Minecraft', 'Paper', 'Java 21', 'systemd'],
    metrics: [
      { label: 'Friends', value: '5' },
      { label: 'Uptime', value: '24/7' },
      { label: 'Access', value: 'Whitelist' },
    ],
  },
  {
    slug: 'beacon',
    name: 'Beacon',
    kind: 'personal',
    note: 'LAN only',
    accent: '#0891b2',
    icon: 'signal',
    timelineKey: 'Beacon',
    tagline: 'Total visibility over my Minecraft server.',
    description: 'A private admin dashboard for my Minecraft server — live console access, whitelist management, and a full inventory viewer that renders real armor, enchantments, and trims. Built for total visibility over my own server without putting another admin surface on the open internet.',
    stack: ['Python', 'FastAPI', 'JavaScript', 'RCON'],
    metrics: [
      { label: 'Console', value: 'Live' },
      { label: 'Inventory', value: 'Full' },
      { label: 'Access', value: 'LAN Only' },
    ],
  },
];

export const PUBLIC_PROJECTS = PROJECTS.filter((p) => p.kind === 'public');
export const PERSONAL_PROJECTS = PROJECTS.filter((p) => p.kind === 'personal');

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug);
}

export function hostOf(project) {
  return project.url?.replace(/^https?:\/\//, '');
}

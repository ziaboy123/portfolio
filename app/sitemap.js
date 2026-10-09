import { PROJECTS } from '@/lib/projects';

const SITE = 'https://daniyalzia.co.uk';

export default function sitemap() {
  const now = new Date();
  return [
    { url: SITE, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE}/timeline`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    ...PROJECTS.map((p) => ({ url: `${SITE}/projects/${p.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 })),
    // The live apps themselves, served from their own paths on this domain
    ...PROJECTS.filter((p) => p.url).map((p) => ({ url: p.url, lastModified: now, changeFrequency: 'monthly', priority: 0.7 })),
    { url: `${SITE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];
}

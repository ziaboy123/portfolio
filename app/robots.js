export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/insights/' },
    sitemap: 'https://daniyalzia.co.uk/sitemap.xml',
    host: 'https://daniyalzia.co.uk',
  };
}

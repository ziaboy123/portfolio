// Link-preview tags for one page. A page that sets its own openGraph replaces the
// root layout's completely, so everything a preview card needs is spelled out here.
export function sharing({ title, description, path, image = '/opengraph-image' }) {
  return {
    openGraph: { title, description, url: path, siteName: 'Daniyal Zia', locale: 'en_GB', type: 'website', images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

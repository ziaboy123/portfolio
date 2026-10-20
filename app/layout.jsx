import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://daniyalzia.co.uk'),
  title: 'Daniyal Zia — Junior IT Professional & Computer Science Student',
  description: 'Daniyal Zia is a junior IT professional and computer science student in the UK, building web apps, real-time systems, AI agents, iOS apps, embedded hardware and the infrastructure that runs them.',
  keywords: ['Daniyal Zia', 'Daniyal', 'Zia', 'junior IT professional', 'computer science student', 'software', 'infrastructure', 'portfolio'],
  authors: [{ name: 'Daniyal Zia', url: 'https://daniyalzia.co.uk' }],
  creator: 'Daniyal Zia',
  openGraph: {
    title: 'Daniyal Zia — Junior IT Professional & Computer Science Student',
    description: 'One builder. Multiple systems.',
    url: 'https://daniyalzia.co.uk',
    siteName: 'Daniyal Zia',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  // Google Search Console ownership check (public by design)
  verification: { google: 'EkP7gbzIk3hOtQj_5sIHv7aK7xga0aKbSG-nXo6JJQc' },
};

// Tells search engines this site is the official home of a person named
// Daniyal Zia and links it to his other profiles, so a search for the name
// can recognise them as the same person.
const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://daniyalzia.co.uk/#person',
      name: 'Daniyal Zia',
      url: 'https://daniyalzia.co.uk',
      image: 'https://daniyalzia.co.uk/opengraph-image',
      jobTitle: 'Junior IT Professional',
      description: 'Computer science student building web apps, real-time systems, AI agents, iOS apps, embedded hardware and self-hosted infrastructure.',
      knowsAbout: ['Software engineering', 'Web development', 'Infrastructure', 'Artificial intelligence', 'Embedded systems', 'iOS development', 'Networking'],
      sameAs: ['https://github.com/ziaboy123', 'https://www.linkedin.com/in/daniyalzia/'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://daniyalzia.co.uk/#website',
      url: 'https://daniyalzia.co.uk',
      name: 'Daniyal Zia',
      publisher: { '@id': 'https://daniyalzia.co.uk/#person' },
      inLanguage: 'en-GB',
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        {/* without JavaScript the entrance animations never run, so show everything they'd fade in */}
        <noscript>
          <style>{'[style*="opacity:0"]{opacity:1!important;transform:none!important;filter:none!important}'}</style>
        </noscript>
        {/* Self-hosted Umami: cookieless, no IPs stored, live domain only, honours Do Not Track, Global Privacy Control
            and the /privacy switch (see /privacy).
            Production only, since /insights/ only exists behind the live server. */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Global Privacy Control means "don't count me": Umami calls this before every send and drops the visit */}
            <script dangerouslySetInnerHTML={{ __html: 'window.umamiBeforeSend=function(t,p){return navigator.globalPrivacyControl===true?false:p}' }} />
            <script
              defer
              src="/insights/script.js"
              data-website-id="b80f9afb-e7c2-4627-8610-a9b70456da11"
              data-domains="daniyalzia.co.uk"
              data-do-not-track="true"
              data-before-send="umamiBeforeSend"
            />
          </>
        )}
      </head>
      <body className="min-h-screen antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }} />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}

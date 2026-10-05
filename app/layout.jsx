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
  title: 'Daniyal Zia — Software & Infrastructure',
  description: 'Computer science student building and self-hosting real software: web apps, AI systems, iOS, embedded hardware and the infrastructure that runs them.',
  keywords: ['Daniyal Zia', 'software', 'infrastructure', 'computer science', 'engineering'],
  authors: [{ name: 'Daniyal Zia' }],
  openGraph: {
    title: 'Daniyal Zia — Software & Infrastructure',
    description: 'One builder. Multiple systems.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="min-h-screen antialiased">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}

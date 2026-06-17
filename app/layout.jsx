import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'NEXUS — Central Hub',
  description: 'The headquarters for an expanding ecosystem of software, infrastructure, and technical systems.',
  keywords: ['NEXUS', 'software', 'infrastructure', 'computer science', 'AI', 'engineering'],
  authors: [{ name: 'Daniyal Zia' }],
  openGraph: {
    title: 'NEXUS — Central Hub',
    description: 'One builder. Multiple ambitious systems.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0c" />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}

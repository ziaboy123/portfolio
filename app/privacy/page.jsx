import LegalPage from '@/components/LegalPage';

export const metadata = {
  title: 'Privacy — Daniyal Zia',
  description: 'What daniyalzia.co.uk and the projects on it collect, why, and what you can do about it.',
  alternates: { canonical: '/privacy' },
};

const EMAIL = 'daniyal@daniyalzia.co.uk';

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy."
      updated="10 October 2026"
      intro="What this website and the projects on it collect, why, and what you can do about it. The short version: no ads, no tracking cookies, and nothing is ever sold or shared."
    >
      <h2>Who is responsible</h2>
      <p>
        Daniyal Zia, an individual based in the United Kingdom, is responsible for any personal data handled
        through daniyalzia.co.uk. For anything on this page, email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>

      <h2>This website</h2>
      <p>
        <strong>Visitor statistics.</strong>{' '}Page visits are counted with Umami, a privacy-focused analytics
        tool that runs on this site&apos;s own server, so the data never goes to an analytics company. It uses no
        cookies and does not store your IP address. It records the page you visited, the site that linked you
        here, your browser, operating system, device type, screen size, language and country. Visits are grouped
        under an anonymous identifier that changes every month, so they can&apos;t be linked over longer periods.
        If your browser sends a Do Not Track signal, you aren&apos;t counted at all. This is used only to understand
        which pages people find useful, and statistics are deleted after two years.
      </p>
      <p>
        <strong>Server logs.</strong>{' '}The web server records which page was requested, when, and the browser
        type, for security and troubleshooting. These logs don&apos;t include your IP address and are deleted after
        14 days.
      </p>
      <p>
        <strong>Cookies.</strong>{' '}This website sets no cookies.
      </p>

      <h2>Delivery and security</h2>
      <p>
        Traffic to this site passes through Cloudflare, which protects it and delivers it quickly. Cloudflare
        processes your IP address to do that, as described in{' '}
        <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Cloudflare&apos;s privacy policy</a>.
        Everything else runs on servers in the United Kingdom.
      </p>

      <h2>Emailing me</h2>
      <p>
        Email sent to <a href={`mailto:${EMAIL}`}>{EMAIL}</a> is passed on by Cloudflare&apos;s email routing to my
        personal inbox. It&apos;s used only to reply to you and isn&apos;t added to any mailing list.
      </p>

      <h2>The projects</h2>
      <p>
        <strong>Cipher</strong>{' '}encrypts messages and display names in your browser before they&apos;re sent. The server
        only passes them on, can&apos;t read them, and doesn&apos;t keep them. The room key stays in the invite link and in
        that browser tab&apos;s session storage until you leave, and the tab also remembers the name you typed. It sets one
        essential cookie that keeps you in your room and protects its forms.
      </p>
      <p>
        <strong>WatchMatch</strong>{' '}keeps your quiz answers in your browser. Nothing is stored on the server.
      </p>
      <p>
        <strong>Gambit</strong>{' '}can be played as a guest. If you create an account, it stores your username, your
        password (only as a secure scrypt hash), your rating, your match history (including the player names shown in
        each game) and your puzzle progress. Your sign-in and board theme are remembered in your browser&apos;s local
        storage.
      </p>
      <p>
        <strong>DeckForge</strong>{' '}needs an account, which stores your email address, an optional display name, your
        password (only as a secure bcrypt hash) and the decks you build. An essential cookie keeps you signed in.
      </p>
      <p>
        Account data is used only to run the account you asked for, and is kept until you delete it or ask for it to be
        deleted.
      </p>

      <h2>Sharing</h2>
      <p>
        Your information is never sold, never used for advertising, and never shared with anyone else, apart from
        Cloudflare and my email provider as described above, or if the law requires it.
      </p>

      <h2>Your rights</h2>
      <p>
        Under UK data protection law you can ask to see the personal data held about you, have it corrected or deleted,
        or object to how it&apos;s used. Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and you&apos;ll get a reply within
        a month. If you&apos;re unhappy with the response, you can complain to the{' '}
        <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">Information Commissioner&apos;s Office</a>.
      </p>

      <h2>Changes</h2>
      <p>If this policy changes, the date at the top of this page changes with it.</p>
    </LegalPage>
  );
}

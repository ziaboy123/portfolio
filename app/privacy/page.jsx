import LegalPage from '@/components/LegalPage';
import StatsOptOut from '@/components/StatsOptOut';
import { sharing } from '@/lib/seo';

export const metadata = {
  title: 'Privacy — Daniyal Zia',
  description: 'What daniyalzia.co.uk and the projects on it collect, why, and what you can do about it.',
  alternates: { canonical: '/privacy' },
  ...sharing({ title: 'Privacy — Daniyal Zia', description: 'What daniyalzia.co.uk and the projects on it collect, why, and what you can do about it.', path: '/privacy' }),
};

const EMAIL = 'mail@daniyalzia.co.uk';

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy."
      updated="20 October 2026"
      intro="What this website and the projects on it collect, why, and what you can do about it. The short version: no tracking cookies, and nothing is ever sold or used for advertising."
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
        under a scrambled identifier (not your IP address) that resets every month, so they can&apos;t be linked over
        longer periods. This is used only to understand which pages people find useful, and statistics are deleted
        after two years. To stop being counted, use this switch, or turn on Do Not Track or Global Privacy Control in
        your browser.
      </p>
      <StatsOptOut />
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
        The servers that run this site and its projects are in the United Kingdom.
      </p>
      <p>
        <strong>Outside the UK.</strong>{' '}Cloudflare, Microsoft (which hosts my inbox) and Resend (which sends
        Millennium Arena&apos;s emails) are US companies, so some of your data may be handled outside the UK. Those
        transfers are covered by the UK-US data bridge (the UK Extension to the EU-US Data Privacy Framework) or by
        UK-approved data transfer clauses.
      </p>

      <h2>Emailing me</h2>
      <p>
        Email sent to <a href={`mailto:${EMAIL}`}>{EMAIL}</a> is passed on by Cloudflare&apos;s email routing to my
        personal inbox, hosted by Microsoft. It&apos;s used only to reply to you, isn&apos;t added to any mailing list,
        and is kept only as long as it&apos;s needed for that.
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
        password (only as a secure bcrypt hash) and the decks you build. An essential cookie keeps you signed in. The same
        account and decks are used by Millennium Arena.
      </p>
      <p>
        <strong>Millennium Arena</strong>{' '}uses your DeckForge account, plus a username and your settings. It also stores your
        match history (who you played, the result, your deck&apos;s name and how long it took), how often you play each card,
        and your logins and any devices you choose to trust, kept only as hashed random keys. Codes for signing up, new
        devices and password resets are emailed through{' '}
        <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Resend</a>, an email
        delivery service in Ireland, and expire after 10 minutes. One essential cookie keeps you signed in, and a second
        remembers a trusted device for 30 days; your theme and duel choices are kept in your browser. Other players see your
        username and your win/loss record, never your email, decks or match history. Room chat goes only to the people in
        the room and isn&apos;t saved. Deleting your account in its Settings removes it from both sites, decks included.
      </p>
      <p>
        DeckForge and Millennium Arena show card pictures straight from YGOPRODeck&apos;s image server, and Millennium
        Arena loads its fonts from Google Fonts. Your browser fetches these directly, so those services see your IP
        address, but they never receive any account data.
      </p>
      <p>
        Account data is used only to run the account you asked for, and is kept until you delete it or ask for it to be
        deleted. The DeckForge and Millennium Arena account database is backed up every night and each backup is kept for
        14 days, so a deleted account is gone from the backups within 14 days.
      </p>

      <h2>Why this is allowed</h2>
      <p>
        <strong>Legitimate interests.</strong>{' '}Visitor statistics, server logs and Cloudflare&apos;s protection keep the
        site secure and show which pages are useful. Replying to your emails is also a legitimate interest.
      </p>
      <p>
        <strong>Providing what you asked for.</strong>{' '}Accounts, decks, match history and Millennium Arena&apos;s emailed
        codes are needed to run the account you signed up for (a contract with you).
      </p>

      <h2>Children</h2>
      <p>
        The projects with accounts are for people aged 13 or over. If you think a child under 13 has an account, email{' '}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and it will be deleted.
      </p>

      <h2>Sharing</h2>
      <p>
        Your information is never sold, never used for advertising, and never shared with anyone else, apart from
        the services named above (Cloudflare, Microsoft, Resend, YGOPRODeck and Google Fonts), or if the law
        requires it.
      </p>

      <h2>Your rights</h2>
      <p>
        Under UK data protection law you can ask to see the personal data held about you, have it corrected or deleted,
        limit or object to how it&apos;s used, or get a copy to take somewhere else. Email{' '}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and you&apos;ll get a reply within a month.
      </p>
      <p>
        <strong>Complaints.</strong>{' '}Unhappy with how your data has been handled? Email{' '}
        <a href={`mailto:${EMAIL}?subject=${encodeURIComponent('Data protection complaint')}`}>{EMAIL}</a> with the subject
        &ldquo;Data protection complaint&rdquo;. I&apos;ll acknowledge it within 30 days and tell you the outcome. You can also
        complain to the{' '}
        <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">Information Commissioner&apos;s Office</a>.
      </p>

      <h2>Changes</h2>
      <p>If this policy changes, the date at the top of this page changes with it.</p>
    </LegalPage>
  );
}

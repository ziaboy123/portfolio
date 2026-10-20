import LegalPage from '@/components/LegalPage';
import { sharing } from '@/lib/seo';

export const metadata = {
  title: 'Terms — Daniyal Zia',
  description: 'The terms for using daniyalzia.co.uk and the projects on it.',
  alternates: { canonical: '/terms' },
  ...sharing({ title: 'Terms — Daniyal Zia', description: 'The terms for using daniyalzia.co.uk and the projects on it.', path: '/terms' }),
};

const EMAIL = 'mail@daniyalzia.co.uk';

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms."
      updated="20 October 2026"
      intro="The terms for using daniyalzia.co.uk and the projects hosted on it. By using the site, you agree to them."
    >
      <h2>Using the projects</h2>
      <p>
        Cipher, Gambit, WatchMatch, DeckForge and Millennium Arena are free to use. They are personal projects, provided as they are,
        and may change, pause or go offline at any time without notice. You must be 13 or older to use Cipher.
      </p>

      <h2>Accounts</h2>
      <p>
        If you create an account on Gambit, DeckForge or Millennium Arena, keep your password safe and don&apos;t share your
        account. You must be 13 or older to create an account on any of these projects. Millennium Arena also has its own
        short terms, which apply alongside these. Accounts
        used to cheat, spam, harass others or attack the service may be suspended or removed. You can ask for your account
        to be deleted at any time.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Don&apos;t use the site or its projects to break the law, send unlawful or abusive content, or try to disrupt,
        overload or gain unauthorised access to them. Messages sent in Cipher are the responsibility of the people
        who send them.
      </p>

      <h2 id="reporting">Reporting content and complaints</h2>
      <p>
        Cipher, Gambit and Millennium Arena let people send messages, usernames and other content to each other. Daniyal
        Zia is responsible for keeping them safe and for dealing with reports and complaints about them.
      </p>
      <p>
        <strong>What isn&apos;t allowed.</strong>{' '}Illegal content of any kind, including child sexual exploitation and
        abuse (such as grooming and abuse images), terrorist content, threats, harassment and fraud.
      </p>
      <p>
        <strong>How to report it.</strong>{' '}Email <a href={`mailto:${EMAIL}?subject=${encodeURIComponent('Report')}`}>{EMAIL}</a>{' '}
        with the room code, username or link, and what happened. You don&apos;t need an account to report something.
      </p>
      <p>
        <strong>What happens next.</strong>{' '}Every report is reviewed promptly by a person. Illegal content is removed,
        and accounts used to share it are suspended or deleted. Child sexual exploitation and abuse, including grooming and
        abuse images, is reported to the National Crime Agency, as UK law requires. Nothing you share is scanned
        automatically, except that Millennium Arena&apos;s Unranked chat blocks links and contact details (like emails,
        phone numbers and social handles) before they&apos;re sent. Otherwise, reports are how problems are found.
      </p>
      <p>
        <strong>Complaints and appeals.</strong>{' '}If you think content was removed or an account suspended by mistake, or
        you&apos;re unhappy with how a report was handled, email{' '}
        <a href={`mailto:${EMAIL}?subject=${encodeURIComponent('Complaint')}`}>{EMAIL}</a> with the subject
        &ldquo;Complaint&rdquo;. You&apos;ll get an answer within 14 days, and anything removed or suspended by mistake is
        put back.
      </p>

      <h2 id="security">Reporting a security issue</h2>
      <p>
        If you find a security problem, please report it privately to <a href={`mailto:${EMAIL}`}>{EMAIL}</a> before
        sharing it anywhere else. Good-faith reports that avoid harming users or their data are welcome.
      </p>

      <h2>Content and trademarks</h2>
      <p>
        The design and writing on this site are © Daniyal Zia. Source code published on GitHub is covered by the licence in
        each repository. Yu-Gi-Oh! card names and images belong to Konami, card data comes from YGOPRODeck, and watch names and
        images belong to their respective brands. They are used for identification only, and none of these companies is
        affiliated with this site.
      </p>
      <p id="credits">
        The dragon logo is{' '}
        <a href="https://game-icons.net/1x1/delapouite/spiked-dragon-head.html" target="_blank" rel="noopener noreferrer">&ldquo;Spiked dragon head&rdquo;</a>{' '}
        by Delapouite, licensed under{' '}
        <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener noreferrer">CC BY 3.0</a>, recoloured.
      </p>

      <h2>Liability</h2>
      <p>
        The site and projects are provided without warranties of any kind. To the extent the law allows, Daniyal Zia
        isn&apos;t liable for any loss arising from their use, including lost data. Nothing here limits liability that
        can&apos;t be limited by law.
      </p>

      <h2>Privacy</h2>
      <p>
        How personal data is handled is explained on the <a href="/privacy">Privacy page</a>.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of England and Wales.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    </LegalPage>
  );
}

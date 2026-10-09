import LegalPage from '@/components/LegalPage';

export const metadata = {
  title: 'Terms — Daniyal Zia',
  description: 'The terms for using daniyalzia.co.uk and the projects on it.',
  alternates: { canonical: '/terms' },
};

const EMAIL = 'daniyal@daniyalzia.co.uk';

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms."
      updated="9 October 2026"
      intro="The terms for using daniyalzia.co.uk and the projects hosted on it. By using the site, you agree to them."
    >
      <h2>Using the projects</h2>
      <p>
        Cipher, Gambit, WatchMatch and DeckForge are free to use. They are personal projects, provided as they are,
        and may change, pause or go offline at any time without notice.
      </p>

      <h2>Accounts</h2>
      <p>
        If you create an account on Gambit or DeckForge, keep your password safe and don&apos;t share your account. Accounts
        used to cheat, spam, harass others or attack the service may be suspended or removed. You can ask for your account
        to be deleted at any time.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Don&apos;t use the site or its projects to break the law, send unlawful or abusive content, or try to disrupt,
        overload or gain unauthorised access to them. Messages sent in Cipher are the responsibility of the people
        who send them.
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

import Navigation from '@/components/Navigation';
import Timeline from '@/components/sections/Timeline';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Timeline — D.ZIA',
  description: 'Every project launched, system built, and milestone reached — in order.',
};

export default function TimelinePage() {
  return (
    <>
      <Navigation />
      <main>
        <Timeline />
      </main>
      <Footer />
    </>
  );
}

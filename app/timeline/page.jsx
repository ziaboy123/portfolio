import Timeline from '@/components/sections/Timeline';
import { sharing } from '@/lib/seo';

export const metadata = {
  title: 'Timeline — Daniyal Zia',
  description: 'Every project launched, system built, and milestone reached — in order.',
  alternates: { canonical: '/timeline' },
  ...sharing({ title: 'Timeline — Daniyal Zia', description: 'Every project launched, system built, and milestone reached — in order.', path: '/timeline' }),
};

export default function TimelinePage() {
  return (
    <main>
      <Timeline />
    </main>
  );
}

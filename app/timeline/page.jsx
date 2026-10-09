import Timeline from '@/components/sections/Timeline';

export const metadata = {
  title: 'Timeline — Daniyal Zia',
  description: 'Every project launched, system built, and milestone reached — in order.',
  alternates: { canonical: '/timeline' },
};

export default function TimelinePage() {
  return (
    <main>
      <Timeline />
    </main>
  );
}

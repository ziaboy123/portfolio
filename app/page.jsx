import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Capabilities from '@/components/sections/Capabilities';
import About from '@/components/sections/About';
import TimelineTeaser from '@/components/sections/TimelineTeaser';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Capabilities />
      <About />
      <TimelineTeaser />
      <Contact />
    </main>
  );
}

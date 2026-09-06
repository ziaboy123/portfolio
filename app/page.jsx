import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import TimelineTeaser from '@/components/sections/TimelineTeaser';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <About />
        <TimelineTeaser />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Infrastructure from '@/components/sections/Infrastructure';
import About from '@/components/sections/About';
import Timeline from '@/components/sections/Timeline';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <Infrastructure />
        <About />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal, Chevron } from '@/components/ui/motion';

export default function TimelineTeaser() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'center 0.5'] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="timeline" className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="record" y={48} amount={0.2}>
          <div ref={ref}>
            <div className="eyebrow" style={{ marginBottom: '14px' }}>Timeline</div>
            <h2 className="headline">The Record.</h2>
            <p className="lede" style={{ marginTop: '20px', maxWidth: '560px', marginInline: 'auto' }}>
              Every project launched, system built, and milestone reached — in order.
            </p>
            <div className="record-line" aria-hidden="true">
              <motion.span style={{ scaleX: draw }} />
            </div>
            <Link href="/timeline" className="btn-pill btn-primary">
              View the full timeline <Chevron />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

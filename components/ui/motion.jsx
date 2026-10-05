'use client';

import { motion, useReducedMotion } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1];

// Fade + rise + de-blur into place the first time an element scrolls into view.
export function Reveal({ as = 'div', children, delay = 0, y = 32, amount = 0.3, className, style, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      style={style}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Chevron({ size = 12 }) {
  return (
    <svg className="chev" width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M4.5 2.5 8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

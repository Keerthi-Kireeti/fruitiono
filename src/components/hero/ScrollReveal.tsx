'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useInView,
} from 'framer-motion';
import type { ScrollRevealProps } from '@/types/hero';

const directionOffset = {
  up:    { y: 40, x: 0 },
  down:  { y: -40, x: 0 },
  left:  { y: 0, x: 40 },
  right: { y: 0, x: -40 },
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  once = true,
  threshold = 0.15,
  className,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });
  const prefersReduced = useReducedMotion();

  const offset = directionOffset[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={
        prefersReduced
          ? { opacity: 0 }
          : { opacity: 0, filter: 'blur(6px)', ...offset }
      }
      animate={
        isInView
          ? { opacity: 1, filter: 'blur(0px)', x: 0, y: 0 }
          : undefined
      }
      transition={{
        duration: prefersReduced ? 0.3 : duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

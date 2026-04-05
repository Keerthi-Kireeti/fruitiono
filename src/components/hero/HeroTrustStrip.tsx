'use client';

import { motion } from 'framer-motion';
import type { TrustItem } from '@/types/hero';
import ScrollReveal from './ScrollReveal';

interface HeroTrustStripProps {
  items: TrustItem[];
}

export default function HeroTrustStrip({ items }: HeroTrustStripProps) {
  return (
    <ScrollReveal direction="up" delay={0.9} duration={0.6}>
      <div className="hero__trust" role="list" aria-label="Trust highlights">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            className="hero__trust-item"
            role="listitem"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 1.0 + i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span className="hero__trust-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </motion.div>
        ))}
      </div>
    </ScrollReveal>
  );
}

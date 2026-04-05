'use client';

import { motion } from 'framer-motion';
import type { HeroSectionProps } from '@/types/hero';
import { FLOATING_ASSETS, TRUST_ITEMS } from '@/data/heroAssets';
import ScrollReveal from './ScrollReveal';
import HeroVisualCluster from './HeroVisualCluster';
import HeroTrustStrip from './HeroTrustStrip';

export default function HeroSection({
  eyebrow = 'Made with Real Fruits & Premium Ingredients',
  headline,
  subtitle = 'Handcrafted kulfi & fresh fruit creations made to order. Customize your treat, order for today, or prebook for your next celebration.',
  orderHref = '/order',
  menuHref = '/menu',
  orderLabel = 'Order Now',
  menuLabel = 'Explore Menu',
}: HeroSectionProps) {

  const defaultHeadline = (
    <>
      Fresh Fruits,{' '}
      <span className="hero__headline-accent">Handcrafted Kulfi</span>
      {' '}& Irresistible Cravings
    </>
  );

  return (
    <section className="hero hero-grain" id="hero" aria-label="Hero banner">
      <div className="hero__inner">
        {/* ── Left: Content ─────────────────────── */}
        <div className="hero__content">
          {/* Eyebrow */}
          <ScrollReveal direction="up" delay={0.1} duration={0.6}>
            <span className="hero__eyebrow">
              <span className="hero__eyebrow-dot" aria-hidden="true" />
              {eyebrow}
            </span>
          </ScrollReveal>

          {/* Headline */}
          <ScrollReveal direction="up" delay={0.25} duration={0.8}>
            <h1 className="hero__headline">
              {headline ?? defaultHeadline}
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal direction="up" delay={0.4} duration={0.7}>
            <p className="hero__subtitle">{subtitle}</p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal direction="up" delay={0.55} duration={0.6}>
            <div className="hero__ctas">
              <motion.a
                href={orderHref}
                className="hero__cta hero__cta--primary"
                id="hero-cta-order"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                {orderLabel}
                <span className="hero__cta-icon" aria-hidden="true">→</span>
              </motion.a>

              <motion.a
                href={menuHref}
                className="hero__cta hero__cta--tertiary"
                id="hero-cta-menu"
              >
                {menuLabel}
                <span className="hero__cta-icon" aria-hidden="true">→</span>
              </motion.a>
            </div>
          </ScrollReveal>

          {/* Trust Strip */}
          <HeroTrustStrip items={TRUST_ITEMS} />
        </div>

        {/* ── Right: Visual Cluster ─────────────── */}
        <HeroVisualCluster assets={FLOATING_ASSETS} />
      </div>
    </section>
  );
}

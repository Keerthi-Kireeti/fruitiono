'use client';

import { useRef, useMemo } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import Image from 'next/image';
import type { FloatingAssetConfig } from '@/types/hero';

/* Glow color per asset type for visual variety */
const GLOW_COLORS: Record<string, string> = {
  'mango-slice':  'rgba(247, 168, 40, 0.30)',
  'strawberry':   'rgba(220, 50, 80, 0.25)',
  'kiwi-slice':   'rgba(124, 179, 66, 0.25)',
  'orange-slice':  'rgba(255, 160, 50, 0.25)',
  'kulfi-stick':  'rgba(240, 212, 138, 0.25)',
  'mint-leaves':  'rgba(100, 200, 120, 0.25)',
  'grapes':       'rgba(140, 60, 180, 0.25)',
  'pistachios':   'rgba(160, 200, 100, 0.25)',
  'matka-kulfi':  'rgba(210, 170, 100, 0.25)',
};

interface FloatingIngredientProps {
  asset: FloatingAssetConfig;
  containerRef: React.RefObject<HTMLElement | null>;
  isMobile: boolean;
  index: number;
}

export default function FloatingIngredient({
  asset,
  containerRef,
  isMobile,
  index,
}: FloatingIngredientProps) {
  const prefersReduced = useReducedMotion();
  const elementRef = useRef<HTMLDivElement>(null);

  // Stagger delay based on index
  const staggerDelay = 0.3 + index * 0.12;

  // Scroll-linked parallax, rotation, and scale
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Each ingredient reacts differently to scroll
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [80 * asset.depth, 0, -100 * asset.depth]
  );

  const scrollRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [-(30 * asset.depth), 30 * asset.depth]
  );

  const scrollScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.4, 1.05, 1, 0.6]
  );

  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.8, 1],
    [0, 1, 1, 0.3]
  );

  // Smooth spring for parallax
  const springY = useSpring(parallaxY, { stiffness: 60, damping: 20 });
  const springRotate = useSpring(scrollRotate, { stiffness: 50, damping: 25 });
  const springScale = useSpring(scrollScale, { stiffness: 80, damping: 30 });

  // Randomized idle animation values — stable per render via useMemo
  const idleConfig = useMemo(() => ({
    driftDuration: 5 + (index * 1.3) % 5,
    rotateDuration: 7 + (index * 1.7) % 6,
    scaleDuration: 8 + (index * 2.1) % 4,
    driftX: asset.drift * 0.7,
    driftY: asset.drift,
  }), [asset.drift, index]);

  if (isMobile && asset.hiddenOnMobile) return null;

  const pos = isMobile ? asset.mobilePosition : asset.desktopPosition;
  const sizeNum = parseInt(asset.size);
  const displaySize = isMobile ? `${Math.round(sizeNum * 0.75)}px` : asset.size;
  const glowColor = GLOW_COLORS[asset.id] || 'rgba(247,168,40,0.25)';
  const showSparkles = index % 3 === 0; // Sparkle on some items

  return (
    <motion.div
      ref={elementRef}
      className="floating-ingredient"
      style={{
        ...pos,
        width: displaySize,
        height: displaySize,
        y: prefersReduced ? 0 : springY,
        rotate: prefersReduced ? (asset.initialRotate ?? 0) : springRotate,
        scale: prefersReduced ? 1 : springScale,
        opacity: prefersReduced ? 1 : scrollOpacity,
      }}
      initial={{
        opacity: 0,
        scale: 0,
        rotate: (asset.initialRotate ?? 0) - 90,
        x: index % 2 === 0 ? -120 : 120,
        y: 80,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: asset.initialRotate ?? 0,
        x: 0,
        y: 0,
      }}
      transition={{
        duration: 1.2,
        delay: staggerDelay,
        type: 'spring',
        stiffness: 80,
        damping: 15,
      }}
      aria-hidden="true"
    >
      <div className="floating-ingredient__inner">
        {/* Glow ring  */}
        <motion.div
          className="floating-ingredient__glow"
          style={{ '--glow-color': glowColor } as React.CSSProperties}
          animate={prefersReduced ? {} : {
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3 + index * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.3,
          }}
        />

        {/* Image with blend mode to kill white */}
        <motion.div
          className="floating-ingredient__img-wrap"
          animate={
            prefersReduced
              ? {}
              : {
                  x: [0, idleConfig.driftX, 0, -idleConfig.driftX * 0.7, 0],
                  y: [0, -idleConfig.driftY, 0, idleConfig.driftY * 0.6, 0],
                  rotate: [
                    0,
                    asset.rotate,
                    0,
                    -asset.rotate * 0.6,
                    0,
                  ],
                  scale: [1, 1.04, 0.97, 1.02, 1],
                }
          }
          transition={{
            duration: idleConfig.driftDuration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Image
            src={asset.src}
            alt={asset.alt}
            width={sizeNum}
            height={sizeNum}
            loading="lazy"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            unoptimized
          />
        </motion.div>

        {/* Sparkle dots on select items */}
        {showSparkles && !prefersReduced && (
          <>
            <span className="floating-ingredient__sparkle floating-ingredient__sparkle--1" />
            <span className="floating-ingredient__sparkle floating-ingredient__sparkle--2" />
            <span className="floating-ingredient__sparkle floating-ingredient__sparkle--3" />
          </>
        )}
      </div>
    </motion.div>
  );
}

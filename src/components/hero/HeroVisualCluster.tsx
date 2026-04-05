'use client';

import { useRef, useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import Image from 'next/image';
import FloatingIngredient from './FloatingIngredient';
import type { FloatingAssetConfig } from '@/types/hero';

interface HeroVisualClusterProps {
  assets: FloatingAssetConfig[];
}

export default function HeroVisualCluster({ assets }: HeroVisualClusterProps) {
  const clusterRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Mouse-follow tilt (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [5, -5]),
    { stiffness: 80, damping: 25 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-5, 5]),
    { stiffness: 80, damping: 25 }
  );

  // Scroll-linked scale for the whole cluster
  const { scrollYProgress } = useScroll({
    target: clusterRef,
    offset: ['start end', 'end start'],
  });

  const clusterScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.9]
  );

  const clusterRotateZ = useTransform(
    scrollYProgress,
    [0, 1],
    [-2, 2]
  );

  const springClusterScale = useSpring(clusterScale, { stiffness: 60, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || prefersReduced) return;
    const rect = clusterRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={clusterRef}
      className="hero__visual"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX: isMobile || prefersReduced ? 0 : rotateX,
        rotateY: isMobile || prefersReduced ? 0 : rotateY,
        rotateZ: prefersReduced ? 0 : clusterRotateZ,
        scale: prefersReduced ? 1 : springClusterScale,
      }}
      initial={{ opacity: 0, scale: 0.7, y: 60 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 1.4,
        delay: 0.2,
        type: 'spring',
        stiffness: 60,
        damping: 18,
      }}
    >
      {/* Ambient glow behind the image */}
      <motion.div
        className="hero__visual-glow"
        aria-hidden="true"
        animate={prefersReduced ? {} : {
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Orbit rings */}
      {!prefersReduced && (
        <>
          <div className="hero__orbit-ring hero__orbit-ring--1" aria-hidden="true" />
          <div className="hero__orbit-ring hero__orbit-ring--2" aria-hidden="true" />
          <div className="hero__orbit-ring hero__orbit-ring--3" aria-hidden="true" />
        </>
      )}

      {/* Main product image */}
      <motion.div
        className="hero__main-image-wrap"
        whileHover={!isMobile ? { scale: 1.03 } : {}}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <Image
          src="/hero/hero-main.png"
          alt="Premium Fruitino kulfi and fruit platter"
          fill
          sizes="(max-width: 900px) 65vw, 32vw"
          style={{ objectFit: 'cover' }}
          preload
          unoptimized
        />
      </motion.div>

      {/* Floating decorative ingredients */}
      {assets.map((asset, i) => (
        <FloatingIngredient
          key={asset.id}
          asset={asset}
          containerRef={clusterRef}
          isMobile={isMobile}
          index={i}
        />
      ))}
    </motion.div>
  );
}

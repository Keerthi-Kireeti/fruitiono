/* ═══════════════════════════════════════════════
   Hero Section — Types & Interfaces
   ═══════════════════════════════════════════════ */

/** Position config for an axis (desktop & mobile differ) */
export interface FloatingPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

/** Single decorative floating asset */
export interface FloatingAssetConfig {
  id: string;
  label: string;
  src: string;
  alt: string;
  desktopPosition: FloatingPosition;
  mobilePosition: FloatingPosition;
  /** CSS width/height, e.g. "80px" */
  size: string;
  /** Parallax depth multiplier (0 = static, 1 = full shift) */
  depth: number;
  /** Drift amplitude in px for idle loop */
  drift: number;
  /** Rotation amplitude in degrees for idle loop */
  rotate: number;
  /** Hide on viewports < 901px */
  hiddenOnMobile: boolean;
  /** Initial rotation offset (degrees) */
  initialRotate?: number;
}

/** Props for the top-level HeroSection component */
export interface HeroSectionProps {
  /** Eyebrow label */
  eyebrow?: string;
  /** Main headline — supports JSX override */
  headline?: React.ReactNode;
  /** Subtitle / supporting copy */
  subtitle?: string;
  /** CTA hrefs */
  orderHref?: string;
  menuHref?: string;
  /** CTA labels */
  orderLabel?: string;
  menuLabel?: string;
}

/** Props for reusable scroll-reveal wrappers */
export interface ScrollRevealProps {
  children: React.ReactNode;
  /** Slide direction */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Stagger delay (seconds) */
  delay?: number;
  /** Animation duration (seconds) */
  duration?: number;
  /** Trigger once or every time */
  once?: boolean;
  /** InView threshold 0-1 */
  threshold?: number;
  /** Class to apply */
  className?: string;
}

/** Trust strip item */
export interface TrustItem {
  icon: string;
  label: string;
}

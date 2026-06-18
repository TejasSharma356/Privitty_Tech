import { Variants } from 'framer-motion';

export const SPRING = { type: 'spring' as const, stiffness: 72, damping: 20 };
export const SPRING_FAST = { type: 'spring' as const, stiffness: 90, damping: 18 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: SPRING_FAST },
};

export const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

/* ✨✨✨ directional card variants ✨✨✨ */
const dirs = [
  { opacity: 0, x: -60, y: 0, scale: 0.97 },   // from left
  { opacity: 0, x: 60, y: 0, scale: 0.97 },    // from right
  { opacity: 0, x: 0, y: 56, scale: 0.97 },    // from bottom
  { opacity: 0, x: -40, y: 32, scale: 0.97 },  // bottom-left
  { opacity: 0, x: 40, y: 32, scale: 0.97 },   // bottom-right
];

/** A simple deterministic hash to pick random-looking directions without hydration mismatch */
function hashStr(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
  }
  return Math.abs(hash);
}

/** Returns a deterministic but varied "random" direction variant */
export function cardVariant(i: number, keyStr?: string): Variants {
  // Use a string key if provided, else rely on i and some prime number mix
  const hash = keyStr ? hashStr(keyStr) : (i * 17 + 5);
  const d = dirs[hash % dirs.length];
  return {
    hidden: d,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { ...SPRING, delay: (i % 4) * 0.07 },
    },
  };
}

/** A simple wrapper for whileInView usage — pass i = card index */
export const scrollRevealViewport = { once: true, margin: '-80px' };

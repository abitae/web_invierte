import type { Transition, Variants } from "motion/react";

/**
 * Shared animation vocabulary for web_invierte public pages.
 * `MotionConfig reducedMotion="user"` (set once in App.tsx) makes every
 * `motion.*` element here automatically honor prefers-reduced-motion —
 * individual components don't need to check it themselves.
 */

export const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE_OUT } },
};

export const collapseHeight: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: EASE_OUT } },
};

export function staggerContainer(staggerChildren = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}

/** Pass to `whileInView` so section reveals fire once, slightly before they enter view. */
export const viewportOnce = { once: true, margin: "-80px 0px" } as const;

export const liftHover = { y: -4, transition: { duration: 0.2, ease: EASE_OUT } };
export const tapScale = { scale: 0.97 };

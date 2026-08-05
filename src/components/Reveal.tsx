import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  children: ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  className?: string;
}

/**
 * Fades + lifts content in as it scrolls into view. Honors prefers-reduced-motion
 * (renders statically when reduced). Use this for all section reveal animations
 * so motion stays consistent across the site.
 */
export default function Reveal({ children, delay = 0, className }: Props) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

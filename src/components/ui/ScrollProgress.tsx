import { useScroll, useSpring, motion } from "framer-motion";

/**
 * Thin 2 px line at the very top of the viewport showing scroll progress.
 * Uses Framer Motion's useScroll + useSpring for GPU-accelerated, silky-smooth tracking.
 * Rendered above the header (z-[60]).
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-foreground/70"
      style={{ scaleX }}
      aria-hidden
    />
  );
}

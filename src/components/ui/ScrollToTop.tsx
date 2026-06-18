import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { EASE } from "@/styles/theme";

/**
 * Scroll-to-top FAB. Appears after the user scrolls 400 px down.
 * Springs in from the bottom-right corner; smooth scroll on click.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0.75, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.75, y: 20 }}
          transition={{ duration: 0.35, ease: EASE.out }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={scrollUp}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-6 z-50 inline-flex size-11 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-md backdrop-blur-sm transition hover:bg-foreground hover:text-background md:right-8"
        >
          <ArrowUp className="size-4" strokeWidth={1.75} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

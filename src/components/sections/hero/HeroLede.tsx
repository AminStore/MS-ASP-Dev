import { motion } from "framer-motion";
import { FONTS, COLORS, EASE } from "@/styles/theme";

interface HeroLedeProps {
  text: string;
}

export function HeroLede({ text }: HeroLedeProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.85, ease: EASE.out }}
      className={`max-w-lg ${FONTS.bodyLg} ${COLORS.textMuted}`}
    >
      {text}
    </motion.p>
  );
}

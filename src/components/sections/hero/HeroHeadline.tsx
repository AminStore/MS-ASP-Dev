import { motion } from "framer-motion";
import { FONTS, COLORS, EASE } from "@/styles/theme";

const headlineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.45 } },
};

const headlineLine = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.75, ease: EASE.out },
  },
};

interface HeroHeadlineProps {
  lines: string[];
}

export function HeroHeadline({ lines }: HeroHeadlineProps) {
  return (
    <motion.div
      variants={headlineContainer}
      initial="hidden"
      animate="visible"
      className="space-y-1"
    >
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.p
            variants={headlineLine}
            className={`${FONTS.displayHero} ${COLORS.textBase}`}
          >
            {line}
          </motion.p>
        </div>
      ))}
    </motion.div>
  );
}

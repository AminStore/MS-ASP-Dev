import { motion } from "framer-motion";
import { EASE } from "@/styles/theme";
import type { ReactNode } from "react";

interface HeroColumnProps {
  children: ReactNode;
  side?: "left" | "right";
  delay?: number;
  colSpan?: number;
}

export function HeroColumn({
  children,
  side = "left",
  delay = 0.2,
  colSpan = 5,
}: HeroColumnProps) {
  const colClass =
    side === "left"
      ? `md:col-span-${colSpan}`
      : `md:col-span-${colSpan} lg:ps-8 lg:border-l lg:border-border/25`;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: side === "left" ? -24 : 0,
      }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.65, delay, ease: EASE.out }}
      className={`flex flex-col ${side === "left" ? "gap-4" : "gap-8 justify-center"} ${colClass}`}
    >
      {children}
    </motion.div>
  );
}

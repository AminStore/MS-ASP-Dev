import { motion } from "framer-motion";
import { EASE } from "@/styles/theme";

interface HeroDividerProps {
  delay: number;
  originSide?: "start" | "end";
}

export function HeroDivider({ delay, originSide = "start" }: HeroDividerProps) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.7, delay, ease: EASE.out }}
      className={`h-px w-full ${originSide === "end" ? "origin-end" : "origin-start"} bg-border/60`}
    />
  );
}

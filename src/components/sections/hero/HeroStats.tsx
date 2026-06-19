import { motion } from "framer-motion";
import { FONTS, COLORS, EASE } from "@/styles/theme";

interface Stat {
  value: string;
  label: string;
}

interface HeroStatsProps {
  stats: Stat[];
}

export function HeroStats({ stats }: HeroStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.65 }}
      className="flex items-center gap-4 border-t border-border/40 pt-4"
    >
      {stats.map(({ value, label }) => (
        <div key={label} className="flex-1 text-center">
          <p className={`${FONTS.displayXs} leading-tight`}>{value}</p>
          <p className={`mt-0.5 ${FONTS.labelXs} ${COLORS.textMuted}`}>
            {label}
          </p>
        </div>
      ))}
    </motion.div>
  );
}

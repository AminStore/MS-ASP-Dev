import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { FONTS, COLORS } from "@/styles/theme";

interface HeroFooterProps {
  location: string;
  scrollText: string;
}

export function HeroFooter({ location, scrollText }: HeroFooterProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="mx-auto flex w-full max-w-7xl items-end justify-between"
    >
      <div className={`flex items-center gap-2 ${FONTS.labelXs} ${COLORS.textMuted}`}>
        <MapPin className="size-3" />
        {location}
      </div>

      {/* Scroll indicator */}
      <div className="flex flex-col items-center gap-2">
        <span className={`${FONTS.labelXs} ${COLORS.textMuted}`}>
          {scrollText}
        </span>
        <div className="relative h-10 w-px overflow-hidden rounded-full bg-border">
          <motion.div
            className="absolute top-0 h-4 w-full bg-foreground/60 rounded-full"
            animate={{ y: ["-100%", "200%"] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.3,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

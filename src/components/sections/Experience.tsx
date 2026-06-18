import { motion } from "framer-motion";
import { useT } from "@/i18n/useT";
import { SectionLabel } from "./SectionLabel";
import { SPACING, FONTS, COLORS, ANIMATIONS, BORDERS } from "@/styles/theme";

export function Experience() {
  const t = useT();
  return (
    <section id="experience" className={`mx-auto max-w-7xl ${SPACING.section}`}>
      <SectionLabel eyebrow={t.experience.eyebrow} title={t.experience.title} />

      <ol className={`grid gap-px overflow-hidden ${BORDERS.rounded2xl} ${BORDERS.borderBase} bg-border md:grid-cols-1`}>
        {t.experience.items.map((it, i) => (
          <motion.li
            key={i}
            {...ANIMATIONS.cardIn}
            transition={{ ...ANIMATIONS.cardIn.transition, delay: i * 0.05 }}
            className={`grid gap-6 bg-background ${SPACING.cardPadding} md:grid-cols-12 md:p-10`}
          >
            <p className={`${FONTS.labelMd} ${COLORS.textMuted} md:col-span-3`}>
              {it.period}
            </p>
            <div className="md:col-span-9">
              <p className={FONTS.displayMd}>{it.role}</p>
              <p className={`mt-1 ${FONTS.bodySm} ${COLORS.textMuted}`}>{it.company}</p>
              <p className={`mt-4 max-w-2xl ${FONTS.bodyLg} ${COLORS.textSubtle}`}>{it.body}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

import { motion } from "framer-motion";

export function SectionLabel({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-16 grid gap-6 md:grid-cols-12 md:items-end">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="text-xs uppercase tracking-[0.3em] text-muted-foreground md:col-span-3"
      >
        — {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-5xl leading-[1] tracking-tight md:col-span-9 md:text-7xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}
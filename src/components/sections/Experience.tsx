import { motion } from "framer-motion";
import { useT } from "@/i18n/useT";
import { SectionLabel } from "./SectionLabel";

export function Experience() {
  const t = useT();
  return (
    <section id="experience" className="mx-auto max-w-7xl px-6 py-32 md:px-10">
      <SectionLabel eyebrow={t.experience.eyebrow} title={t.experience.title} />
      <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-1">
        {t.experience.items.map((it, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="grid gap-6 bg-background p-8 md:grid-cols-12 md:p-10"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground md:col-span-3">
              {it.period}
            </p>
            <div className="md:col-span-9">
              <p className="font-display text-3xl leading-tight md:text-4xl">{it.role}</p>
              <p className="mt-1 text-sm text-muted-foreground">{it.company}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-foreground/80">{it.body}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
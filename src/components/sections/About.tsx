import { motion } from "framer-motion";
import { useT } from "@/i18n/useT";
import { SectionLabel } from "./SectionLabel";

export function About() {
  const t = useT();
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-32 md:px-10">
      <SectionLabel eyebrow={t.about.eyebrow} title={t.about.title} />
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3" />
        <div className="space-y-6 md:col-span-6">
          {t.about.body.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-lg leading-relaxed text-foreground/80 md:text-xl"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
      <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border md:grid-cols-3">
        {t.about.stats.map((s) => (
          <div key={s.label} className="bg-card p-8">
            <p className="font-display text-5xl md:text-6xl">{s.value}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
import { motion } from "framer-motion";
import { useT } from "@/i18n/useT";
import { SectionLabel } from "./SectionLabel";

export function Skills() {
  const t = useT();
  return (
    <section id="skills" className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-32">
      <SectionLabel eyebrow={t.skills.eyebrow} title={t.skills.title} />
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-3" />
        <div className="space-y-12 md:col-span-9">
          {t.skills.groups.map((g) => (
            <div key={g.name} className="grid gap-6 border-t border-border pt-8 md:grid-cols-12">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground md:col-span-3">
                {g.name}
              </p>
              <ul className="flex flex-wrap gap-2 md:col-span-9">
                {g.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className="inline-flex rounded-full border border-border bg-card/50 px-4 py-2 text-sm transition hover:bg-foreground hover:text-background"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
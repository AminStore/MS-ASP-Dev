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
          {t.skills.groups.map((g, groupIndex) => (
            <motion.div
              key={g.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              className="grid gap-6 rounded-lg border border-border/40 bg-card/20 p-6 md:grid-cols-12 md:p-8 transition hover:border-border/80 hover:bg-card/30"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground md:col-span-3 font-semibold">
                {g.name}
              </p>
              <ul className="flex flex-wrap gap-3 md:col-span-9">
                {g.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="inline-flex rounded-full border border-border/60 bg-gradient-to-br from-card/80 to-background px-4 py-2 text-sm font-medium text-foreground transition hover:border-foreground hover:bg-foreground hover:text-background hover:shadow-lg hover:shadow-foreground/20"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
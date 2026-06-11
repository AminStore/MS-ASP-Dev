import { motion } from "framer-motion";
import { useT } from "@/i18n/useT";
import { SectionLabel } from "./SectionLabel";

// Color mapping for different skill categories
const SKILL_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  "Backend": { bg: "from-blue-500/10 to-blue-600/10", border: "border-blue-500/40", text: "text-blue-600 dark:text-blue-400" },
  "Frontend": { bg: "from-purple-500/10 to-purple-600/10", border: "border-purple-500/40", text: "text-purple-600 dark:text-purple-400" },
  "Database": { bg: "from-emerald-500/10 to-emerald-600/10", border: "border-emerald-500/40", text: "text-emerald-600 dark:text-emerald-400" },
  "Architecture": { bg: "from-amber-500/10 to-amber-600/10", border: "border-amber-500/40", text: "text-amber-600 dark:text-amber-400" },
  "DevOps": { bg: "from-orange-500/10 to-orange-600/10", border: "border-orange-500/40", text: "text-orange-600 dark:text-orange-400" },
  "Tools": { bg: "from-pink-500/10 to-pink-600/10", border: "border-pink-500/40", text: "text-pink-600 dark:text-pink-400" },
};

const getColorForCategory = (categoryName: string) => {
  return SKILL_COLORS[categoryName] || SKILL_COLORS["Tools"];
};

export function Skills() {
  const t = useT();
  return (
    <section id="skills" className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-32">
      <SectionLabel eyebrow={t.skills.eyebrow} title={t.skills.title} />
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-3" />
        <div className="space-y-8 md:col-span-9">
          {t.skills.groups.map((g, groupIndex) => {
            const colors = getColorForCategory(g.name);
            return (
              <motion.div
                key={g.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                className={`grid gap-6 rounded-xl border ${colors.border} bg-gradient-to-br ${colors.bg} p-6 md:grid-cols-12 md:p-8 transition hover:border-current`}
              >
                <p className={`text-xs uppercase tracking-[0.2em] font-bold md:col-span-3 ${colors.text}`}>
                  {g.name}
                </p>
                <ul className="flex flex-wrap gap-3 md:col-span-9">
                  {g.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className={`inline-flex rounded-full border ${colors.border} bg-gradient-to-br ${colors.bg} px-4 py-2.5 text-sm font-semibold ${colors.text} transition hover:bg-foreground hover:text-background hover:border-foreground hover:shadow-lg hover:shadow-foreground/20`}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
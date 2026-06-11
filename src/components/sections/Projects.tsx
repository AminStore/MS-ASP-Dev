import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useT } from "@/i18n/useT";
import { SectionLabel } from "./SectionLabel";

export function Projects() {
  const t = useT();
  const items = t.projects.items;
  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((p) => set.add(p.category));
    return [t.projects.all, ...Array.from(set)];
  }, [items, t.projects.all]);
  const [active, setActive] = useState(t.projects.all);

  const visible = active === t.projects.all ? items : items.filter((p) => p.category === active);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-32">
      <SectionLabel eyebrow={t.projects.eyebrow} title={t.projects.title} />

      <div className="mb-12 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={[
              "inline-flex rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition",
              active === c
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="border-t border-border">
        {visible.map((p, i) => (
          <motion.li
            key={p.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group border-b border-border"
          >
            <Link
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-6 transition hover:bg-card/50 md:grid-cols-12 md:py-8"
            >
              <span className="text-xs text-muted-foreground md:col-span-1">
                0{i + 1}
              </span>
              <span className="min-w-0 md:col-span-5">
                <span className="block truncate font-display text-2xl leading-tight transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1 sm:text-3xl md:text-5xl">
                  {p.name}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground md:hidden">
                  {p.summary} · {p.year}
                </span>
              </span>
              <span className="hidden text-sm text-muted-foreground md:col-span-4 md:block">
                {p.summary}
              </span>
              <span className="hidden text-end text-xs uppercase tracking-[0.18em] text-muted-foreground md:col-span-1 md:block">
                {p.year}
              </span>
              <span className="flex shrink-0 items-center justify-end md:col-span-1">
                <ArrowUpRight className="size-5 text-muted-foreground transition group-hover:text-foreground" />
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
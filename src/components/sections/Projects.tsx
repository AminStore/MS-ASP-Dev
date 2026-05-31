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
    <section id="projects" className="mx-auto max-w-7xl px-6 py-32 md:px-10">
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
              className="grid grid-cols-12 items-center gap-4 py-8 transition hover:bg-card/50"
            >
              <span className="col-span-1 text-xs text-muted-foreground">
                0{i + 1}
              </span>
              <span className="col-span-7 md:col-span-5">
                <span className="block font-display text-3xl leading-tight transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1 md:text-5xl">
                  {p.name}
                </span>
              </span>
              <span className="hidden text-sm text-muted-foreground md:col-span-4 md:block">
                {p.summary}
              </span>
              <span className="col-span-2 text-end text-xs uppercase tracking-[0.18em] text-muted-foreground md:col-span-1">
                {p.year}
              </span>
              <span className="col-span-2 flex items-center justify-end md:col-span-1">
                <ArrowUpRight className="size-5 text-muted-foreground transition group-hover:text-foreground" />
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
import { useT } from "@/i18n/useT";
import { SectionLabel } from "./SectionLabel";

export function Education() {
  const t = useT();
  return (
    <section id="education" className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-32">
      <SectionLabel eyebrow={t.education.eyebrow} title={t.education.title} />
      <ul className="divide-y divide-border border-y border-border">
        {t.education.items.map((it, i) => (
          <li key={i} className="grid gap-4 py-8 md:grid-cols-12">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground md:col-span-3">
              {it.period}
            </p>
            <p className="font-display text-2xl md:col-span-6 md:text-3xl">{it.degree}</p>
            <p className="text-sm text-muted-foreground md:col-span-3 md:text-end">
              {it.school}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
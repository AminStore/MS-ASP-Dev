import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, LayoutGrid, Search, X } from "lucide-react";
import { useT } from "@/i18n/useT";
import { SectionLabel } from "./SectionLabel";
import { SPACING, COLORS, ANIMATIONS, BORDERS, FONTS, COMPONENTS } from "@/styles/theme";
import { ProjectThumbnail } from "@/components/ui/ProjectThumbnail";

/** Derive frontend + backend tech tags from a Full Stack project's summary. */
function getStackTags(category: string, summary: string): string[] {
  if (category !== "Full Stack") return [];
  const tags: string[] = [];
  if (/angular/i.test(summary)) tags.push("Angular");
  else if (/react/i.test(summary)) tags.push("React");
  tags.push("ASP.NET Core");
  return tags;
}

function StackBadge({ label, kind }: { label: string; kind: "fe" | "be" }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded border px-1.5 py-px font-accent text-[10px] uppercase tracking-[0.12em]",
        kind === "fe"
          ? "border-border/60 bg-card/60 text-muted-foreground"
          : "border-border/40 bg-background text-muted-foreground/70",
      ].join(" ")}
    >
      {label}
    </span>
  );
}

function StackTags({ category, summary }: { category: string; summary: string }) {
  const tags = getStackTags(category, summary);
  if (!tags.length) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-1">
      {tags.map((t, i) => (
        <StackBadge key={t} label={t} kind={i === 0 ? "fe" : "be"} />
      ))}
    </div>
  );
}

export function Projects() {
  const t = useT();
  const items = t.projects.items;
  const allCategoryLabel = t.projects.all;

  const uniqueCategories = useMemo(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const p of items) {
      if (!seen.has(p.category)) {
        seen.add(p.category);
        out.push(p.category);
      }
    }
    return out;
  }, [items]);

  const filterPills = [allCategoryLabel, ...uniqueCategories];

  const [active, setActive] = useState(allCategoryLabel);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [modalFilter, setModalFilter] = useState(allCategoryLabel);

  const sectionItems = useMemo(() => {
    const base =
      active === allCategoryLabel ? items : items.filter((p) => p.category === active);
    return base.slice(0, 3);
  }, [items, active, allCategoryLabel]);

  const modalItems = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter((p) => {
      const catMatch = modalFilter === allCategoryLabel || p.category === modalFilter;
      const textMatch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q);
      return catMatch && textMatch;
    });
  }, [items, modalFilter, search, allCategoryLabel]);

  useEffect(() => {
    if (!modalOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  return (
    <>
      {/* ─── Section ─────────────────────────────────────────── */}
      <section id="projects" className={`mx-auto max-w-7xl ${SPACING.section}`}>
        <SectionLabel eyebrow={t.projects.eyebrow} title={t.projects.title} />

        {/* Filter pills */}
        <div className="mb-12 flex flex-wrap gap-2 justify-center md:justify-start">
          {filterPills.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`${COMPONENTS.filterPill} ${
                active === c ? COMPONENTS.filterPillActive : COMPONENTS.filterPillInactive
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Project cards — 3-column grid with thumbnail image */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sectionItems.map((p, i) => (
            <motion.div
              key={p.slug}
              {...ANIMATIONS.cardIn}
              transition={{ ...ANIMATIONS.cardIn.transition, delay: i * 0.07 }}
            >
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className={`group flex flex-col overflow-hidden ${BORDERS.roundedXl} border border-border/50 bg-card/40 hover:bg-card/80 transition-colors duration-300`}
              >
                {/* Thumbnail */}
                <ProjectThumbnail
                  name={p.name}
                  category={p.category}
                  slug={p.slug}
                  className="aspect-[16/9] w-full"
                />

                {/* Card body */}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  {/* Category + year row */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex rounded-full border border-border/50 bg-background/60 px-2.5 py-0.5 ${FONTS.labelXs} ${COLORS.textMuted}`}
                    >
                      {p.category}
                    </span>
                    <span className={`${FONTS.labelXs} ${COLORS.textMuted}`}>{p.year}</span>
                  </div>

                  {/* Name */}
                  <h3
                    className={`${FONTS.displaySm} leading-tight transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5`}
                  >
                    {p.name}
                  </h3>

                  {/* Stack tags for Full Stack */}
                  <StackTags category={p.category} summary={p.summary} />

                  {/* Summary */}
                  <p className={`line-clamp-2 flex-1 ${FONTS.bodyXs} ${COLORS.textMuted}`}>
                    {p.summary}
                  </p>

                  {/* Footer link */}
                  <div
                    className={`mt-1 flex items-center gap-1 ${FONTS.labelXs} ${COLORS.textMuted} transition group-hover:${COLORS.textBase}`}
                  >
                    View project
                    <ArrowUpRight className="size-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* See All button */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className={COMPONENTS.buttonSecondary}
          >
            <LayoutGrid className="size-4" />
            All {items.length} projects
          </button>
        </div>
      </section>

      {/* ─── Modal ───────────────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />

          {/* Dialog */}
          <div className="relative z-10 flex w-full max-w-5xl flex-col rounded-2xl border border-border bg-background shadow-2xl max-h-[90dvh]">

            {/* ── Sticky header ── */}
            <div className="flex flex-shrink-0 items-center justify-between border-b border-border px-6 py-5">
              <div>
                <h2 className={FONTS.displaySm}>All Projects</h2>
                <p className={`mt-0.5 ${FONTS.labelXs} ${COLORS.textMuted}`}>
                  {items.length} total · {modalItems.length} shown
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
                className={COMPONENTS.toggleButton}
              >
                <X className="size-4" />
              </button>
            </div>

            {/* ── Sticky search + filter ── */}
            <div className="flex flex-shrink-0 flex-col gap-3 border-b border-border px-6 py-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name, category, or description…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`w-full rounded-lg border border-border bg-card/50 ps-9 pe-4 py-2.5 ${FONTS.bodySm} outline-none transition focus:border-foreground`}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {filterPills.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setModalFilter(c)}
                    className={`${COMPONENTS.filterPill} ${
                      modalFilter === c
                        ? COMPONENTS.filterPillActive
                        : COMPONENTS.filterPillInactive
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Scrollable table ── */}
            <div className="scrollbar-slim flex-1 overflow-y-auto overflow-x-auto">
              <table className="w-full">
                <thead className="sticky top-0 z-10 border-b border-border bg-background">
                  <tr>
                    <th className={`${COMPONENTS.tableHeader} w-14 ps-4`}>
                      {/* thumbnail column */}
                    </th>
                    <th className={COMPONENTS.tableHeader}>Project</th>
                    <th className={`${COMPONENTS.tableHeader} hidden md:table-cell w-36`}>
                      Category
                    </th>
                    <th className={`${COMPONENTS.tableHeader} hidden md:table-cell w-20`}>
                      Year
                    </th>
                    <th className={`${COMPONENTS.tableHeader} w-20`}>View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {modalItems.map((p) => {
                    const stackTags = getStackTags(p.category, p.summary);
                    return (
                      <tr key={p.slug} className="transition hover:bg-card/30">
                        {/* Thumbnail cell */}
                        <td className="ps-4 py-3">
                          <ProjectThumbnail
                            name={p.name}
                            category={p.category}
                            slug={`modal-${p.slug}`}
                            className="size-10 rounded-lg flex-shrink-0"
                          />
                        </td>

                        {/* Name + summary */}
                        <td className="px-4 py-3">
                          <div className={`${FONTS.displayXs} leading-snug`}>{p.name}</div>
                          {stackTags.length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-1">
                              {stackTags.map((tag, ti) => (
                                <StackBadge key={tag} label={tag} kind={ti === 0 ? "fe" : "be"} />
                              ))}
                            </div>
                          )}
                          <div
                            className={`mt-0.5 ${FONTS.bodyXs} ${COLORS.textMuted} line-clamp-1 md:hidden`}
                          >
                            {p.category} · {p.year}
                          </div>
                          <div
                            className={`mt-0.5 ${FONTS.bodyXs} ${COLORS.textMuted} line-clamp-1 hidden md:block`}
                          >
                            {p.summary}
                          </div>
                        </td>

                        {/* Category badge */}
                        <td className="hidden px-4 py-3 md:table-cell">
                          <span
                            className={`inline-flex rounded-full border border-border/60 bg-card/40 px-2.5 py-1 ${FONTS.labelXs}`}
                          >
                            {p.category}
                          </span>
                        </td>

                        {/* Year */}
                        <td
                          className={`hidden px-4 py-3 ${FONTS.labelXs} ${COLORS.textMuted} md:table-cell`}
                        >
                          {p.year}
                        </td>

                        {/* Open link */}
                        <td className="px-4 py-3">
                          <Link
                            to="/projects/$slug"
                            params={{ slug: p.slug }}
                            onClick={() => setModalOpen(false)}
                            className={`inline-flex items-center gap-1 ${FONTS.labelXs} ${COLORS.textMuted} transition hover:${COLORS.textBase}`}
                          >
                            Open <ArrowUpRight className="size-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}

                  {modalItems.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className={`px-6 py-16 text-center ${FONTS.bodySm} ${COLORS.textMuted}`}
                      >
                        No projects match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ── Sticky footer ── */}
            <div className="flex flex-shrink-0 items-center justify-between border-t border-border px-6 py-3">
              <span className={`${FONTS.labelXs} ${COLORS.textMuted}`}>
                {modalItems.length} of {items.length} project
                {items.length !== 1 ? "s" : ""}
              </span>
              {(search || modalFilter !== allCategoryLabel) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setModalFilter(allCategoryLabel);
                  }}
                  className={`${FONTS.labelXs} ${COLORS.textMuted} underline underline-offset-2 transition hover:${COLORS.textBase}`}
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

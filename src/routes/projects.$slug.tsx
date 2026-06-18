import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useT } from "@/i18n/useT";
import { en } from "@/i18n/dictionaries";
import {
  FONTS,
  COLORS,
  BORDERS,
  COMPONENTS,
  SPACING,
  EASE,
  ANIMATIONS,
} from "@/styles/theme";
import { ProjectThumbnail } from "@/components/ui/ProjectThumbnail";
import { Skeleton } from "@/components/ui/skeleton";

/* ── Animation variants ────────────────────────────────────── */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item = {
  hidden:   { opacity: 0, y: 20 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE.out } },
};
const lineReveal = {
  hidden:   { y: "105%", opacity: 0 },
  visible:  { y: "0%",   opacity: 1, transition: { duration: 0.7, ease: EASE.out } },
};

/* ── Skeleton shown while route is loading ─────────────────── */
function ProjectDetailSkeleton() {
  return (
    <>
      <Header />
      <article className="mx-auto max-w-5xl px-6 pt-40 pb-24 md:px-10 space-y-10">
        <Skeleton className="h-4 w-24 rounded-full" />
        <div className="space-y-3 mt-6">
          <Skeleton className="h-5 w-24 rounded" />
          <Skeleton className="h-14 w-3/4 rounded-lg" />
          <Skeleton className="h-14 w-1/2 rounded-lg" />
        </div>
        <Skeleton className="h-6 w-full max-w-xl rounded" />
        <div className={`grid grid-cols-1 gap-px overflow-hidden ${BORDERS.rounded2xl} border border-border md:grid-cols-3`}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-card p-6 space-y-2">
              <Skeleton className="h-3 w-12 rounded" />
              <Skeleton className="h-8 w-24 rounded" />
            </div>
          ))}
        </div>
        <div className="space-y-3 pt-8">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className={`h-4 rounded ${i === 3 ? "w-2/3" : "w-full"}`} />
          ))}
        </div>
        <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
      </article>
      <Footer />
    </>
  );
}

/* ── Route definition ──────────────────────────────────────── */
export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const exists = en.projects.items.some((p) => p.slug === params.slug);
    if (!exists) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const project = en.projects.items.find((p) => p.slug === params.slug);
    const title = project
      ? `${project.name} — Mostafa Samir`
      : "Project — Mostafa Samir";
    const description = project?.summary ?? "A selected project by Mostafa Samir.";
    const url = `/projects/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: "/MS.jpg" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: "/MS.jpg" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: project
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CreativeWork",
                name: project.name,
                description: project.summary,
                dateCreated: project.year,
                creator: {
                  "@type": "Person",
                  name: "Mostafa Samir",
                  url: "/",
                },
              }),
            },
          ]
        : [],
    };
  },
  pendingComponent: ProjectDetailSkeleton,
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="flex min-h-dvh items-center justify-center px-6 text-center">
      <div>
        <p className={`${FONTS.displayXl} leading-none`} aria-hidden>✦</p>
        <p className={`mt-4 ${FONTS.bodySm} ${COLORS.textMuted}`}>Project not found.</p>
        <a href="/" className={`${COMPONENTS.buttonSecondary} mt-6 inline-flex`}>← All work</a>
      </div>
    </div>
  ),
});

/* ── Main component ────────────────────────────────────────── */
function ProjectDetail() {
  const { slug } = Route.useParams();
  const t = useT();
  const project = t.projects.items.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-6 text-center">
        <p className={`${FONTS.bodySm} ${COLORS.textMuted}`}>{t.project.notFound}</p>
      </div>
    );
  }

  /* Related: same category, excluding self, max 3 */
  const related = t.projects.items
    .filter((p) => p.category === project.category && p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <Header />

      {/* ── Hero header ──────────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-5xl px-6 pt-36 md:px-10"
      >
        {/* Back link */}
        <motion.div variants={item}>
          <Link
            to="/"
            hash="projects"
            className={`group inline-flex items-center gap-2 ${FONTS.labelXs} ${COLORS.textMuted} transition hover:text-foreground`}
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1 rtl:rotate-180" />
            {t.project.back}
          </Link>
        </motion.div>

        {/* Category + year eyebrow */}
        <motion.div variants={item} className="mt-10 flex items-center gap-3">
          <span
            className={`inline-flex rounded-full border border-border/60 bg-card/40 px-3 py-1 ${FONTS.labelXs} ${COLORS.textMuted}`}
          >
            {project.category}
          </span>
          <span className={`${FONTS.labelXs} ${COLORS.textMuted}`}>{project.year}</span>
        </motion.div>

        {/* Title — theatrical slide-up */}
        <div className="mt-4 overflow-hidden">
          <motion.h1
            variants={lineReveal}
            className={`${FONTS.displayXl} leading-[0.92] tracking-tight`}
          >
            {project.name}
          </motion.h1>
        </div>

        {/* Summary */}
        <motion.p
          variants={item}
          className={`mt-6 max-w-2xl ${FONTS.bodyLg} ${COLORS.textMuted}`}
        >
          {project.summary}
        </motion.p>

        {/* ── Rule ─────────────────────────────────────────── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.65, ease: EASE.out }}
          className="mt-10 h-px origin-start bg-border"
        />
      </motion.div>

      {/* ── Meta + action bar ────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-5xl px-6 py-8 md:px-10"
      >
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Data trio */}
          <dl className="flex flex-wrap items-center gap-8">
            <MetaItem label={t.project.year}     value={project.year} />
            <MetaItem label={t.project.role}     value={project.role} />
            <MetaItem label={t.project.category} value={project.category} />
          </dl>

          {/* Action buttons */}
          <motion.div variants={item} className="flex items-center gap-3">
            {/* GitHub profile — always shown */}
            <a
              href="https://github.com/Mostafa-SAID7"
              target="_blank"
              rel="noopener noreferrer"
              className={`group ${COMPONENTS.buttonSecondary}`}
            >
              <Github className="size-4" />
              View Source
              <ExternalLink className="size-3 opacity-50 transition group-hover:opacity-100" />
            </a>

            {/* Contact / Hire — secondary CTA */}
            <a
              href="https://wa.me/201067358073?text=Hi%20Mostafa%2C%20I%27m%20interested%20in%20hiring%20you"
              target="_blank"
              rel="noopener noreferrer"
              className={`group ${COMPONENTS.buttonPrimary}`}
            >
              Hire me
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        <div className="mt-8 h-px bg-border/40" />
      </motion.div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <article className="mx-auto max-w-5xl px-6 pb-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            {/* Decorative index */}
            <motion.p
              {...ANIMATIONS.fadeIn}
              className={`sticky top-28 ${FONTS.displayXl} ${COLORS.textMuted} opacity-20 select-none leading-none`}
              aria-hidden
            >
              01
            </motion.p>
          </div>
          <motion.div
            className="md:col-span-9"
            {...ANIMATIONS.fadeIn}
            transition={{ ...ANIMATIONS.fadeIn.transition, delay: 0.1 }}
          >
            <p className={`${FONTS.bodyLg} text-foreground/85 leading-[1.85]`}>
              {project.body}
            </p>
          </motion.div>
        </div>

        {/* Thumbnail */}
        <motion.div
          {...ANIMATIONS.fadeIn}
          transition={{ ...ANIMATIONS.fadeIn.transition, delay: 0.15 }}
          className="mt-20"
        >
          <ProjectThumbnail
            name={project.name}
            category={project.category}
            slug={project.slug}
            className="aspect-[16/9] w-full rounded-2xl overflow-hidden"
          />
        </motion.div>

        {/* ── Related projects ─────────────────────────────── */}
        {related.length > 0 && (
          <div className="mt-24 border-t border-border/40 pt-16">
            <motion.div {...ANIMATIONS.fadeIn}>
              <p className={`${FONTS.labelXs} ${COLORS.textMuted}`}>
                More in {project.category}
              </p>
              <h2 className={`mt-2 ${FONTS.displayMd}`}>Related work</h2>
            </motion.div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((rel, i) => (
                <motion.div
                  key={rel.slug}
                  {...ANIMATIONS.cardIn}
                  transition={{ ...ANIMATIONS.cardIn.transition, delay: i * 0.08 }}
                >
                  <Link
                    to="/projects/$slug"
                    params={{ slug: rel.slug }}
                    className="group block rounded-2xl border border-border/40 bg-card/20 overflow-hidden transition hover:border-border hover:bg-card/50"
                  >
                    {/* Mini thumbnail */}
                    <div className="aspect-[16/9] overflow-hidden">
                      <ProjectThumbnail
                        name={rel.name}
                        category={rel.category}
                        slug={rel.slug}
                        className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Card text */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`inline-flex rounded-full border border-border/50 px-2.5 py-0.5 ${FONTS.labelXs} ${COLORS.textMuted}`}
                        >
                          {rel.category}
                        </span>
                        <span className={`${FONTS.labelXs} ${COLORS.textMuted}`}>{rel.year}</span>
                      </div>
                      <p className={`${FONTS.displayXs} leading-snug`}>{rel.name}</p>
                      <p className={`line-clamp-2 ${FONTS.bodyXs} ${COLORS.textMuted}`}>
                        {rel.summary}
                      </p>
                      <div
                        className={`flex items-center gap-1 pt-1 ${FONTS.labelXs} ${COLORS.textMuted} transition group-hover:text-foreground`}
                      >
                        View case
                        <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ── Bottom nav ───────────────────────────────────── */}
        <div className="mt-20 flex items-center justify-between border-t border-border/40 pt-10">
          <Link
            to="/"
            hash="projects"
            className={`group inline-flex items-center gap-2 ${FONTS.labelXs} ${COLORS.textMuted} transition hover:text-foreground`}
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            All work
          </Link>
          <p className={`${FONTS.displayXs} leading-none select-none`} aria-hidden>✦</p>
          <a
            href="/#contact"
            className={`group inline-flex items-center gap-2 ${FONTS.labelXs} ${COLORS.textMuted} transition hover:text-foreground`}
          >
            Get in touch
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </article>

      <Footer />
    </>
  );
}

/* ── Inline meta item ──────────────────────────────────────── */
function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className={`${FONTS.labelXs} ${COLORS.textMuted}`}>{label}</dt>
      <dd className={`mt-1 ${FONTS.displayXs}`}>{value}</dd>
    </div>
  );
}

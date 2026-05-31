import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useT } from "@/i18n/useT";
import { en } from "@/i18n/dictionaries";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const exists = en.projects.items.some((p) => p.slug === params.slug);
    if (!exists) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const project = en.projects.items.find((p) => p.slug === params.slug);
    const title = project ? `${project.name} — Your Name` : "Project — Your Name";
    const description = project?.summary ?? "Selected project.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/projects/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/projects/${params.slug}` }],
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
                creator: { "@type": "Person", name: "Your Name" },
              }),
            },
          ]
        : [],
    };
  },
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="flex min-h-dvh items-center justify-center">
      <p className="text-muted-foreground">Project not found.</p>
    </div>
  ),
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const t = useT();
  const project = t.projects.items.find((p) => p.slug === slug);
  if (!project) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-6">
        <p className="text-muted-foreground">{t.project.notFound}</p>
      </div>
    );
  }
  return (
    <>
      <Header />
      <article className="mx-auto max-w-5xl px-6 pt-40 pb-24 md:px-10">
        <Link
          to="/"
          hash="projects"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-3.5 rtl:rotate-180" />
          {t.project.back}
        </Link>
        <p className="mt-10 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {project.category}
        </p>
        <h1 className="mt-6 font-display text-[clamp(3rem,10vw,9rem)] leading-[0.95] tracking-tight">
          {project.name}
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        <dl className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border md:grid-cols-3">
          <Meta label={t.project.year} value={project.year} />
          <Meta label={t.project.role} value={project.role} />
          <Meta label={t.project.category} value={project.category} />
        </dl>
        <div className="mt-20 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3" />
          <p className="text-lg leading-relaxed text-foreground/85 md:col-span-9 md:text-xl">
            {project.body}
          </p>
        </div>
        <div className="mt-20 aspect-[16/9] rounded-2xl border border-border bg-card" />
      </article>
      <Footer />
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card p-6">
      <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-2 font-display text-2xl">{value}</dd>
    </div>
  );
}
import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useT } from "@/i18n/useT";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const InkParticles = lazy(() => import("../three/InkParticles"));

export function Hero() {
  const t = useT();
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-dvh flex-col justify-between overflow-hidden px-6 pt-32 pb-10 md:px-10"
    >
      {!reduced && (
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
          <Suspense fallback={null}>
            <InkParticles />
          </Suspense>
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-background to-transparent" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          {t.hero.eyebrow}
        </motion.p>

        <h1 className="mt-8 font-display text-[clamp(3rem,11vw,11rem)] leading-[0.95] tracking-tight">
          {t.hero.title.map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          {t.hero.lede}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:bg-foreground/90"
          >
            {t.hero.cta}
            <ArrowRight className="size-4 transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-6 text-sm font-medium transition hover:bg-foreground hover:text-background"
          >
            {t.hero.ctaSecondary}
          </a>
        </motion.div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl items-end justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {t.hero.location}
        </p>
        <ArrowDown className="size-4 animate-bounce text-muted-foreground" aria-hidden />
      </div>
    </section>
  );
}
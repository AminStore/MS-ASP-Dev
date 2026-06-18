import { Suspense, lazy, useRef, Component, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

/* Silently swallows Three.js / fiber load errors so particles are purely
   decorative — if the canvas fails for any reason the rest of the hero
   renders normally without crashing the app. */
class ThreeErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
import { ArrowRight, Download, MapPin } from "lucide-react";
import { useT } from "@/i18n/useT";
import { FONTS, COLORS, COMPONENTS, EASE } from "@/styles/theme";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const InkParticles = lazy(() => import("../three/InkParticles"));

/* ── Tech stack chips ──────────────────────────────────────── */
const STACK = [
  ".NET 8",
  "ASP.NET Core",
  "C#",
  "React",
  "TypeScript",
  "SQL Server",
];

/* ── Headline stagger animation variants ───────────────────── */
const headlineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.45 } },
};
const headlineLine = {
  hidden:   { y: "110%", opacity: 0 },
  visible:  { y: "0%",   opacity: 1, transition: { duration: 0.75, ease: EASE.out } },
};

/* ── Staggered chip variants ───────────────────────────────── */
const chipContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 1.1 } },
};
const chipItem = {
  hidden:  { opacity: 0, scale: 0.82, y: 8 },
  visible: { opacity: 1, scale: 1,    y: 0, transition: { duration: 0.35, ease: EASE.out } },
};

export function Hero() {
  const t = useT();
  const reduced = useReducedMotion();

  /* ── Photo 3-D tilt ──────────────────────────────────────── */
  const photoRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 140, damping: 18 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 140, damping: 18 });

  function handleMouseMove(e: React.MouseEvent) {
    if (reduced) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      id="top"
      className="relative isolate flex min-h-dvh flex-col justify-between overflow-hidden px-6 pt-28 pb-8 md:px-10"
    >
      {/* Three.js background */}
      {!reduced && (
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
          <ThreeErrorBoundary>
            <Suspense fallback={null}>
              <InkParticles />
            </Suspense>
          </ThreeErrorBoundary>
        </div>
      )}
      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-background via-background/60 to-transparent" />

      {/* ── Top eyebrow bar ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE.out }}
        className="mx-auto flex w-full max-w-7xl items-center justify-between"
      >
        <p className={`${FONTS.labelXs} ${COLORS.textMuted}`}>
          — {t.hero.eyebrow}
        </p>
        {/* Available badge */}
        <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 backdrop-blur-sm">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-green-400" />
          </span>
          <span className={`${FONTS.labelXs} text-green-600 dark:text-green-400`}>
            Available for work
          </span>
        </div>
      </motion.div>

      {/* ── Main content ────────────────────────────────────── */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center">
        <div className="grid w-full gap-10 md:grid-cols-12 md:gap-16 lg:gap-20">

          {/* ── Left: Photo column ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: EASE.out }}
            className="flex flex-col gap-4 md:col-span-5"
          >
            {/* Photo with 3-D tilt */}
            <motion.div
              ref={photoRef}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-card/40 cursor-default"
            >
              <img
                src="/MS.jpg"
                alt="Mostafa Samir — Full-Stack .NET & React Developer"
                width={600}
                height={750}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-25"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 px-8 text-center">
                <p className={`${FONTS.displaySm} ${COLORS.textBase}`}>
                  Pragmatic systems,
                  <br />shipped on ASP.NET Core.
                </p>
                <div className={`h-px w-12 bg-foreground/30`} />
                <p className={`${FONTS.bodyXs} ${COLORS.textMuted}`}>
                  Clean Architecture · EF Core · SQL Server
                </p>
              </div>
              {/* Subtle grain overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                }}
              />
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: EASE.out }}
              className="flex gap-3"
            >
              <a
                href="https://wa.me/201067358073?text=Hi%20Mostafa%2C%20I%27m%20interested%20in%20hiring%20you"
                target="_blank"
                rel="noopener noreferrer"
                className={`${COMPONENTS.buttonPrimary} flex-1 justify-center`}
              >
                Hire me
              </a>
              <a
                href="/resume.pdf"
                download
                className={`${COMPONENTS.buttonSecondary} flex-1 justify-center`}
              >
                <Download className="size-3.5" />
                Resume
              </a>
            </motion.div>

            {/* Mini stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex items-center gap-4 border-t border-border/40 pt-4"
            >
              {[
                { value: "4+", label: "Years" },
                { value: "35+", label: "Projects" },
                { value: "Senior", label: "Level" },
              ].map(({ value, label }) => (
                <div key={label} className="flex-1 text-center">
                  <p className={`${FONTS.displayXs} leading-tight`}>{value}</p>
                  <p className={`mt-0.5 ${FONTS.labelXs} ${COLORS.textMuted}`}>{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Text column ──────────────────────────── */}
          <div className="flex flex-col justify-center gap-8 md:col-span-7 lg:ps-4">

            {/* Divider line — draws in */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE.out }}
              className="h-px w-full origin-start bg-border/60"
            />

            {/* Headline — each line slides up from below its overflow container */}
            <motion.div
              variants={headlineContainer}
              initial="hidden"
              animate="visible"
              className="space-y-1"
            >
              {t.hero.title.map((line: string, i: number) => (
                <div key={i} className="overflow-hidden">
                  <motion.p
                    variants={headlineLine}
                    className={`${FONTS.displayHero} ${COLORS.textBase}`}
                  >
                    {line}
                  </motion.p>
                </div>
              ))}
            </motion.div>

            {/* Lede */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85, ease: EASE.out }}
              className={`max-w-lg ${FONTS.bodyLg} ${COLORS.textMuted}`}
            >
              {t.hero.lede}
            </motion.p>

            {/* Tech stack chips — staggered */}
            <motion.div
              variants={chipContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2"
            >
              {STACK.map((tech) => (
                <motion.span
                  key={tech}
                  variants={chipItem}
                  className={`inline-flex items-center rounded-full border border-border/60 bg-card/40 px-3 py-1 ${FONTS.labelXs} ${COLORS.textMuted} backdrop-blur-sm`}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Primary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.25, ease: EASE.out }}
              className="flex flex-wrap items-center gap-4"
            >
              <a href="/#projects" className={`group ${COMPONENTS.buttonPrimary}`}>
                {t.hero.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </a>
              <a href="/#contact" className={COMPONENTS.buttonSecondary}>
                {t.hero.ctaSecondary}
              </a>
            </motion.div>

            {/* Divider line — draws in (closing) */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 1.4, ease: EASE.out }}
              className="h-px w-full origin-end bg-border/60"
            />
          </div>
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="mx-auto flex w-full max-w-7xl items-end justify-between"
      >
        <div className={`flex items-center gap-2 ${FONTS.labelXs} ${COLORS.textMuted}`}>
          <MapPin className="size-3" />
          {t.hero.location}
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2">
          <span className={`${FONTS.labelXs} ${COLORS.textMuted}`}>scroll</span>
          <div className="relative h-10 w-px overflow-hidden rounded-full bg-border">
            <motion.div
              className="absolute top-0 h-4 w-full bg-foreground/60 rounded-full"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.3 }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

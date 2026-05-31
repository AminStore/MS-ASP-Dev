import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { useT } from "@/i18n/useT";
import { ThemeToggle, LocaleToggle } from "./Toggles";

const SECTIONS = ["about", "skills", "projects", "experience", "education", "contact"] as const;

export function Header() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/40 bg-background/80 backdrop-blur-md"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 md:px-10">
        <a
          href="#top"
          className="font-display text-2xl leading-none tracking-tight"
          aria-label="Home"
        >
          ✦
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="group relative text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition hover:text-foreground"
            >
              {t.nav[id]}
              <span className="absolute -bottom-1 start-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="/resume.pdf"
            download
            className="inline-flex h-10 items-center gap-2 rounded-full border border-foreground bg-foreground px-4 text-xs font-medium uppercase tracking-[0.18em] text-background transition hover:bg-transparent hover:text-foreground"
          >
            <Download className="size-3.5" />
            {t.nav.resume}
          </a>
          <LocaleToggle />
          <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-full border border-border/60 md:hidden"
          aria-label={t.nav.menu}
          aria-expanded={open}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 top-[64px] z-40 flex flex-col gap-2 bg-background px-6 py-8 md:hidden">
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className="border-b border-border/40 py-4 font-display text-3xl"
            >
              {t.nav[id]}
            </a>
          ))}
          <div className="mt-6 flex items-center gap-2">
            <a
              href="/resume.pdf"
              download
              className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-foreground bg-foreground px-4 text-xs font-medium uppercase tracking-[0.18em] text-background"
            >
              <Download className="size-3.5" />
              {t.nav.resume}
            </a>
            <LocaleToggle />
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
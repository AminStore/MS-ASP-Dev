import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useT } from "@/i18n/useT";
import { ThemeToggle, LocaleToggle } from "./Toggles";

export function Footer() {
  const t = useT();
  return (
    <footer className="border-t border-border/40 mt-32">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display text-4xl leading-tight md:text-5xl">
              Let's build<br />something quiet.
            </p>
            <a
              href="mailto:hello@example.com"
              className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <Mail className="size-4" />
              hello@example.com
            </a>
          </div>
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Colophon
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t.footer.colophon}
            </p>
          </div>
          <div className="flex flex-col gap-4 md:col-span-2 md:items-end">
            <div className="flex items-center gap-3">
              <a href="#" aria-label="GitHub" className="text-muted-foreground transition hover:text-foreground">
                <Github className="size-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-muted-foreground transition hover:text-foreground">
                <Linkedin className="size-4" />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground transition hover:text-foreground">
                <Twitter className="size-4" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <LocaleToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border/40 pt-6 text-xs text-muted-foreground">
          <p>{t.footer.rights}</p>
          <p className="font-display text-base">✦</p>
        </div>
      </div>
    </footer>
  );
}
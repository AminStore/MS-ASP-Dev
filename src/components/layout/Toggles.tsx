import { useEffect, useState } from "react";
import { Moon, Sun, Languages } from "lucide-react";
import { usePreferences } from "@/store/preferences";
import { useT } from "@/i18n/useT";
import { COMPONENTS, FONTS } from "@/styles/theme";

export function ThemeToggle() {
  const theme = usePreferences((s) => s.theme);
  const toggle = usePreferences((s) => s.toggleTheme);
  const t = useT();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.toggle.theme}
      className={COMPONENTS.toggleButton}
    >
      {mounted ? (
        theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />
      ) : (
        <span className="size-4" aria-hidden />
      )}
    </button>
  );
}

export function LocaleToggle() {
  const locale = usePreferences((s) => s.locale);
  const toggle = usePreferences((s) => s.toggleLocale);
  const t = useT();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.toggle.locale}
      className={`${COMPONENTS.toggleButton} gap-2 px-4 w-auto ${FONTS.labelXs}`}
    >
      <Languages className="size-3.5" />
      <span suppressHydrationWarning>{mounted ? (locale === "en" ? "ع" : "EN") : "ع"}</span>
    </button>
  );
}

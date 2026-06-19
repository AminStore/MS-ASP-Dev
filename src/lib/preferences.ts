/**
 * Preferences Initialization
 * Consolidates theme and locale initialization to prevent flashing
 * and duplication across theme.ts, locale.ts, and store initialization
 */

export type Theme = "light" | "dark";
export type Locale = "en" | "ar";

/**
 * Initialize theme from localStorage or system preference
 * Runs before first paint to prevent flash
 */
export const initializeTheme = (): void => {
  try {
    const stored = localStorage.getItem("theme");
    const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored === "dark" || (!stored && prefersDark);
    document.documentElement.classList.toggle("dark", isDark);
  } catch {
    // localStorage may be blocked (e.g., private mode with strict settings)
  }
};

/**
 * Initialize locale and text direction from localStorage
 * Runs before first paint to prevent layout shift
 */
export const initializeLocale = (): void => {
  try {
    const locale = localStorage.getItem("locale") || "en";
    document.documentElement.setAttribute("lang", locale);
    document.documentElement.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
  } catch {
    // localStorage may be blocked (e.g., private mode with strict settings)
  }
};

/**
 * Apply both theme and locale to document and persist to localStorage
 * Used by the preferences store for runtime updates
 */
export const applyPreferencesToDocument = (
  theme: Theme,
  locale: Locale
): void => {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  // Apply theme
  root.classList.toggle("dark", theme === "dark");

  // Apply locale and direction
  root.setAttribute("lang", locale);
  root.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");

  // Persist to localStorage
  try {
    localStorage.setItem("theme", theme);
    localStorage.setItem("locale", locale);
  } catch {
    /* ignore - localStorage may be blocked */
  }
};

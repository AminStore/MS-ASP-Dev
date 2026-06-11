import { create } from "zustand";
import { useEffect } from "react";

export type Theme = "light" | "dark";
export type Locale = "en" | "ar";

type State = {
  theme: Theme;
  locale: Locale;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
};

function applyToDocument(theme: Theme, locale: Locale) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.setAttribute("lang", locale);
  root.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
  try {
    localStorage.setItem("theme", theme);
    localStorage.setItem("locale", locale);
  } catch {
    /* ignore */
  }
}

export const usePreferences = create<State>((set, get) => ({
  theme: "light",
  locale: "en",
  setTheme: (theme) => {
    set({ theme });
    applyToDocument(theme, get().locale);
  },
  toggleTheme: () => get().setTheme(get().theme === "dark" ? "light" : "dark"),
  setLocale: (locale) => {
    set({ locale });
    applyToDocument(get().theme, locale);
  },
  toggleLocale: () => get().setLocale(get().locale === "en" ? "ar" : "en"),
}));

/**
 * Hydrate the preferences store from the actual document/localStorage
 * after mount. Keeps SSR markup deterministic (light/en) so React 19 does
 * not throw a hydration mismatch when the inline prefs script has already
 * flipped <html> to dark or rtl.
 */
export function useHydratePreferences() {
  useEffect(() => {
    const root = document.documentElement;
    const theme: Theme = root.classList.contains("dark") ? "dark" : "light";
    const locale: Locale = root.getAttribute("dir") === "rtl" ? "ar" : "en";
    usePreferences.setState({ theme, locale });
  }, []);
}
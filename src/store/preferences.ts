import { create } from "zustand";
import { useEffect } from "react";
import {
  type Theme,
  type Locale,
  applyPreferencesToDocument,
} from "../lib/preferences";

type State = {
  theme: Theme;
  locale: Locale;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
};

export const usePreferences = create<State>((set, get) => ({
  theme: "light",
  locale: "en",
  setTheme: (theme) => {
    set({ theme });
    applyPreferencesToDocument(theme, get().locale);
  },
  toggleTheme: () => get().setTheme(get().theme === "dark" ? "light" : "dark"),
  setLocale: (locale) => {
    set({ locale });
    applyPreferencesToDocument(get().theme, locale);
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
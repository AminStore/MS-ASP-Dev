/**
 * Locale Initialization
 * Applies locale and direction before first paint
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

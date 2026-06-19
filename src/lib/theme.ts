/**
 * Theme Initialization
 * Applies theme before first paint to prevent flash
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

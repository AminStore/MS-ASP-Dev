/**
 * Centralized theme styles configuration
 * Eliminates duplication and ensures consistency across all components
 */

export const SPACING = {
  section: "px-6 py-20 md:px-10 md:py-32",
  cardPadding: "p-6 md:p-8",
  gap: "gap-6",
  largeGap: "gap-8",
  smallGap: "gap-3",
} as const;

export const BORDERS = {
  roundedLg: "rounded-lg",
  roundedXl: "rounded-xl",
  rounded2xl: "rounded-2xl",
  borderBase: "border border-border",
  borderTransparent: "border border-border/40",
} as const;

export const FONTS = {
  // Heading/Display sizes with Jim Nightshade font - optimized for readability
  displayXl: "font-title text-6xl md:text-7xl leading-tight",
  displayLg: "font-title text-4xl md:text-5xl leading-tight",
  displayMd: "font-title text-3xl md:text-4xl leading-tight",
  displaySm: "font-title text-2xl md:text-3xl leading-snug",
  displayXs: "font-title text-xl md:text-2xl leading-snug",
  
  // Body text sizes - optimized for readability
  bodyXl: "text-xl md:text-2xl leading-relaxed",
  bodyLg: "text-lg md:text-xl leading-relaxed",
  bodyMd: "text-base md:text-lg leading-relaxed",
  bodySm: "text-sm md:text-base leading-relaxed",
  bodyXs: "text-xs md:text-sm",
  
  // Labels & captions
  labelLg: "text-sm md:text-base uppercase tracking-[0.2em] font-semibold",
  labelMd: "text-sm uppercase tracking-[0.18em] font-medium",
  labelSm: "text-xs uppercase tracking-[0.2em] font-medium",
  labelXs: "text-xs uppercase tracking-[0.2em]",
  caption: "text-xs md:text-sm text-muted-foreground",
  
  // Input/Form sizes
  inputLg: "text-lg",
  inputMd: "text-base",
  
  // Button text
  buttonSm: "text-xs md:text-sm font-semibold uppercase tracking-[0.18em]",
  buttonMd: "text-sm font-semibold",
} as const;

export const COLORS = {
  // Text colors
  textBase: "text-foreground",
  textMuted: "text-muted-foreground",
  textXsLabel: "text-xs uppercase tracking-[0.2em]",
  textSmLabel: "text-sm uppercase tracking-[0.18em]",
  
  // Background colors
  bgCard: "bg-card/50",
  bgCardLight: "bg-card/20",
  bgCardHover: "hover:bg-card/30",
  
  // Hover states (consistent across all)
  hoverState: "hover:bg-foreground hover:text-background hover:border-foreground hover:shadow-lg hover:shadow-foreground/20",
} as const;

export const ANIMATIONS = {
  cardIn: {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5 },
  },
  fadeIn: {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.3 },
  },
} as const;

export const GRIDS = {
  // Layout grids
  sectionLayout: "grid gap-12 md:grid-cols-12",
  mainContent: "grid gap-6 md:grid-cols-12",
  
  // Card grids
  cardGrid1Col: "grid gap-4 md:grid-cols-12",
  cardGrid3Col: "grid gap-px overflow-hidden md:grid-cols-3",
} as const;

export const COMPONENTS = {
  // Badge/Pill styles
  badge: `inline-flex ${BORDERS.roundedXl} ${BORDERS.borderTransparent} ${COLORS.bgCard} px-4 py-2.5 ${FONTS.buttonSm} ${COLORS.textBase} transition ${COLORS.hoverState}`,
  
  // Card styles
  card: `rounded-lg border border-border/40 bg-card/30 p-6 md:p-8 transition hover:border-border/80 hover:bg-card/30`,
  
  // Button styles
  buttonPrimary: `inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 ${FONTS.buttonSm} text-background transition hover:bg-foreground/90`,
  buttonSecondary: `inline-flex h-12 items-center gap-2 rounded-full border border-border px-6 ${FONTS.buttonSm} transition hover:bg-foreground hover:text-background`,
  
  // Form styles
  formLabel: `${FONTS.labelXs} ${COLORS.textMuted}`,
  formInput: `w-full ${BORDERS.roundedLg} border border-border bg-background/80 px-4 py-3 ${FONTS.inputLg} outline-none transition focus:border-foreground focus:bg-background`,
  formError: `mt-1 block ${FONTS.bodyXs} text-destructive`,
} as const;

/**
 * Helper function to combine style classes
 */
export const cn = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

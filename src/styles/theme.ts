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
  // Heading/Display sizes
  displayXl: "font-display text-5xl md:text-6xl",
  displayLg: "font-display text-4xl md:text-5xl",
  displayMd: "font-display text-3xl md:text-4xl",
  displaySm: "font-display text-2xl md:text-3xl",
  displayXs: "font-display text-xl md:text-2xl",
  
  // Body text sizes
  bodyXl: "text-xl md:text-2xl",
  bodyLg: "text-lg md:text-xl leading-relaxed",
  bodyMd: "text-base leading-relaxed",
  bodySm: "text-sm leading-relaxed",
  bodyXs: "text-xs",
  
  // Labels & captions
  labelXs: "text-xs uppercase tracking-[0.2em]",
  labelSm: "text-sm uppercase tracking-[0.18em]",
  caption: "text-xs text-muted-foreground",
  
  // Input/Form sizes
  inputLg: "text-lg",
  inputMd: "text-base",
  
  // Button text
  buttonSm: "text-xs font-medium uppercase tracking-[0.18em]",
  buttonMd: "text-sm font-medium",
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

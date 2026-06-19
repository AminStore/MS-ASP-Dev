/**
 * UI Translations - Navigation, Meta, Footer, Toggle
 * Centralized UI labels and metadata
 */

export { navEN, navAR } from "./nav";
export { metaEN, metaAR } from "./meta";
export { footerEN, footerAR } from "./footer";
export { toggleEN, toggleAR } from "./toggle";

// Combined exports for convenience
import { navEN, navAR } from "./nav";
import { metaEN, metaAR } from "./meta";
import { footerEN, footerAR } from "./footer";
import { toggleEN, toggleAR } from "./toggle";

export const uiEN = {
  nav: navEN,
  meta: metaEN,
  footer: footerEN,
  toggle: toggleEN,
};

export const uiAR = {
  nav: navAR,
  meta: metaAR,
  footer: footerAR,
  toggle: toggleAR,
};

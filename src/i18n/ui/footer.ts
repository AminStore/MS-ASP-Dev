/**
 * Footer Content
 * Used in Footer.tsx - brand tagline and credits
 */

const currentYear = new Date().getFullYear();

// Helper function to convert Western numerals to Arabic numerals
const toArabicNumerals = (num: number): string => {
  return num.toString().replace(/\d/g, (digit) => {
    const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return arabicDigits[parseInt(digit)];
  });
};

export const footerEN = {
  tagline: "Let's build\nsomething quiet.",
  colophonLabel: "Colophon",
  colophon: "Set in Jim Nightshade & Italianno · Tajawal for Arabic. Frontend built with React 19 and Vite. APIs in this portfolio are mocked — the real ones run on ASP.NET Core 8.",
  rights: `© ${currentYear} — All rights reserved.`,
};

export const footerAR = {
  tagline: "لنبني\nشيئاً هادئاً.",
  colophonLabel: "ملاحظات",
  colophon: "بخطّ ‎Jim Nightshade‎ و ‎Italianno‎ · و ‎Tajawal‎ للعربية. الواجهة مبنيّة بـ ‎React 19‎ و ‎Vite‎. الواجهات الحقيقية تعمل على ‎ASP.NET Core 8‎.",
  rights: `© ${toArabicNumerals(currentYear)} — جميع الحقوق محفوظة.`,
};

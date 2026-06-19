import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { COMPONENTS, EASE } from "@/styles/theme";

interface HeroCTAProps {
  hireMe: string;
  resume: string;
  cta: string;
  ctaSecondary: string;
  whatsappUrl: string;
}

export function HeroCTA({
  hireMe,
  resume,
  cta,
  ctaSecondary,
  whatsappUrl,
}: HeroCTAProps) {
  return (
    <>
      {/* Left CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: EASE.out }}
        className="flex gap-3"
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${COMPONENTS.buttonPrimary} flex-1 justify-center`}
        >
          {hireMe}
        </a>
        <a
          href="/resume.pdf"
          download
          className={`${COMPONENTS.buttonSecondary} flex-1 justify-center`}
        >
          <Download className="size-3.5" />
          {resume}
        </a>
      </motion.div>

      {/* Primary CTAs - bottom right */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.25, ease: EASE.out }}
        className="flex flex-wrap items-center gap-4"
      >
        <a href="/#projects" className={`group ${COMPONENTS.buttonPrimary}`}>
          {cta}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </a>
        <a href="/#contact" className={COMPONENTS.buttonSecondary}>
          {ctaSecondary}
        </a>
      </motion.div>
    </>
  );
}

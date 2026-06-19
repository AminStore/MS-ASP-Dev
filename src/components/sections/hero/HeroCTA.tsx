import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { COMPONENTS, EASE } from "@/styles/theme";

interface HeroCTAProps {
  hireMe: string;
  resume: string;
  whatsappUrl: string;
}

export function HeroCTA({
  hireMe,
  resume,
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


    </>
  );
}

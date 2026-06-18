import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

/**
 * VITE_SITE_URL — set this env variable to the deployed origin, e.g.
 *   VITE_SITE_URL=https://mostafa-samir.replit.app
 * When unset the canonical falls back to a relative "/" (still valid, just
 * not as helpful for multi-domain deduplication).
 */
const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined) ?? "";

const TITLE = "Mostafa Samir — Full-Stack .NET & React Developer";
const DESCRIPTION =
  "Full-Stack Software Developer with 4+ years building secure, scalable .NET 8 and React/TypeScript applications. Based in Tanta, Egypt — working globally.";
const CANONICAL = `${SITE_URL}/`;
const OG_IMAGE = `${SITE_URL}/MS.jpg`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "Mostafa Samir, Full-Stack Developer, .NET 8, ASP.NET Core, C#, React, TypeScript, SQL Server, Microservices, Egypt" },
      // Open Graph
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:alt", content: "Mostafa Samir — Full-Stack Developer" },
      { property: "og:image:width", content: "800" },
      { property: "og:image:height", content: "1000" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Mostafa Samir",
          jobTitle: "Full-Stack Software Developer",
          description: DESCRIPTION,
          url: CANONICAL,
          email: "m.ssaid356@gmail.com",
          telephone: "+201067358073",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Tanta",
            addressCountry: "EG",
          },
          knowsAbout: [
            ".NET 8",
            "ASP.NET Core",
            "C#",
            "React",
            "TypeScript",
            "SQL Server",
            "Microservices",
          ],
          sameAs: [
            "https://github.com/Mostafa-SAID7",
            "https://www.linkedin.com/in/mostafasamirsaid",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}

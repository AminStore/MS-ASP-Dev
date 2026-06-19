import { useT } from "@/i18n/useT";
import {
  HeroHeader,
  HeroPhoto,
  HeroColumn,
  HeroCTA,
  HeroStats,
  HeroDivider,
  HeroHeadline,
  HeroLede,
  HeroStack,
  HeroFooter,
} from "./hero/index";

export function Hero() {
  const t = useT();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-dvh flex-col justify-between overflow-hidden px-6 pt-28 pb-8 md:px-10"
    >
      {/* Header with eyebrow and availability badge */}
      <HeroHeader eyebrow={t.hero.eyebrow} availableText={t.hero.availableText} />

      {/* Main content */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center">
        <div className="grid w-full gap-10 md:grid-cols-12 md:gap-16 lg:gap-20">
          {/* Left column: Photo + CTAs + Stats */}
          <HeroColumn side="left" delay={0.2}>
            <HeroPhoto
              photoAlt={t.hero.photoAlt}
              hoverTitle={t.hero.hoverTitle}
              hoverSubtitle={t.hero.hoverSubtitle}
            />
            <HeroCTA
              hireMe={t.hero.hireMe}
              resume={t.hero.resume}
              cta={t.hero.cta}
              ctaSecondary={t.hero.ctaSecondary}
              whatsappUrl={t.hero.whatsappUrl}
            />
            <HeroStats stats={t.hero.stats} />
          </HeroColumn>

          {/* Right column: Text content */}
          <HeroColumn side="right" delay={0} colSpan={7}>
            <HeroDivider delay={0.3} />
            <HeroHeadline lines={t.hero.title} />
            <HeroLede text={t.hero.lede} />
            <HeroStack techs={t.hero.stack} />
            <HeroCTA
              hireMe={t.hero.hireMe}
              resume={t.hero.resume}
              cta={t.hero.cta}
              ctaSecondary={t.hero.ctaSecondary}
              whatsappUrl={t.hero.whatsappUrl}
            />
            <HeroDivider delay={1.4} originSide="end" />
          </HeroColumn>
        </div>
      </div>

      {/* Footer with location and scroll indicator */}
      <HeroFooter location={t.hero.location} scrollText={t.hero.scrollText} />
    </section>
  );
}

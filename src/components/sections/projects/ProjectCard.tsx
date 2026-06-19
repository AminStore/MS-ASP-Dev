import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ANIMATIONS, BORDERS, COLORS, FONTS, COMPONENTS } from "@/styles/theme";
import { ProjectThumbnail } from "@/components/ui/ProjectThumbnail";
import { Project } from "./types";

interface ProjectCardProps extends Omit<Project, "role" | "body"> {
  delay?: number;
}

export function ProjectCard({
  slug,
  category,
  name,
  summary,
  year,
  imageUrl,
  tags,
  delay = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      {...ANIMATIONS.cardIn}
      transition={{ ...ANIMATIONS.cardIn.transition, delay }}
    >
      <Link
        to="/projects/$slug"
        params={{ slug }}
        className={`group flex flex-col overflow-hidden ${BORDERS.roundedXl} border border-border/50 bg-card/40 hover:bg-card/80 transition-colors duration-300`}
      >
        {/* Thumbnail */}
        <ProjectThumbnail
          name={name}
          category={category}
          slug={slug}
          imageUrl={imageUrl || undefined}
          className="aspect-[16/9] w-full"
        />

        {/* Card body */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          {/* Category + year row */}
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex rounded-full border border-border/50 bg-background/60 px-2.5 py-0.5 ${FONTS.labelXs} ${COLORS.textMuted}`}
            >
              {category}
            </span>
            <span className={`${FONTS.labelXs} ${COLORS.textMuted}`}>{year}</span>
          </div>

          {/* Name */}
          <h3
            className={`${FONTS.displaySm} leading-tight transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5`}
          >
            {name}
          </h3>

          {/* Technology tags */}
          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex rounded-full border border-border/40 bg-background/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="inline-flex rounded-full border border-border/40 bg-background/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Summary */}
          <p className={`line-clamp-2 flex-1 ${FONTS.bodyXs} ${COLORS.textMuted}`}>
            {summary}
          </p>

          {/* Footer link */}
          <div
            className={`mt-1 flex items-center gap-1 ${FONTS.labelXs} ${COLORS.textMuted} transition group-hover:${COLORS.textBase}`}
          >
            View project
            <ArrowUpRight className="size-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

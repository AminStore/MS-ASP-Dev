import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view as the user scrolls.
 * Uses IntersectionObserver with a rootMargin that triggers when a
 * section enters the middle band of the viewport (not too early, not too late).
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        {
          // Fire when section is between the top 15% and bottom 55% of viewport
          rootMargin: "-15% 0px -55% 0px",
          threshold: 0,
        }
      );
      obs.observe(el);
      observers.push(obs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);

  return active;
}

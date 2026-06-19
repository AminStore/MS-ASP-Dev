import { COMPONENTS } from "@/styles/theme";

interface ProjectFilterProps {
  pills: string[];
  active: string;
  onChange: (pill: string) => void;
}

export function ProjectFilter({ pills, active, onChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
      {pills.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className={`${COMPONENTS.filterPill} ${
            active === c ? COMPONENTS.filterPillActive : COMPONENTS.filterPillInactive
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

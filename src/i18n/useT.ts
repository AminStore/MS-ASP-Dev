import { usePreferences } from "@/store/preferences";
import { dictionaries, type Dictionary } from "./dictionaries";

export function useT(): Dictionary {
  const locale = usePreferences((s) => s.locale);
  return dictionaries[locale];
}
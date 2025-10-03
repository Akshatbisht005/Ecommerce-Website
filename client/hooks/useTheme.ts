import { useEffect, useState } from "react";

export type ThemeName = "default" | "ocean" | "noir" | "blush" | "dark";
const STORAGE_KEY = "ablis-theme";

export function useTheme() {
  const [theme, setTheme] = useState<ThemeName>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
    return saved ?? "default";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-ocean", "theme-noir", "theme-blush", "dark");
    switch (theme) {
      case "ocean":
        root.classList.add("theme-ocean");
        break;
      case "noir":
        root.classList.add("theme-noir");
        break;
      case "blush":
        root.classList.add("theme-blush");
        break;
      case "dark":
        root.classList.add("dark");
        break;
      default:
        break;
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return { theme, setTheme } as const;
}

import { Palette } from "lucide-react";
import { useTheme, ThemeName } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";

const order: ThemeName[] = ["default", "ocean", "noir", "blush", "dark"];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const idx = order.indexOf(theme);
  const next = order[(idx + 1) % order.length];

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      aria-label={`Theme: ${theme}. Click to switch to ${next}`}
      title={`Theme: ${theme}. Click to switch to ${next}`}
      onClick={() => setTheme(next)}
      className="rounded-full"
    >
      <Palette className="size-5" />
    </Button>
  );
}

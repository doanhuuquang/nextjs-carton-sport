"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ModeSwitch() {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setDarkMode] = useState(false);
  useEffect(() => {
    setDarkMode(theme === "dark");
  }, [theme]);

  return (
    <div className="flex items-center space-x-2">
      <Label
        htmlFor="theme-switch"
        className={isDarkMode ? "text-muted-foreground" : ""}
      >
        Sáng
      </Label>
      <Switch
        id="theme-switch"
        checked={isDarkMode}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        className="cursor-pointer"
      />
      <Label
        htmlFor="theme-switch"
        className={isDarkMode ? "" : "text-muted-foreground"}
      >
        Tối
      </Label>
    </div>
  );
}

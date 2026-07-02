"use client";

import { Button } from "@/ui/Button";
import { Tooltip, TooltipTrigger } from "@/ui/Tooltip";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeChecker() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [hasManualOverride, setHasManualOverride] = useState(false);

  useEffect(() => {
    const systemTheme = getSystemTheme();
    setTheme(systemTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted || hasManualOverride) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [mounted, hasManualOverride]);

  const toggleTheme = () => {
    setHasManualOverride(true);
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  if (!mounted) {
    return null;
  }

  return (
    <TooltipTrigger>
      <Button type="button" variant="secondary" onClick={toggleTheme}>
        {theme === "light" ? <Moon /> : <Sun />}
      </Button>
      <Tooltip>
        Switch to {theme === "light" ? "dark mode" : "light mode"}
      </Tooltip>{" "}
    </TooltipTrigger>
  );
}

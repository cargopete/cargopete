"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-14 h-7 rounded-full bg-border border border-border" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-14 h-7 rounded-full bg-card border border-border flex items-center px-1 transition-colors hover:border-rust-orange group"
      aria-label="Toggle theme"
    >
      <div
        className={`absolute w-5 h-5 rounded-full bg-rust-orange transition-transform duration-300 flex items-center justify-center ${
          theme === "dark" ? "translate-x-0" : "translate-x-7"
        }`}
      >
        {theme === "dark" ? (
          <Moon className="w-3 h-3 text-background" />
        ) : (
          <Sun className="w-3 h-3 text-background" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

"use client";

import { useState } from "react";

export type Theme = "light" | "dark";

type ThemeToggleProps = { initialTheme: Theme };

export default function ThemeToggle({ initialTheme }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.body.dataset.theme = next;
    document.cookie = `theme=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="테마 전환"
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-base leading-none hover:bg-black/5 [body[data-theme=dark]_&]:hover:bg-white/10"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}

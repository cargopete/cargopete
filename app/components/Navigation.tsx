"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Terminal } from "lucide-react";

const navLinks = [
  { href: "#about", label: "about" },
  { href: "#tech-stack", label: "tech" },
  { href: "#projects", label: "projects" },
  { href: "#experience", label: "experience" },
  { href: "#community", label: "community" },
  { href: "#contact", label: "contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-foreground hover:text-rust-orange transition-colors font-mono group"
          >
            <Terminal className="w-5 h-5 text-rust-orange group-hover:animate-pulse" />
            <span className="hidden sm:block font-bold">cargopete</span>
          </button>

          {/* Nav Links - Hidden on mobile, shown on larger screens */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-sm text-foreground/70 hover:text-rust-orange transition-colors"
              >
                <span className="text-terminal-green">$</span> {link.label}
              </a>
            ))}
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

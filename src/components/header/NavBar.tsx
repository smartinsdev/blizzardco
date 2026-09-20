"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { cinzel } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { navItems } from "./nav-items";
import { SiderBar } from "./SiderBar";

/**
 * `authSlot` is rendered on the server and passed in as a prop, which keeps the
 * session out of this client component — and the login form out of the bundle
 * every route loads.
 */
export default function Header({ authSlot }: { authSlot: React.ReactNode }) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const openAndCloseMenu = useCallback(
    () => setNavbarOpen((open) => !open),
    []
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolling(window.scrollY > 0);

    // Passive: this listener never calls `preventDefault()`, so the browser
    // doesn't have to wait for it before scrolling.
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        `fixed w-full z-20 transition duration-300 ease-in-out bg-transparent`,
        isScrolling && "bg-foreground"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center p-6 w-full">
        <Link href="/">
          <span className={`${cinzel.className} text-lg`}>BlizzarCO</span>
        </Link>

        <nav className="flex justify-between items-center">
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  `inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-xs md:text-sm lg:text-base font-medium
                  transition-all hover:bg-accent hover:text-accent-foreground
                  focus:bg-accent focus:text-accent-foreground focus:outline-hidden`,
                  cinzel.className,
                  isScrolling && "text-primary-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={openAndCloseMenu}
            aria-expanded={navbarOpen}
            aria-label={navbarOpen ? "Fechar menu" : "Abrir menu"}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-3 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:hidden z-40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <SiderBar open={navbarOpen} onNavigate={openAndCloseMenu} />
        </nav>

        {authSlot}
      </div>
    </header>
  );
}

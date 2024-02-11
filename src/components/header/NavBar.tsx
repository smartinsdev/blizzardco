"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { Cinzel } from "next/font/google";

import { navItems } from "./nav-items";
import { SiderBar } from "./SiderBar";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { LoginButton } from "../auth/login-button";

const cinzel = Cinzel({ subsets: ["latin"] });

export default function Header() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const openAndCloseMenu = () => setNavbarOpen(!navbarOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
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
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Link href="/" passHref>
            <Image
              src="/logo.webp"
              alt="Logo Gods of Classic"
              width={100}
              height={100}
              className="w-auto h-auto"
            />
          </Link>
        </div>
        <nav className="flex justify-between items-center">
          <div className="hidden md:flex space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  `inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-xs md:text-sm lg:text-base font-medium 
                  transition-all hover:bg-accent hover:text-accent-foreground 
                  focus:bg-accent focus:text-accent-foreground focus:outline-none`,
                  cinzel.className,
                  isScrolling && "text-primary-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <Button
            onClick={openAndCloseMenu}
            className={cn(
              "px-3 flex justify-center items-center sm:hidden z-40"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </Button>
          <SiderBar
            translate={navbarOpen ? "translate-x-0 " : "translate-x-full"}
          />
        </nav>
        <LoginButton asChild mode="redirect">
          <Button
            size="lg"
            className={cn("hidden sm:block font-bold", cinzel.className)}
          >
            Entrar
          </Button>
        </LoginButton>
      </div>
    </header>
  );
}

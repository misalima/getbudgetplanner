"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const toolsLinks = [
  { href: "/tools/budget-calculator", label: "Budget Calculator" },
];

const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Theme implementation will be added later
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-primary backdrop-blur supports-[backdrop-filter]:bg-primary/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo-side.png"
              alt="My Budget Planner"
              width={220}
              height={60}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - moved to the right */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {/* Tools Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative text-primary-foreground/90 font-medium hover:cursor-pointer transition-colors duration-200 hover:text-primary-foreground hover:cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:scale-x-0 after:bg-primary-foreground after:origin-bottom-left after:transition-transform after:duration-300 hover:after:scale-x-100">
                    Tools
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {toolsLinks.map((tool) => (
                    <DropdownMenuItem key={tool.href} asChild>
                      <Link href={tool.href} className="cursor-pointer w-full block">
                        {tool.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-primary-foreground/90 font-medium transition-colors duration-200 hover:text-primary-foreground after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:scale-x-0 after:bg-primary-foreground after:origin-bottom-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 hover:cursor-pointer rounded-md text-primary-foreground/90 transition-colors duration-200 hover:bg-primary-foreground/10 hover:scale-105 hover:shadow-md"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-primary-foreground/90 transition-colors duration-200 hover:bg-primary-foreground/10 hover:scale-105 hover:shadow-md"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}

            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-primary-foreground/90 transition-colors duration-200 hover:bg-primary-foreground/10 hover:scale-105 hover:shadow-md"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-primary-foreground/20">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-md transition-colors duration-200 font-medium transform hover:scale-105 hover:shadow-md hover:shadow-primary-foreground/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Tools button for mobile */}
              <Link href="/tools" className="block px-3 py-2 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-md transition-colors duration-200 font-medium transform hover:scale-105 hover:shadow-md hover:shadow-primary-foreground/30">
                Tools
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

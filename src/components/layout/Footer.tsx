"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  // scrollToTop: Function to smoothly scroll the window to the top.
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 dark:bg-background text-slate-200 p-6">
      {/* Navigation Menu (Home, Budget Calculator, About, Contact) using Next.js Link components. */}
      <nav>
        <ul className="flex flex-wrap justify-center gap-6 mb-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/tools">Tools</Link>
          </li>
          <li>
            <Link href="/tools/budget-calculator">Budget Calculator</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      {/* Scroll-to-top button, triggers scrollToTop function on click. */}
      <div className="flex justify-center mb-4">
        <button
          onClick={scrollToTop}
          className="bg-slate-700 hover:bg-slate-600 cursor-pointer text-slate-100 font-semibold py-2 px-4 rounded-full"
          aria-label="Scroll to top"
        >
          ↑ Top
        </button>
      </div>

      {/* Terms of Use and Privacy Policy links. */}
      <div className="flex justify-center gap-6 mb-4">
        <Link href="/terms" className="hover:underline">
          Terms of Use
        </Link>
        <Link href="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
      </div>

      {/* Copyright notice. */}
      <div className="text-center text-sm">© 2025 My Budget Planner - Developed by Misael Lima</div>
    </footer>
  );
};

export default Footer;

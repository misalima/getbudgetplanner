"use client"
import React from "react";
import { Button } from "@/components/ui/button";

function scrollToCalculators() {
  const el = document.getElementById("calculators");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 min-h-screen flex flex-col md:flex-row items-center gap-10">
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800">
          Simple, Free Financial Tools to Help You Budget Smarter
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Use our easy calculators to manage your money, pay off debt, and build savings.
        </p>
        <Button className="text-lg" onClick={scrollToCalculators} size="2xl">
          Explore Calculators
        </Button>
      </div>
      <div className="flex-1 flex justify-center">
        <img
          src="./home.png"
          alt="Finance illustration"
          className="w-150 max-w-full"
          loading="lazy"
        />
      </div>
    </section>
  );
}

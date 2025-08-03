import React from "react";
import InputSection from "@/components/budget-calculator/InputSection";

export default function BudgetCalculatorPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-12">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: "var(--title)" }}
        >
          Budget Calculator (50/30/20 Rule)
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Easily split your income into needs, wants, and savings. Get instant
          insights and take control of your money.
        </p>
      </header>
      <InputSection />
    </main>
  );
}

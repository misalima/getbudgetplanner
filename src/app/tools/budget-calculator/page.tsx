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

      <section className="mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: "var(--title)" }}
          >
            How It Works
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The 50/30/20 rule is a simple budgeting method that divides your
            after-tax income into three categories: 50% for needs (rent,
            groceries, utilities), 30% for wants (entertainment, dining out),
            and 20% for savings and debt repayment. Enter your monthly income
            below to see how much you should allocate to each category.
          </p>
        </div>
      </section>

      <InputSection />
    </main>
  );
}

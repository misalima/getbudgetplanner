"use client";
import { useState } from "react";
import InputSection from "@/components/budget-calculator/InputSection";
import ResultsSection from "@/components/budget-calculator/ResultsSection";
import FAQSection from "@/components/budget-calculator/FAQSection";

export default function BudgetCalculatorPage() {
  const [percentages, setPercentages] = useState({
    needs: 50,
    wants: 30,
    savings: 20,
  });
  const [expenseAmounts, setExpenseAmounts] = useState({
    needs: 0,
    wants: 0,
    savings: 0,
  });
  const [income, setIncome] = useState(0);
  const [showResults, setShowResults] = useState(false);

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Compact Header */}
        <header className="text-center mb-8">
          <h1
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ color: "var(--title)" }}
          >
            Budget Calculator (50/30/20 Rule)
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Easily split your income into needs, wants, and savings. Get instant
            insights and take control of your money.
          </p>
        </header>

        {/* How It Works - More Compact */}
        <section className="mb-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-xl font-semibold mb-3 md:text-2xl"
              style={{ color: "var(--title)" }}
            >
              How It Works
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              The 50/30/20 rule divides your after-tax income into three
              categories:
              <span className="font-medium text-blue-600">
                {" "}
                50% for needs
              </span>{" "}
              (rent, groceries, utilities),
              <span className="font-medium text-orange-600">
                {" "}
                30% for wants
              </span>{" "}
              (entertainment, dining out), and
              <span className="font-medium text-green-600">
                {" "}
                20% for savings
              </span>{" "}
              and debt repayment.
            </p>
          </div>
        </section>

        {/* Input Section */}
        <InputSection
          income={income}
          setIncome={setIncome}
          percentages={percentages}
          setPercentages={setPercentages}
          expenseAmounts={expenseAmounts}
          setExpenseAmounts={setExpenseAmounts}
          setShowResults={setShowResults}
        />

        {/* Results Section */}
        {showResults && (
          <ResultsSection
            totals={expenseAmounts}
            percentages={percentages}
            income={income}
          />
        )}

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </main>
  );
}

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

        {/* Ad Placeholder - Above the Fold */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-3xl h-20 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-700">
            <span className="opacity-60">Advertisement</span>
          </div>
        </div>

        {/* How It Works - More Compact */}
        <section className="mb-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-xl font-semibold mb-3 md:text-2xl"
              style={{ color: "var(--title)" }}
            >
              How It Works
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
              Take control of your finances with our simple budget calculator.
              Just enter your monthly income, and we'll instantly show you how
              to allocate your money using the proven 50/30/20 budgeting method.
            </p>
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

        {/* Ad Placeholder - Before FAQ */}
        <div className="flex justify-center mt-12 mb-8">
          <div className="w-full max-w-3xl h-20 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-700">
            <span className="opacity-60">Advertisement</span>
          </div>
        </div>

        {/* Understanding the 50/30/20 Rule */}
        <section className="mb-12 mt-14">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-xl md:text-2xl text-gray-700 font-semibold text-center mb-6"
            >
              Understanding the 50/30/20 Rule
            </h2>

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 text-center">
                Created by Senator Elizabeth Warren, the 50/30/20 rule is one of
                the most popular and effective budgeting strategies for building
                financial stability and achieving your money goals.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-3">
                    50% - Needs
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    Essential expenses you can't avoid: housing, utilities,
                    groceries, transportation, minimum debt payments, insurance,
                    and healthcare. These are your non-negotiable costs.
                  </p>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
                  <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300 mb-3">
                    30% - Wants
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    Lifestyle choices and discretionary spending: dining out,
                    entertainment, hobbies, subscriptions, shopping, and travel.
                    These enhance your quality of life but aren't essential.
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-3">
                    20% - Savings & Debt
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    Emergency fund, retirement contributions, extra debt
                    payments, and long-term savings goals. This secures your
                    financial future and provides peace of mind.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: "var(--title)" }}
                >
                  Why This Rule Works
                </h3>
                <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>
                      <strong>Simple to follow:</strong> Just three categories
                      make budgeting less overwhelming
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>
                      <strong>Balanced approach:</strong> Covers essentials
                      while allowing for enjoyment and future planning
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>
                      <strong>Flexible framework:</strong> Can be adjusted based
                      on your income level and life circumstances
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>
                      <strong>Builds good habits:</strong> Automatically
                      prioritizes saving and debt reduction
                    </span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-center">
                Remember, the 50/30/20 rule is a starting point. If your needs
                exceed 50% of your income, focus on reducing expenses or
                increasing income. The key is finding a sustainable balance that
                works for your unique financial situation.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </main>
  );
}

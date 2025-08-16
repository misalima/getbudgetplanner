"use client";

import React from "react";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PieChartSection from "./PieChartSection";

interface ResultsSectionProps {
  totals: { needs: number; wants: number; savings: number };
  percentages: { needs: number; wants: number; savings: number };
  income: number;
}

interface BudgetResults {
  recommended: {
    needs: number;
    wants: number;
    savings: number;
  };
  actual: {
    needs: number;
    wants: number;
    savings: number;
  };
  remaining: {
    needs: number;
    wants: number;
    savings: number;
  };
}

interface TipData {
  type: "warning" | "success" | "info";
  message: string;
  icon: React.ReactNode;
}

export default function ResultsSection({
  totals,
  percentages,
  income,
}: ResultsSectionProps) {
  // Check if user has provided any expenses
  const hasExpenses =
    totals.needs > 0 || totals.wants > 0 || totals.savings > 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate budget results
  const calculateBudgetResults = (): BudgetResults => {
    const recommended = {
      needs: (income * percentages.needs) / 100,
      wants: (income * percentages.wants) / 100,
      savings: (income * percentages.savings) / 100,
    };

    const actual = {
      needs: totals.needs,
      wants: totals.wants,
      savings: totals.savings,
    };

    const remaining = {
      needs: recommended.needs - actual.needs,
      wants: recommended.wants - actual.wants,
      savings: recommended.savings - actual.savings,
    };

    return { recommended, actual, remaining };
  };

  // Generate personalized tip
  const generateTip = (results: BudgetResults): TipData => {
    const { remaining } = results;

    // If no expenses provided, show basic budget allocation tip
    if (!hasExpenses) {
      return {
        type: "info",
        message: `Based on your ${percentages.needs}/${percentages.wants}/${
          percentages.savings
        } budget, you should allocate ${formatCurrency(
          results.recommended.needs
        )} to needs, ${formatCurrency(
          results.recommended.wants
        )} to wants, and ${formatCurrency(
          results.recommended.savings
        )} to savings each month.`,
        icon: <Info className="h-5 w-5" />,
      };
    }

    const actualPercentages = {
      needs: (results.actual.needs / income) * 100,
      wants: (results.actual.wants / income) * 100,
      savings: (results.actual.savings / income) * 100,
    };

    // Priority: Overspending on wants > Undersaving > Overspending on needs
    if (remaining.wants < 0) {
      const overspentPercent = Math.round(actualPercentages.wants);
      return {
        type: "warning",
        message: `You're spending ${overspentPercent}% on wants. Try to keep it under ${percentages.wants}% for better savings.`,
        icon: <AlertCircle className="h-5 w-5" />,
      };
    }

    if (remaining.savings < 0) {
      return {
        type: "warning",
        message: `You're under-saving by $${Math.abs(remaining.savings).toFixed(
          0
        )}. Consider reducing expenses to meet your savings goal.`,
        icon: <TrendingDown className="h-5 w-5" />,
      };
    }

    if (remaining.needs < 0) {
      return {
        type: "warning",
        message: `Your essential expenses exceed the recommended ${percentages.needs}%. Review your needs budget for optimization.`,
        icon: <AlertCircle className="h-5 w-5" />,
      };
    }

    // All categories are within budget
    const totalRemaining =
      remaining.needs + remaining.wants + remaining.savings;
    if (totalRemaining > 0) {
      return {
        type: "success",
        message: `Great job! You have $${totalRemaining.toFixed(
          0
        )} extra in your budget. Consider increasing your savings.`,
        icon: <CheckCircle className="h-5 w-5" />,
      };
    }

    return {
      type: "info",
      message: `Your budget is perfectly balanced! You're following the ${percentages.needs}/${percentages.wants}/${percentages.savings} rule effectively.`,
      icon: <Info className="h-5 w-5" />,
    };
  };

  const results = calculateBudgetResults();
  const tip = generateTip(results);

  const categories = [
    {
      name: "Needs",
      key: "needs" as keyof typeof results.recommended,
      color: "var(--custom-blue)",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      name: "Wants",
      key: "wants" as keyof typeof results.recommended,
      color: "var(--custom-orange)",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
    },
    {
      name: "Savings",
      key: "savings" as keyof typeof results.recommended,
      color: "var(--custom-green)",
      bgColor: "bg-green-50 dark:bg-green-950/20",
    },
  ];

  return (
    <section id="results-section" className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-title mb-2">
            Your Budget Breakdown
          </h2>
          <p className="text-muted-foreground">
            {hasExpenses
              ? `Based on your ${formatCurrency(
                  income
                )} monthly income and expenses`
              : `Based on your ${formatCurrency(income)} monthly income`}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Pie Chart */}
          <div className="flex justify-center">
            <PieChartSection
              income={income}
              percentages={percentages}
              totals={totals}
            />
          </div>

          {/* Budget Breakdown */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Budget Breakdown</h3>

            {categories.map((category) => {
              const recommended = results.recommended[category.key];
              const actual = results.actual[category.key];
              const remaining = results.remaining[category.key];
              const isOverspent = remaining < 0;

              return (
                <div
                  key={category.key}
                  className={`p-4 rounded-lg border ${category.bgColor}`}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-semibold text-lg text-foreground">
                      {category.name}
                    </span>
                  </div>

                  {/* Budget Details */}
                  <div
                    className={`grid gap-3 ${
                      hasExpenses ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1"
                    }`}
                  >
                    {/* Recommended */}
                    <div className="text-center sm:text-left">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">
                        Recommended
                      </div>
                      <div className="font-semibold text-lg text-accent-foreground">
                        {formatCurrency(recommended)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {percentages[category.key]}% of income
                      </div>
                    </div>

                    {/* Actual Expenses */}
                    {hasExpenses && (
                      <div className="text-center sm:text-left">
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">
                          Actual
                        </div>
                        <div className="font-semibold text-lg">
                          {formatCurrency(actual)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {((actual / income) * 100).toFixed(1)}% of income
                        </div>
                      </div>
                    )}

                    {/* Remaining/Overspent */}
                    {hasExpenses && (
                      <div className="text-center sm:text-right">
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">
                          {isOverspent ? "Overspent" : "Remaining"}
                        </div>
                        <div
                          className={`font-semibold text-lg flex items-center justify-center sm:justify-end gap-1 ${
                            isOverspent ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {isOverspent ? (
                            <TrendingDown className="h-4 w-4" />
                          ) : (
                            <TrendingUp className="h-4 w-4" />
                          )}
                          {formatCurrency(Math.abs(remaining))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Personalized Tip */}
        <div className="mt-8">
          <Card
            className={`border-l-4 max-w-4xl mx-auto ${
              tip.type === "warning"
                ? "border-l-red-500 bg-red-50/50 dark:bg-red-950/20"
                : tip.type === "success"
                ? "border-l-green-500 bg-green-50/50 dark:bg-green-950/20"
                : "border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20"
            }`}
          >
            <CardContent className="py-4">
              <div className="flex items-start gap-4">
                <div
                  className={`mt-0.5 ${
                    tip.type === "warning"
                      ? "text-red-600"
                      : tip.type === "success"
                      ? "text-green-600"
                      : "text-blue-600"
                  }`}
                >
                  {tip.icon}
                </div>
                <div>
                  <h4
                    className={`font-semibold mb-1 ${
                      tip.type === "warning"
                        ? "text-red-900 dark:text-red-100"
                        : tip.type === "success"
                        ? "text-green-900 dark:text-green-100"
                        : "text-blue-900 dark:text-blue-100"
                    }`}
                  >
                    {tip.type === "warning"
                      ? "Budget Alert"
                      : tip.type === "success"
                      ? "Great Job!"
                      : "Budget Insight"}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tip.message}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

"use client";
import React from "react";
import { DollarSign, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomizePercentages, { PercentageState } from "./CustomizePercentages";

interface Expense {
  id: number;
  name: string;
  amount: string;
  category: string;
  errors: {
    name?: string;
    amount?: string;
    category?: string;
  };
}

interface InputSectionProps {
  percentages: PercentageState;
  setPercentages: (
    value: PercentageState | ((prev: PercentageState) => PercentageState)
  ) => void;
  expenseAmounts: { needs: number; wants: number; savings: number };
  setExpenseAmounts: (value: {
    needs: number;
    wants: number;
    savings: number;
  }) => void;
  income: number;
  setIncome: (value: number) => void;
  setShowResults: (value: boolean) => void;
}

export default function InputSection({
  percentages,
  setPercentages,
  expenseAmounts,
  setExpenseAmounts,
  setIncome,
  setShowResults,
}: InputSectionProps) {
  const [showCustom, setShowCustom] = React.useState(false);
  const [expensesExpanded, setExpensesExpanded] = React.useState(false);
  const [expenses, setExpenses] = React.useState<Expense[]>([]);

  const [income, setLocalIncome] = React.useState<number>(0);
  const [incomeError, setIncomeError] = React.useState<string>("");

  const [inputValues, setInputValues] = React.useState({
    needs: "50",
    wants: "30",
    savings: "20",
  });

  // Percentage methods
  const handlePercentageInputChange = (
    category: keyof PercentageState,
    value: string
  ) => {
    // Allow empty string or valid numbers
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setInputValues((prev) => ({ ...prev, [category]: value }));

      // Update percentage if it's a valid number
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
        setPercentages((prev) => ({ ...prev, [category]: numValue }));
      } else if (value === "") {
        setPercentages((prev) => ({ ...prev, [category]: 0 }));
      }
    }
  };

  const handlePercentageInputBlur = (category: keyof PercentageState) => {
    const value = inputValues[category];
    if (value === "" || isNaN(parseFloat(value))) {
      // Reset to current percentage if invalid
      setInputValues((prev) => ({
        ...prev,
        [category]: percentages[category].toString(),
      }));
    }
  };

  const resetPercentagesToDefault = () => {
    const defaultValues = { needs: 50, wants: 30, savings: 20 };
    setPercentages(defaultValues);
    setInputValues({
      needs: "50",
      wants: "30",
      savings: "20",
    });
  };

  const balanceBudget = () => {
    const total = percentages.needs + percentages.wants + percentages.savings;
    if (total === 0) {
      resetPercentagesToDefault();
      return;
    }

    // Proportionally adjust to make total = 100
    const factor = 100 / total;
    const newPercentages = {
      needs: Math.round(percentages.needs * factor),
      wants: Math.round(percentages.wants * factor),
      savings: Math.round(percentages.savings * factor),
    };

    // Ensure total is exactly 100 by adjusting the largest category
    const newTotal =
      newPercentages.needs + newPercentages.wants + newPercentages.savings;
    if (newTotal !== 100) {
      const diff = 100 - newTotal;
      const largest = Object.entries(newPercentages).reduce(
        (max, [key, value]) =>
          value > newPercentages[max as keyof PercentageState]
            ? (key as keyof PercentageState)
            : max,
        "needs" as keyof PercentageState
      );
      newPercentages[largest] += diff;
    }

    setPercentages(newPercentages);
    setInputValues({
      needs: newPercentages.needs.toString(),
      wants: newPercentages.wants.toString(),
      savings: newPercentages.savings.toString(),
    });
  };

  const applyPreset = (preset: {
    needs: number;
    wants: number;
    savings: number;
  }) => {
    setPercentages(preset);
    setInputValues({
      needs: preset.needs.toString(),
      wants: preset.wants.toString(),
      savings: preset.savings.toString(),
    });
  };

  // Handle toggle change with reset functionality
  const handleCustomToggleChange = (checked: boolean) => {
    setShowCustom(checked);

    // If turning off customization, reset to default values
    if (!checked) {
      resetPercentagesToDefault();
    }
  };

  const toggleExpenses = () => {
    setExpensesExpanded(!expensesExpanded);
  };

  const addExpense = () => {
    setExpenses((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        amount: "",
        category: "Needs",
        errors: {},
      },
    ]);
  };

  const removeExpense = (id: number) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const updateExpense = (id: number, field: keyof Expense, value: string) => {
    setExpenses((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              [field]: value,
              errors: { ...e.errors, [field]: undefined },
            }
          : e
      )
    );
  };

  const validateExpenses = () => {
    let valid = true;
    setExpenses((prev) =>
      prev.map((e) => {
        const errors: Expense["errors"] = {};
        if (!e.name.trim()) {
          errors.name = "Required";
          valid = false;
        }
        if (
          !e.amount.trim() ||
          isNaN(Number(e.amount)) ||
          Number(e.amount) <= 0
        ) {
          errors.amount = "Must be a positive number";
          valid = false;
        }
        if (!e.category) {
          errors.category = "Required";
          valid = false;
        }
        return { ...e, errors };
      })
    );
    return valid;
  };

  const calculateTotals = () => {
    return expenses.reduce(
      (totals, expense) => {
        const category = expense.category.toLowerCase();
        if (category === "needs") totals.needs += Number(expense.amount) || 0;
        else if (category === "wants")
          totals.wants += Number(expense.amount) || 0;
        else if (category === "savings")
          totals.savings += Number(expense.amount) || 0;
        return totals;
      },
      { needs: 0, wants: 0, savings: 0 }
    );
  };

  const validateIncome = () => {
    if (!income || income <= 0) {
      if (income === 0 || !income) {
        setIncomeError("Please enter your monthly income");
      } else if (income < 0) {
        setIncomeError("Income must be a positive number");
      }
      return false;
    }
    setIncomeError("");
    return true;
  };

  const handleIncomeChange = (value: string) => {
    const numValue = Number(value);
    setLocalIncome(numValue);

    // Clear error when user starts typing
    if (incomeError) {
      setIncomeError("");
    }
  };

  const handleCalculate = () => {
    const isIncomeValid = validateIncome();
    const areExpensesValid = validateExpenses();

    if (!isIncomeValid || !areExpensesValid) {
      return;
    }

    setIncome(income);

    const {
      needs: needsTotal,
      wants: wantsTotal,
      savings: savingsTotal,
    } = calculateTotals();

    // Update the expense amounts state
    setExpenseAmounts({
      needs: needsTotal,
      wants: wantsTotal,
      savings: savingsTotal,
    });

    // Show the results section
    setShowResults(true);

    // Scroll to results section after a brief delay to allow rendering
    setTimeout(() => {
      const resultsSection = document.getElementById("results-section");
      if (resultsSection) {
        resultsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  return (
    <section className="mb-8">
      <Card className="max-w-4xl mx-auto md:p-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-title text-center">
            50/30/20 Calculator
          </CardTitle>
          <CardDescription className="text-center text-sm">
            Enter your income and expenses to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2 flex flex-col items-center">
            <Label htmlFor="income" className="text-center">
              Monthly Income
            </Label>
            <div className="relative w-64">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              <Input
                id="income"
                type="number"
                placeholder="your income"
                onChange={(e) => handleIncomeChange(e.target.value)}
                className={`pl-12 py-6 text-gray-800 font-semibold text-center ${
                  incomeError ? "border-red-500 focus:border-red-500" : ""
                }`}
                style={{ fontSize: "1.4rem" }}
                aria-invalid={!!incomeError}
                aria-describedby={incomeError ? "income-error" : undefined}
              />
            </div>
            {incomeError && (
              <p
                id="income-error"
                className="text-sm text-red-600 text-center mt-1"
              >
                {incomeError}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex flex-col md:flex-row items-center md:justify-end md:gap-4 space-y-2 md:space-y-0">
              <p className="text-xs text-muted-foreground text-center">
                List your regular expenses to get a more accurate budget
                breakdown (optional).
              </p>
              <Button
                variant="outline"
                className="hover:cursor-pointer flex items-center gap-2"
                onClick={toggleExpenses}
                aria-expanded={expensesExpanded}
                aria-controls="expenses-section"
              >
                <Plus className="h-4 w-4" />
                {expensesExpanded ? "Hide Expenses" : "Expenses"}
              </Button>
            </div>

            <div
              id="expenses-section"
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expensesExpanded
                  ? "max-h-[500px] opacity-100 mt-4"
                  : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {expenses.map((expense, idx) => (
                  <div
                    key={expense.id}
                    className="flex flex-col md:flex-row md:items-center md:space-x-4 p-4 rounded-md border bg-muted"
                  >
                    <div className="flex-1 mb-2 md:mb-0">
                      <Label htmlFor={`expense-name-${expense.id}`}>
                        Expense Name
                      </Label>
                      <Input
                        id={`expense-name-${expense.id}`}
                        type="text"
                        placeholder="e.g., Rent"
                        value={expense.name}
                        onChange={(e) =>
                          updateExpense(expense.id, "name", e.target.value)
                        }
                        aria-invalid={!!expense.errors.name}
                        aria-describedby={
                          expense.errors.name
                            ? `error-name-${expense.id}`
                            : undefined
                        }
                      />
                      {expense.errors.name && (
                        <p
                          id={`error-name-${expense.id}`}
                          className="text-xs text-red-600"
                        >
                          {expense.errors.name}
                        </p>
                      )}
                    </div>

                    <div className="flex-1 mb-2 md:mb-0 relative">
                      <Label htmlFor={`expense-amount-${expense.id}`}>
                        Amount
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id={`expense-amount-${expense.id}`}
                          type="number"
                          placeholder="e.g., 1200"
                          value={expense.amount}
                          onChange={(e) =>
                            updateExpense(expense.id, "amount", e.target.value)
                          }
                          className="pl-10"
                          aria-invalid={!!expense.errors.amount}
                          aria-describedby={
                            expense.errors.amount
                              ? `error-amount-${expense.id}`
                              : undefined
                          }
                        />
                      </div>
                      {expense.errors.amount && (
                        <p
                          id={`error-amount-${expense.id}`}
                          className="text-xs text-red-600"
                        >
                          {expense.errors.amount}
                        </p>
                      )}
                    </div>

                    <div className="flex-1 mb-2 md:mb-0">
                      <Label htmlFor={`expense-category-${expense.id}`}>
                        Category
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          updateExpense(expense.id, "category", value)
                        }
                        value={expense.category}
                        aria-invalid={!!expense.errors.category}
                        aria-describedby={
                          expense.errors.category
                            ? `error-category-${expense.id}`
                            : undefined
                        }
                      >
                        <SelectTrigger id={`expense-category-${expense.id}`}>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Needs">Needs</SelectItem>
                          <SelectItem value="Wants">Wants</SelectItem>
                          <SelectItem value="Savings">Savings</SelectItem>
                        </SelectContent>
                      </Select>
                      {expense.errors.category && (
                        <p
                          id={`error-category-${expense.id}`}
                          className="text-xs text-red-600"
                        >
                          {expense.errors.category}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center mt-4 md:mt-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:bg-red-100"
                        onClick={() => removeExpense(expense.id)}
                        aria-label="Remove expense"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  variant="secondary"
                  className="mt-2 flex items-center gap-2 hover:cursor-pointer ml-auto"
                  onClick={addExpense}
                >
                  <Plus className="h-4 w-4" />
                  Add Expense
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-lg md:border md:p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="customize-toggle">Customize Percentages</Label>
                <p className="text-sm text-muted-foreground">
                  Adjust the 50/30/20 rule to fit your goals.
                </p>
              </div>
              <Switch
                id="customize-toggle"
                checked={showCustom}
                onCheckedChange={handleCustomToggleChange}
                className="hover:cursor-pointer"
                aria-controls="percentages-section"
              />
            </div>
            <div
              id="percentages-section"
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showCustom
                  ? "max-h-[800px] opacity-100 mt-4"
                  : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <div className="py-4">
                <CustomizePercentages
                  percentages={percentages}
                  inputValues={inputValues}
                  onInputChange={handlePercentageInputChange}
                  onInputBlur={handlePercentageInputBlur}
                  onResetToDefault={resetPercentagesToDefault}
                  onBalanceBudget={balanceBudget}
                  onApplyPreset={applyPreset}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            size="lg"
            className="text-xl h-12 md:rounded-lg rounded-2xl w-full hover:cursor-pointer"
            onClick={handleCalculate}
          >
            Calculate My Budget
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}

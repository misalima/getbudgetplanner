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

interface Expense {
  id: number;
  name: string;
  amount: string;
  category: string;
  customCategoryName: string;
  errors: {
    name?: string;
    amount?: string;
    category?: string;
    customCategoryName?: string;
  };
}

export default function InputSection() {
  const [showCustom, setShowCustom] = React.useState(false);
  const [expensesExpanded, setExpensesExpanded] = React.useState(false);
  const [expenses, setExpenses] = React.useState<Expense[]>([]);

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
        customCategoryName: "",
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
        if (e.category === "Custom" && !e.customCategoryName.trim()) {
          errors.customCategoryName = "Required";
          valid = false;
        }
        return { ...e, errors };
      })
    );
    return valid;
  };

  return (
    <section className="mb-12">
      <Card className="max-w-3xl mx-auto md:p-8">
        <CardHeader>
          <CardTitle className="text-lg">Your Financials</CardTitle>
          <CardDescription>
            Enter your income and expenses to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="income">Monthly Income</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="income"
                type="number"
                placeholder="Enter your monthly income"
                className="pl-10"
              />
            </div>
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
                          <SelectItem value="Custom">Custom</SelectItem>
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

                      {expense.category === "Custom" && (
                        <div className="mt-2">
                          <Input
                            type="text"
                            placeholder="Custom category name"
                            value={expense.customCategoryName}
                            onChange={(e) =>
                              updateExpense(
                                expense.id,
                                "customCategoryName",
                                e.target.value
                              )
                            }
                            aria-invalid={!!expense.errors.customCategoryName}
                            aria-describedby={
                              expense.errors.customCategoryName
                                ? `error-custom-category-${expense.id}`
                                : undefined
                            }
                          />
                          {expense.errors.customCategoryName && (
                            <p
                              id={`error-custom-category-${expense.id}`}
                              className="text-xs text-red-600"
                            >
                              {expense.errors.customCategoryName}
                            </p>
                          )}
                        </div>
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

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="customize-toggle">Customize Percentages</Label>
              <p className="text-sm text-muted-foreground">
                Adjust the 50/30/20 rule to fit your goals.
              </p>
            </div>
            <Switch
              id="customize-toggle"
              checked={showCustom}
              onCheckedChange={setShowCustom}
              className="hover:cursor-pointer"
            />
          </div>

          {showCustom && (
            <div>Customization UI will go here (sliders, etc.)</div>
          )}
        </CardContent>
        <CardFooter>
          <Button size="lg" className="w-full hover:cursor-pointer">
            Calculate My Budget
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}

"use client"
import React from "react";
import { Wallet, LineChart, PiggyBank, Calculator } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const calculators = [
  {
    name: "Budget Calculator",
    icon: <Wallet className="w-8 h-8 text-blue-600" />,
    description: "Plan your monthly spending and track where your money goes.",
    link: "/tools/budget-calculator",
    working: true,
  },
  {
    name: "Debt Snowball",
    icon: <LineChart className="w-8 h-8 text-green-600" />,
    description: "Pay off debt faster using the proven snowball method.",
    link: "/#debt-snowball",
    working: false,
  },
  {
    name: "Emergency Fund",
    icon: <PiggyBank className="w-8 h-8 text-pink-600" />,
    description: "Find out how much you need for life's unexpected events.",
    link: "/#emergency-fund",
    working: false,
  },
  {
    name: "Savings Goal",
    icon: <Calculator className="w-8 h-8 text-yellow-500" />,
    description: "Set and track your savings goals with ease.",
    link: "/#savings-goal",
    working: false,
  },
];

export default function Calculators() {
  return (
    <section id="calculators" className="bg-gray-50 py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-10 text-blue-800">Featured Calculators</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {calculators.map((calc) => (
            <Card key={calc.name} className="flex flex-col items-center text-center">
              <CardContent className="flex flex-col items-center p-6 pt-6 pb-0 flex-1 w-full">
                {calc.icon}
                <h4 className="font-semibold text-lg mt-4 mb-2">{calc.name}</h4>
                <p className="text-gray-600 mb-4">{calc.description}</p>
                <Button variant={calc.working ? "default" : "outline"} asChild className="mt-auto w-full" size="sm">
                  <a href={calc.link}>{calc.working ? "Try Now" : "Coming Soon"}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

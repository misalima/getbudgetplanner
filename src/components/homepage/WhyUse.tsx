"use client"
import React from "react";
import { CheckCircle2, Calculator, X, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const howItWorks = [
  {
    icon: <CheckCircle2 className="w-6 h-6 text-blue-500" />,
    title: "Easy & Free",
    text: "All our tools are simple to use and completely free.",
  },
  {
    icon: <Calculator className="w-6 h-6 text-green-500" />,
    title: "Proven Methods",
    text: "Built on trusted financial rules and best practices.",
  },
  {
    icon: <X className="w-6 h-6 text-red-500" />,
    title: "No Sign-Up",
    text: "No registration or personal info required to use our tools.",
  },
  {
    icon: <Users className="w-6 h-6 text-purple-500" />,
    title: "Trusted by Thousands",
    text: "Join a growing community of smart budgeters.",
  },
];

export default function WhyUse() {
  return (
    <section className="py-16 md:py-32">
      <div className="max-w-5xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-10 text-primary dark:text-foreground">Why Use My Budget Planner?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {howItWorks.map((item) => (
            <Card key={item.title} className="flex flex-col items-center text-center">
              <CardContent className="flex flex-col items-center p-6 flex-1 w-full">
                {item.icon}
                <h4 className="font-semibold text-lg mt-4 mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

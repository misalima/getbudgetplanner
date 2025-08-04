import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Is the 50/30/20 rule good for low income?",
    answer:
      "The 50/30/20 rule is a helpful starting point, but if your needs exceed 50% of your income, focus on covering essentials first and adjust the percentages as needed.",
  },
  {
    question: "How do I budget if my needs are more than 50%?",
    answer:
      "If your needs take up more than half your income, try to reduce fixed costs or increase your income. Adjust the rule to fit your reality—saving even a small amount is progress.",
  },
  {
    question: "Can I change the 50/30/20 percentages?",
    answer:
      "Yes! Our calculator lets you customize the percentages to match your financial goals and situation.",
  },
  {
    question: "What counts as a 'need' or a 'want'?",
    answer:
      "Needs are essentials like rent, groceries, and bills. Wants are non-essentials like dining out, entertainment, and shopping.",
  },
  {
    question: "How can I save more each month?",
    answer:
      "Track your spending, set savings goals, and look for areas to cut back on wants or negotiate better deals on needs.",
  },
];

export default function FAQSection() {
  return (
    <section className="mt-12 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--title)" }}
          >
            Frequently Asked Questions
          </h2>
          <p
            className="text-base opacity-80"
            style={{ color: "var(--foreground)" }}
          >
            Get answers to common budgeting questions
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="overflow-visible">
          <Accordion type="multiple" className="w-full space-y-2">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="border-2 rounded-lg transition-all duration-200 hover:shadow-md hover:border-opacity-80"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--card)",
                }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border-none px-4 py-1"
                >
                  <AccordionTrigger
                    className="text-left text-base font-semibold hover:no-underline py-3 cursor-pointer transition-colors duration-200 hover:opacity-80"
                    style={{ color: "var(--title)" }}
                  >
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent
                    className="text-sm leading-relaxed font-medium pb-3 pt-1"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

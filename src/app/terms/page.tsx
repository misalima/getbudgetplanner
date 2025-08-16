import React from "react";
import { Card } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background py-12 px-4">
  <Card className="w-full max-w-7xl p-10 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms of Use</h1>
        <section className="space-y-6 text-sm text-muted-foreground">
          <p>
            Welcome to GetBudgetPlanner! By accessing or using our website and services, you agree to be bound by these Terms of Use. Please read them carefully.
          </p>
          <h2 className="text-xl font-semibold mt-6">1. Acceptance of Terms</h2>
          <p>
            By using GetBudgetPlanner, you acknowledge that you have read, understood, and agree to these Terms. If you do not agree, please do not use our services.
          </p>
          <h2 className="text-xl font-semibold mt-6">2. Use of Service</h2>
          <p>
            You may use our budgeting tools and resources for personal, non-commercial purposes only. You agree not to misuse the service or attempt to access it in any unauthorized way.
          </p>
          <h2 className="text-xl font-semibold mt-6">3. User Content</h2>
          <p>
            Any information you provide must be accurate and lawful. You retain ownership of your data, but grant us permission to use it as necessary to provide our services.
          </p>
          <h2 className="text-xl font-semibold mt-6">4. Privacy</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
          </p>
          <h2 className="text-xl font-semibold mt-6">5. Disclaimer</h2>
          <p>
            GetBudgetPlanner provides information and tools for educational purposes only. We do not offer financial, legal, or tax advice. Use our services at your own risk.
          </p>
          <h2 className="text-xl font-semibold mt-6">6. Limitation of Liability</h2>
          <p>
            We are not liable for any damages or losses resulting from your use of our services. Our tools are provided &quot;as is&quot; without warranties of any kind.
          </p>
          <h2 className="text-xl font-semibold mt-6">7. Changes to Terms</h2>
          <p>
            We may update these Terms at any time. Continued use of the service means you accept the revised Terms.
          </p>
          <h2 className="text-xl font-semibold mt-6">8. Contact</h2>
          <p>
            For questions about these Terms, contact us at <a href="mailto:misael.alisson14@gmail.com" className="text-blue-600 underline">misael.alisson14@gmail.com</a>.
          </p>
        </section>
      </Card>
    </main>
  );
}

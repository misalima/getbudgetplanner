import React from "react";
import { Card } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background py-12 px-4">
      <Card className="w-full max-w-7xl p-10 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
        <section className="space-y-6 text-sm text-muted-foreground">
          <p>
            This Privacy Policy explains how GetBudgetPlanner (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects your information when you use our website and services.
          </p>
          <h2 className="text-xl font-semibold mt-6">1. Information We Collect</h2>
          <p>
            We may collect personal information you provide, such as your name, email address, and any information you enter into our budgeting tools. We also collect non-personal information such as browser type, device, and usage data through cookies and analytics tools.
          </p>
          <h2 className="text-xl font-semibold mt-6">2. How We Use Your Information</h2>
          <p>
            We use your information to provide, maintain, and improve our services, respond to your inquiries, and communicate updates. We do not sell your personal information to third parties.
          </p>
          <h2 className="text-xl font-semibold mt-6">3. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to enhance your experience, analyze usage, and improve our website. You can control cookies through your browser settings.
          </p>
          <h2 className="text-xl font-semibold mt-6">4. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure.
          </p>
          <h2 className="text-xl font-semibold mt-6">5. Third-Party Services</h2>
          <p>
            Our website may contain links to third-party sites. We are not responsible for their privacy practices. Please review their policies before providing information.
          </p>
          <h2 className="text-xl font-semibold mt-6">6. Children&apos;s Privacy</h2>
          <p>
            Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.
          </p>
          <h2 className="text-xl font-semibold mt-6">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
          </p>
          <h2 className="text-xl font-semibold mt-6">8. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at <a href="mailto:misael.alisson14@gmail.com" className="text-blue-600 underline">misael.alisson14@gmail.com</a>.
          </p>
        </section>
      </Card>
    </main>
  );
}

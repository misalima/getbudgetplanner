import React from 'react';

export default function AboutPage() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-lg">
          At GetBudgetPlanner, our mission is to empower individuals and families to take control of their finances with simple, effective, and accessible budgeting tools. We believe everyone deserves financial clarity and peace of mind.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Who We Are</h2>
        <p className="text-lg">
          We are a passionate team of developers, designers, and finance enthusiasts dedicated to making personal finance easy and approachable. Our platform is designed to help you plan, track, and optimize your budget, no matter your financial goals.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p className="text-lg">
          Have questions or feedback? Reach out to us at <a href="mailto:misael.alisson14@gmail.com" className="text-blue-600 underline">misael.alisson14@gmail.com</a>.
        </p>
      </section>
    </main>
  );
}

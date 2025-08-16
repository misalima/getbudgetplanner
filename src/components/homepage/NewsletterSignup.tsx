"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="py-16 md:py-32">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8 text-center">
        <h3 className="text-2xl font-bold mb-2 text-blue-800">Stay in the Loop</h3>
        <p className="text-gray-600 mb-6">Get budgeting tips and updates delivered to your inbox.</p>
        {submitted ? (
          <div className="text-green-600 font-semibold">Thank you for subscribing!</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Button type="submit" size="lg">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}

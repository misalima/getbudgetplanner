"use client"

import Hero from "@/components/homepage/Hero";
import Calculators from "@/components/homepage/Calculators";
import HowItWorks from "@/components/homepage/WhyUse";
import BlogPosts from "@/components/homepage/BlogPosts";
import NewsletterSignup from "@/components/homepage/NewsletterSignup";

export default function Page() {
  const isNewsletterEnabled = false; 
  return (
    <div className="bg-white">
      <Hero />
      <Calculators />
      <HowItWorks />
      <BlogPosts />
      {isNewsletterEnabled && <NewsletterSignup />}
    </div>
  );
}

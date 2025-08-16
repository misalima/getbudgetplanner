import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BlogPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background py-12 px-4">
      <Card className="w-full max-w-xl p-10 shadow-lg flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 text-center">Blog</h1>
        <p className="text-lg text-muted-foreground mb-8 text-center">
          Our blog is coming soon! We’ll be sharing tips, guides, and updates to help you master your budget and reach your financial goals.
        </p>
        <Button disabled className="opacity-70 cursor-not-allowed">Coming Soon</Button>
      </Card>
    </main>
  );
}

import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background py-12 px-4">
  <Card className="w-full max-w-2xl p-12 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
        <form className="space-y-5">
          <div>
            <Label htmlFor="name" className="mb-2 block">Name</Label>
            <Input id="name" name="name" placeholder="Your name" required />
          </div>
          <div>
            <Label htmlFor="email" className="mb-2 block">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@email.com" required />
          </div>
          <div>
            <Label htmlFor="message" className="mb-2 block">Message</Label>
            <Textarea id="message" name="message" placeholder="How can we help you?" rows={5} required />
          </div>
          <Button type="submit" className="w-full">Send Message</Button>
        </form>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Or email us directly at <a href="mailto:misael.alisson14@gmail.com" className="text-blue-600 underline">misael.alisson14@gmail.com</a>
        </div>
      </Card>
    </main>
  );
}

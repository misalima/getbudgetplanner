"use client"
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const blogPosts: {
    title: string;
    snippet: string;
    link: string;
}[] = [];

export default function BlogPosts() {
  return (
    <section className="bg-gray-50 dark:bg-card/70 py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-10 text-primary dark:text-foreground">Latest Blog Posts</h3>
        <div className={`grid grid-cols-1 gap-8 ${blogPosts.length > 0 ? "md:grid-cols-3" : ""}`}>
          {blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <Card key={post.title} className="flex flex-col">
                <CardContent className="flex flex-col p-6 flex-1">
                  <h4 className="font-semibold text-lg mb-2">{post.title}</h4>
                  <p className="text-gray-600 mb-4">{post.snippet}</p>
                  <a
                  href={post.link}
                  className="mt-auto text-blue-600 hover:underline font-medium"
                >
                  Read More &rarr;
                </a>
              </CardContent>
            </Card>
          ))) : (
            <p className="text-gray-400 w-full text-center">No blog posts available yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

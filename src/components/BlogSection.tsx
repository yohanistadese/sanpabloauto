import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionTitle from "./SectionTitle";
import CheckeredBar from "./CheckeredBar";
import { sampleBlogPosts } from "@/constants";

export default function BlogSection() {
  return (
    <section id="blog" className="border-y border-white/10 bg-zinc-950/70">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="SEO Blog"
          title="Helpful blog content for local search and repeat traffic"
          text="This section is designed to support local mechanic, brakes, oil changes, and car care searches tied to San Pablo and nearby areas."
        />
        <div className="mt-8"><CheckeredBar /></div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sampleBlogPosts.map((post) => (
            <Card key={post.slug} className="rounded-[2rem] border border-white/10 bg-black">
              <CardContent className="p-7">
                <div className="text-sm font-bold uppercase tracking-[0.18em] text-red-500">{post.category}</div>
                <h3 className="mt-3 text-2xl font-black text-white">{post.title}</h3>
                <p className="mt-4 leading-7 text-slate-200">{post.excerpt}</p>
                <Button variant="outline" className="mt-6 rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10">
                  Read Article
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

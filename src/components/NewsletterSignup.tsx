import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NewsletterSignup() {
  const [form, setForm] = React.useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Card className="rounded-[2rem] border border-white/10 bg-black">
      <CardContent className="p-6 sm:p-8">
        <div className="text-sm font-bold uppercase tracking-[0.22em] text-red-500">Newsletter</div>
        <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl">Get coupons, reminders, and local car care tips</h3>
        <p className="mt-4 leading-7 text-slate-200">
          Build an email list for oil change reminders, brake specials, seasonal service tips, and local San Pablo offers.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-4 text-white outline-none placeholder:text-slate-500"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-4 text-white outline-none placeholder:text-slate-500"
            placeholder="Email address"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-4 text-white outline-none placeholder:text-slate-500"
            placeholder="Phone number (optional)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Button type="submit" className="w-full rounded-2xl bg-red-600 py-6 text-base font-bold hover:bg-red-500">
            Sign Up For Updates
          </Button>
        </form>

        <p className="mt-4 text-xs leading-6 text-slate-400">
          By signing up, users agree to receive shop updates and special offers. They can unsubscribe anytime.
        </p>

        {submitted ? (
          <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-600/10 p-4 text-sm text-red-100">
            Thanks for signing up. In production, this form should submit to the newsletter API.
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

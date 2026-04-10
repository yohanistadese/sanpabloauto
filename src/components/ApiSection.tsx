import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from "./SectionTitle";
import CheckeredBar from "./CheckeredBar";
import { aiDiscoveryBlock } from "@/constants";

const newsletterApi = `POST /api/newsletter/subscribe
Content-Type: application/json

{
  "name": "Jane Driver",
  "email": "jane@example.com",
  "phone": "+16505644250",
  "source": "homepage-newsletter"
}`;

const blogApi = `GET /api/blog/posts
GET /api/blog/posts/:slug
POST /api/blog/posts
PUT /api/blog/posts/:slug
DELETE /api/blog/posts/:slug`;

const couponApi = `POST /api/coupons/create
GET /api/coupons/:couponId
POST /api/coupons/:couponId/scan
POST /api/coupons/:couponId/redeem`;

const appointmentApi = `POST /api/appointments/request
GET /api/appointments/availability
POST /api/appointments/confirm`;

export default function ApiSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="API + SEO Setup"
        title="Built-in notes for blog, newsletter, coupons, and scheduling"
        text="This gives your developer direction for wiring the homepage to a backend and supporting search engines, lead capture, coupons, and appointment requests."
      />
      <div className="mt-8"><CheckeredBar /></div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-[2rem] border border-white/10 bg-black">
          <CardContent className="p-7">
            <div className="text-sm font-bold uppercase tracking-[0.18em] text-red-500">Newsletter API</div>
            <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950 p-4 text-xs leading-6 text-slate-300">{newsletterApi}</pre>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem] border border-white/10 bg-black">
          <CardContent className="p-7">
            <div className="text-sm font-bold uppercase tracking-[0.18em] text-white">Blog API</div>
            <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950 p-4 text-xs leading-6 text-slate-300">{blogApi}</pre>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem] border border-white/10 bg-black">
          <CardContent className="p-7">
            <div className="text-sm font-bold uppercase tracking-[0.18em] text-red-500">Coupon API</div>
            <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950 p-4 text-xs leading-6 text-slate-300">{couponApi}</pre>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem] border border-white/10 bg-black">
          <CardContent className="p-7">
            <div className="text-sm font-bold uppercase tracking-[0.18em] text-white">Appointment API</div>
            <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950 p-4 text-xs leading-6 text-slate-300">{appointmentApi}</pre>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Card className="rounded-[2rem] border border-white/10 bg-black">
          <CardContent className="p-7">
            <div className="text-sm font-bold uppercase tracking-[0.18em] text-red-500">AI Discovery File</div>
            <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950 p-4 text-xs leading-6 text-slate-300">{aiDiscoveryBlock}</pre>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

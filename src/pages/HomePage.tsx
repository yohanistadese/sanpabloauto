import React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Clock3,
  Car,
  Star,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CheckeredBar from "@/components/CheckeredBar";
import SectionTitle from "@/components/SectionTitle";
import ChaseDealGame from "@/components/ChaseDealGame";
import NewsletterSignup from "@/components/NewsletterSignup";
import AppointmentScheduler from "@/components/AppointmentScheduler";
import DirectionsSection from "@/components/DirectionsSection";
import BlogSection from "@/components/BlogSection";
import ApiSection from "@/components/ApiSection";
import CouponSection from "@/components/CouponSection";
import { CouponRecord } from "@/types";
import { readCoupons, saveCoupons, createCouponId, createSpecialCode } from "@/lib/coupon";
import {
  fadeUp,
  addressLine,
  directionsUrl,
  phoneDisplay,
  phoneHref,
  visitorStorageKey,
  publicCouponBaseUrl,
  services,
  perks,
  highlights,
  reviews,
} from "@/constants";

export default function HomePage() {
  const [visitorNumber, setVisitorNumber] = React.useState(1);
  const [couponRecord, setCouponRecord] = React.useState<CouponRecord | null>(null);
  const [couponUrl, setCouponUrl] = React.useState("");

  React.useEffect(() => {
    let currentVisitor = 1;
    try {
      const base = 30400;
      const stored = Number(window.localStorage.getItem(visitorStorageKey) || "0");
      currentVisitor = (stored || base) + 1;
      window.localStorage.setItem(visitorStorageKey, String(currentVisitor));
    } catch {
      currentVisitor = 30401;
    }
    setVisitorNumber(currentVisitor);

    const generatedAt = new Date().toISOString();
    const record: CouponRecord = {
      couponId: createCouponId(currentVisitor),
      visitorNumber: currentVisitor,
      generatedAt,
      firstScannedAt: null,
      redeemedAt: null,
      offer: "10% OFF labor",
      address: addressLine,
      specialCode: createSpecialCode(currentVisitor, generatedAt),
    };

    const records = readCoupons();
    records[record.couponId] = record;
    saveCoupons(records);
    setCouponRecord(record);
    setCouponUrl(`${publicCouponBaseUrl}${encodeURIComponent(record.couponId)}`);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AutoRepair",
        name: "SanPabloAuto.com",
        telephone: phoneDisplay,
        address: {
          "@type": "PostalAddress",
          streetAddress: "1960 23rd St",
          addressLocality: "San Pablo",
          addressRegion: "CA",
          postalCode: "94806",
          addressCountry: "US",
        },
        openingHours: ["Mo-Fr 08:00-17:00"],
        description:
          "SanPabloAuto.com is a local San Pablo auto repair shop focused on brake service, oil changes, practical mechanic work, and friendly customer care.",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-black text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-0 top-0 h-[32rem] w-[32rem] rounded-full bg-red-700/15 blur-3xl" />
          <div className="absolute right-0 top-40 h-[28rem] w-[28rem] rounded-full bg-white/10 blur-3xl" />
        </div>

        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/90 backdrop-blur">
          <div
            className="h-3 w-full"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #ffffff 25%, #0a0a0a 25%, #0a0a0a 50%, #ffffff 50%, #ffffff 75%, #0a0a0a 75%, #0a0a0a 100%)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-600 shadow-lg shadow-red-900/40">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-xl font-black tracking-tight text-white">SanPabloAuto.com</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-300 sm:text-xs">
                  Brakes • Oil Changes • Auto Repair
                </div>
              </div>
            </div>
            <nav className="hidden items-center gap-6 md:flex">
              <a href="#services" className="text-sm text-slate-200 transition hover:text-white">Services</a>
              <a href="#appointments" className="text-sm text-slate-200 transition hover:text-white">Appointments</a>
              <a href="#blog" className="text-sm text-slate-200 transition hover:text-white">Blog</a>
              <a href="#directions" className="text-sm text-slate-200 transition hover:text-white">Directions</a>
              <a href="#coupon" className="text-sm text-slate-200 transition hover:text-white">Coupon</a>
            </nav>
            <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:flex-nowrap">
              <a
                href={phoneHref}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-red-600 px-5 py-2 text-sm font-bold text-white hover:bg-red-500 sm:w-auto"
              >
                Call {phoneDisplay}
              </a>
            </div>
          </div>
        </header>

        <main className="relative z-10">
          {/* Announcement + Visitor count */}
          <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
              <div className="rounded-2xl border border-red-500/30 bg-red-600/15 px-4 py-4 text-center text-xs font-bold uppercase tracking-[0.16em] text-red-100 sm:px-5 sm:text-sm">
                Don't miss it — there is a 10% off coupon at the bottom of this page you can cut out or photograph and bring in.
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-4 text-center text-xs font-bold uppercase tracking-[0.16em] text-white sm:px-5 sm:text-sm">
                Visitor Count: <span className="text-red-500">{visitorNumber}</span>
              </div>
            </div>
          </section>

          {/* Hero */}
          <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
            <motion.div initial="hidden" animate="show" variants={fadeUp} className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-red-500/30 bg-red-600/15 px-4 py-2 text-sm font-semibold text-red-200">
                Trusted local auto service in San Pablo
              </div>
              <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Brakes starting at <span className="text-red-500">$170.00</span>
                <br />
                Oil Changes starting at <span className="text-white">$100.00</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
                A bold, pit stop inspired website for a shop that wants customers and search engines to instantly understand what matters most: brake service, oil changes, starting-at pricing, local mechanic work, and friendly care in San Pablo.
              </p>
              <div className="mt-4 rounded-2xl border border-white/10 bg-zinc-950 p-4 text-sm leading-6 text-slate-300">
                <span className="font-bold text-white">Important:</span> All prices shown on this website are{" "}
                <span className="font-bold text-white">starting prices</span>. Final estimates depend on the vehicle, parts needed, condition, and labor required.
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-zinc-950 p-4 text-sm leading-6 text-slate-300">
                <span className="font-bold text-white">Hours:</span> 8am to 5pm.{" "}
                <span className="font-bold text-white">Open some weekends.</span>
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-zinc-950 p-4 text-sm leading-6 text-slate-300">
                <span className="font-bold text-white">Call now:</span>{" "}
                <a href={phoneHref} className="font-bold text-red-400 underline underline-offset-4">
                  {phoneDisplay}
                </a>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-red-600 px-6 py-4 text-base font-bold text-white transition hover:bg-red-500 sm:w-auto"
                >
                  Get Directions <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="#appointments"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-base font-bold text-white transition hover:bg-white/10 sm:w-auto"
                >
                  Book Appointment
                </a>
                <a
                  href={phoneHref}
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-base font-bold text-white transition hover:bg-white/10 sm:w-auto"
                >
                  Call Now
                </a>
              </div>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {perks.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-zinc-950 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-red-500" />
                    <span className="text-sm text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ChaseDealGame />
            </motion.div>
          </section>

          {/* Featured Offers */}
          <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 lg:pb-10">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-red-700/15 blur-xl" />
              <Card className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl shadow-black/40">
                <CardContent className="p-0">
                  <div className="bg-red-600 p-6 sm:p-8">
                    <div className="max-w-md">
                      <div className="text-sm font-bold uppercase tracking-[0.22em] text-white/80">Featured Offers</div>
                      <div className="mt-3 text-2xl font-black leading-tight text-white sm:text-3xl">
                        Simple starting prices that stop people from scrolling.
                      </div>
                      <p className="mt-3 text-white/90">
                        Make the two biggest hooks impossible to miss. Lead with brakes first, oil changes second, and trust everywhere.
                      </p>
                    </div>
                  </div>
                  <div className="p-6"><CheckeredBar /></div>
                  <div className="grid gap-4 px-6 pb-6 sm:grid-cols-2">
                    <div className="rounded-3xl border border-red-500/20 bg-red-600/10 p-6">
                      <div className="text-sm font-bold uppercase tracking-[0.18em] text-red-300">Main Hook</div>
                      <div className="mt-3 text-2xl font-black text-white">Brakes Starting at $170.00</div>
                      <p className="mt-2 text-xs leading-6 text-slate-300">
                        Starting price only. Final quote depends on your vehicle, condition, and required parts.
                      </p>
                    </div>
                    <div className="rounded-3xl border border-white/20 bg-white/5 p-6">
                      <div className="text-sm font-bold uppercase tracking-[0.18em] text-white">Secondary Hook</div>
                      <div className="mt-3 text-2xl font-black text-white">Oil Changes Starting at $100.00</div>
                      <p className="mt-2 text-xs leading-6 text-slate-300">
                        Starting price only. Final quote depends on oil type, filter, vehicle, and service needs.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Services */}
          <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Services"
              title="Lead with the work people are already searching for"
              text="The homepage is built to win local intent fast. The two core starting-price offers do the heavy lifting, then the rest of the site supports trust and convenience."
            />
            <div className="mt-8"><CheckeredBar /></div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <motion.div key={service.title} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
                    <Card className="h-full rounded-[2rem] border border-white/10 bg-black">
                      <CardContent className="p-7">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600">
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="mt-5 text-2xl font-black text-white">{service.title}</h3>
                        <div className="mt-2 text-base font-bold text-red-400">{service.price}</div>
                        <div className="mt-2 text-xs leading-5 text-slate-400">
                          Starting price only. Final quote depends on vehicle and scope of work.
                        </div>
                        <div className="mt-5 space-y-3">
                          {service.bullets.map((bullet) => (
                            <div key={bullet} className="flex items-start gap-3 text-slate-200">
                              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-red-500" />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Appointments */}
          <section id="appointments" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <AppointmentScheduler />
              <div className="grid gap-6">
                <DirectionsSection />
                <NewsletterSignup />
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section id="why-us" className="border-y border-white/10 bg-zinc-950/70">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <SectionTitle
                eyebrow="Why Choose Us"
                title="A neighborhood shop feel with a pit stop brand identity"
                text="This design uses black, bright white, ruby red, and a checkered pattern so the site feels bolder, cleaner, and more memorable."
              />
              <div className="mt-8"><CheckeredBar /></div>
              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {highlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Card key={item.title} className="rounded-[2rem] border border-white/10 bg-black">
                      <CardContent className="p-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
                          <Icon className="h-6 w-6 text-red-500" />
                        </div>
                        <h3 className="mt-5 text-xl font-black text-white">{item.title}</h3>
                        <p className="mt-3 leading-7 text-slate-200">{item.text}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          <BlogSection />
          <ApiSection />

          {/* Reviews */}
          <section id="reviews" className="border-y border-white/10 bg-zinc-950/70">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <SectionTitle
                eyebrow="Reviews Section"
                title="A place for strong local proof once customer reviews are added"
                text="The design leaves space for Google reviews, testimonials, and trust builders so the site can evolve without a redesign."
              />
              <div className="mt-8"><CheckeredBar /></div>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review) => (
                  <Card key={review.name} className="rounded-[2rem] border border-white/10 bg-black">
                    <CardContent className="p-7">
                      <div className="flex gap-1 text-red-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-current" />
                        ))}
                      </div>
                      <p className="mt-5 leading-7 text-slate-200">"{review.text}"</p>
                      <div className="mt-5 font-bold text-white">{review.name}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Contact / CTA */}
          <section id="contact" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-red-600 p-6 sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div>
                  <div className="text-sm font-bold uppercase tracking-[0.22em] text-white/80">Ready to visit</div>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                    The correct Google Voice number is now live and click-to-call ready.
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
                    This version uses the correct phone number throughout the site and lets visitors call directly from mobile and compatible desktop devices.
                  </p>
                </div>
                <div className="rounded-[2rem] bg-black/30 p-6 backdrop-blur">
                  <div className="text-sm text-white/75">Shop info</div>
                  <div className="mt-4 space-y-4 text-white">
                    <div className="flex items-start gap-4">
                      <MapPin className="mt-1 h-5 w-5 text-white" />
                      <div>
                        <div className="font-bold">Address</div>
                        <div className="text-white/85">1960 23rd St, San Pablo, CA 94806</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock3 className="mt-1 h-5 w-5 text-white" />
                      <div>
                        <div className="font-bold">Hours</div>
                        <div className="text-white/85">8am to 5pm<br />Open some weekends</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="mt-1 h-5 w-5 text-white" />
                      <div>
                        <div className="font-bold">Phone Number</div>
                        <a href={phoneHref} className="text-white/85 underline underline-offset-4">
                          {phoneDisplay}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {couponRecord ? <CouponSection couponRecord={couponRecord} couponUrl={couponUrl} /> : null}
        </main>
      </div>
    </>
  );
}

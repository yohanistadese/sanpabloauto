import React from "react";
import { Ticket, ScanLine, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CheckeredBar from "@/components/CheckeredBar";
import { CouponRecord } from "@/types";
import { readCoupons, saveCoupons, formatDateTime } from "@/lib/coupon";
import { directionsUrl, phoneDisplay, phoneHref } from "@/constants";

interface CouponDetailPageProps {
  couponId: string;
}

export default function CouponDetailPage({ couponId }: CouponDetailPageProps) {
  const [coupon, setCoupon] = React.useState<CouponRecord | null>(null);

  React.useEffect(() => {
    const records = readCoupons();
    const record = records[couponId] || null;
    if (record && !record.firstScannedAt) {
      const updated = { ...record, firstScannedAt: new Date().toISOString() };
      records[couponId] = updated;
      saveCoupons(records);
      setCoupon(updated);
      return;
    }
    setCoupon(record ? { ...record } : null);
  }, [couponId]);

  const markRedeemed = () => {
    const records = readCoupons();
    const record = records[couponId];
    if (!record) return;
    const updated = { ...record, redeemedAt: new Date().toISOString() };
    records[couponId] = updated;
    saveCoupons(records);
    setCoupon(updated);
  };

  return (
    <div className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-[2rem] border border-white/10 bg-black p-6 shadow-2xl shadow-red-950/20 sm:p-8">
          <div className="mb-6"><CheckeredBar /></div>
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-600/15 px-4 py-2 text-sm font-semibold text-red-200">
            <Ticket className="h-4 w-4" /> Coupon Detail Page
          </div>
          <h1 className="mt-5 text-3xl font-black sm:text-4xl">SanPabloAuto Coupon Lookup</h1>
          <p className="mt-4 text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
            This page shows the visitor number for this coupon, the time it was created, the unique special code for this customer, and when it was first opened from the QR code.
          </p>

          {coupon ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Card className="rounded-[2rem] border border-white/10 bg-zinc-950">
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-red-500">
                    <ScanLine className="h-4 w-4" /> Coupon Data
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Coupon ID</div>
                    <div className="text-xl font-black break-words">{coupon.couponId}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Visitor Number</div>
                    <div className="text-3xl font-black text-red-500">#{coupon.visitorNumber}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Offer</div>
                    <div className="text-lg font-bold">{coupon.offer}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Special Code</div>
                    <div className="text-2xl font-black text-white break-words">{coupon.specialCode}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Address</div>
                    <div className="text-slate-200">{coupon.address}</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-[2rem] border border-white/10 bg-zinc-950">
                <CardContent className="space-y-4 p-6">
                  <div className="text-sm font-bold uppercase tracking-[0.18em] text-red-500">Timing</div>
                  <div>
                    <div className="text-sm text-slate-400">Coupon Generated</div>
                    <div className="font-bold">{formatDateTime(coupon.generatedAt)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">First QR Scan / First Open</div>
                    <div className="font-bold">{formatDateTime(coupon.firstScannedAt)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Redeemed</div>
                    <div className="font-bold">{formatDateTime(coupon.redeemedAt)}</div>
                  </div>
                  <Button
                    onClick={markRedeemed}
                    className="mt-2 rounded-2xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-500"
                  >
                    Mark Redeemed
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-600/10 p-6 text-red-100">
              Coupon not found in this demo preview. In production, this page should load the coupon record from your database by coupon ID.
            </div>
          )}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 font-bold text-black hover:bg-slate-200"
            >
              Get Directions <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href={phoneHref}
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-5 py-3 font-bold text-white hover:bg-white/10"
            >
              Call {phoneDisplay}
            </a>
            <a
              href="?"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-5 py-3 font-bold text-white hover:bg-white/10"
            >
              Back To Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { CouponRecord } from "@/types";
import { formatDateTime } from "@/lib/coupon";

interface CouponSectionProps {
  couponRecord: CouponRecord;
  couponUrl: string;
}

export default function CouponSection({ couponRecord, couponUrl }: CouponSectionProps) {
  return (
    <section id="coupon" className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mb-4 flex justify-center">
        <a href="#coupon" className="relative inline-block">
          <div
            className="bg-red-600 px-4 py-3 text-base font-black tracking-[0.2em] text-white sm:px-6 sm:text-lg"
            style={{
              clipPath:
                "polygon(0% 0%, 100% 0%, 100% 75%, 90% 100%, 80% 75%, 70% 100%, 60% 75%, 50% 100%, 40% 75%, 30% 100%, 20% 75%, 10% 100%, 0% 75%)",
            }}
          >
            COUPON ↓
          </div>
        </a>
      </div>

      <div className="overflow-hidden rounded-2xl border-2 border-dashed border-white bg-white text-black shadow-xl">
        <div className="bg-red-600 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.2em] text-white sm:text-sm">
          10% OFF COUPON
        </div>

        <div className="grid items-center gap-4 p-4 sm:p-5 md:grid-cols-[1.4fr_0.6fr]">
          <div className="min-w-0 text-sm leading-6">
            <div className="break-words text-base font-bold sm:text-lg">SanPabloAuto.com</div>
            <div className="mt-1 text-[11px] sm:text-xs">1960 23rd St, San Pablo, CA 94806</div>
            <div className="mt-2 text-sm font-bold sm:text-base">10% OFF Labor</div>
            <div className="mt-2 text-[11px] text-zinc-700 sm:text-xs">Starting prices vary by vehicle, parts, and labor.</div>
            <div className="mt-2 break-words text-[11px] sm:text-xs">
              <span className="font-bold">Code:</span> {couponRecord.specialCode}
            </div>
            <div className="text-[11px] sm:text-xs">
              <span className="font-bold">Visitor:</span> #{couponRecord.visitorNumber}
            </div>
            <div className="break-words text-[11px] sm:text-xs">
              <span className="font-bold">Generated:</span> {formatDateTime(couponRecord.generatedAt)}
            </div>
            <div className="mt-2 text-[11px] font-semibold text-red-600 sm:text-xs">
              Cut out OR take a photo of this coupon
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-2">
              <QRCodeSVG value={couponUrl} size={96} className="sm:hidden" />
              <QRCodeSVG value={couponUrl} size={110} className="hidden sm:block" />
            </div>
            <div className="text-center text-[10px] sm:text-[11px]">Scan for details</div>
          </div>
        </div>
      </div>
    </section>
  );
}

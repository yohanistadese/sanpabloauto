import React from "react";
import { Navigation, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { addressLine, directionsUrl, phoneDisplay, phoneHref } from "@/constants";

export default function DirectionsSection() {
  return (
    <Card className="rounded-[2rem] border border-white/10 bg-black">
      <CardContent className="p-6 sm:p-8">
        <div className="text-sm font-bold uppercase tracking-[0.22em] text-red-500">Directions</div>
        <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl">Turn-by-turn directions with one click</h3>
        <p className="mt-4 leading-7 text-slate-200">
          Click below to open turn-by-turn directions to <span className="font-bold text-white">{addressLine}</span>.
        </p>
        <div className="mt-5 rounded-2xl border border-white/10 bg-zinc-900 p-4 text-slate-200">
          1960 23rd St<br />San Pablo, CA 94806
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-base font-bold text-black transition hover:bg-slate-200 sm:w-auto"
          >
            <Navigation className="h-5 w-5" /> Get Turn-by-Turn Directions
          </a>
          <a
            href={phoneHref}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-bold text-white transition hover:bg-white/10 sm:w-auto"
          >
            <Phone className="h-5 w-5" /> Call {phoneDisplay}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

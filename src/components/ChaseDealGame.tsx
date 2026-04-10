import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CheckeredBar from "./CheckeredBar";

export default function ChaseDealGame() {
  const [deals, setDeals] = React.useState([
    { id: 1, label: "$80.00 Oil Change Starting At Special", x: 18, y: 20, caught: false },
    { id: 2, label: "$150.00 Brake Starting At Special", x: 62, y: 58, caught: false },
  ]);
  const [caughtDeal, setCaughtDeal] = React.useState<string | null>(null);

  const moveDeal = (id: number) => {
    if (caughtDeal) return;
    setDeals((prev) =>
      prev.map((deal) => {
        if (deal.id !== id || deal.caught) return deal;
        return {
          ...deal,
          x: Math.max(5, Math.min(82, Math.random() * 82)),
          y: Math.max(10, Math.min(76, Math.random() * 76)),
        };
      })
    );
  };

  const catchDeal = (id: number) => {
    const found = deals.find((deal) => deal.id === id);
    if (!found || caughtDeal) return;
    setCaughtDeal(found.label);
    setDeals((prev) => prev.map((deal) => (deal.id === id ? { ...deal, caught: true } : deal)));
  };

  const resetDeals = () => {
    setCaughtDeal(null);
    setDeals([
      { id: 1, label: "$80.00 Oil Change Starting At Special", x: 18, y: 20, caught: false },
      { id: 2, label: "$150.00 Brake Starting At Special", x: 62, y: 58, caught: false },
    ]);
  };

  return (
    <Card className="rounded-[2rem] border border-red-600/40 bg-black shadow-2xl shadow-red-950/30">
      <CardContent className="p-6 sm:p-8">
        <CheckeredBar />
        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.22em] text-red-500">Catch The Deal</div>
            <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl">Chase the special and snag the lower starting price</h3>
            <p className="mt-3 max-w-2xl text-slate-200 leading-7">
              Standard website pricing is <span className="font-bold text-white">oil changes starting at $100.00</span> and <span className="font-bold text-white">brakes starting at $170.00</span>. Catch a moving bubble to unlock a better starting price.
            </p>
          </div>
          <Button onClick={resetDeals} variant="outline" className="rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10">
            Reset Deals
          </Button>
        </div>

        <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-600/15 p-4 text-sm leading-6 text-red-100">
          <span className="font-bold">Instructions:</span> Chase the moving price bubble with your mouse or finger and click or tap it to claim the deal. Then take a picture of your screen with your phone and show it at the shop to prove you got the starting-at special.
        </div>

        <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-6 text-slate-300">
          Final pricing depends on vehicle, parts, condition, and labor. All specials shown here are starting prices only.
        </div>

        <div className="relative mt-6 h-[280px] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 sm:h-[320px] lg:h-[360px]">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 50%, #ffffff 50%, #ffffff 75%, transparent 75%, transparent 100%)", backgroundSize: "40px 40px" }} />
          {!caughtDeal &&
            deals.map((deal) => (
              <button
                key={deal.id}
                onMouseEnter={() => moveDeal(deal.id)}
                onMouseMove={() => moveDeal(deal.id)}
                onTouchStart={() => moveDeal(deal.id)}
                onClick={() => catchDeal(deal.id)}
                className="absolute max-w-[180px] rounded-full border border-white/20 bg-white px-3 py-2 text-[11px] font-black text-black shadow-xl transition-transform hover:scale-105 active:scale-95 sm:max-w-none sm:px-5 sm:py-3 sm:text-sm"
                style={{ left: `${deal.x}%`, top: `${deal.y}%`, transform: "translate(-50%, -50%)" }}
              >
                {deal.label}
              </button>
            ))}

          {caughtDeal ? (
            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
              <div className="max-w-xl rounded-[2rem] border border-red-500/30 bg-black/90 p-6 text-center shadow-2xl sm:p-8">
                <div className="text-sm font-bold uppercase tracking-[0.22em] text-red-400">Deal Snagged</div>
                <h4 className="mt-3 text-2xl font-black text-white sm:text-3xl">You caught: {caughtDeal}</h4>
                <p className="mt-4 text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
                  Nice job. Take a picture of this screen with your phone and bring it in to claim your special starting price.
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  Final pricing still depends on vehicle, condition, required parts, and labor.
                </p>
                <Button onClick={resetDeals} className="mt-6 rounded-2xl bg-red-600 px-6 py-6 text-base font-bold text-white hover:bg-red-500">
                  Play Again
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

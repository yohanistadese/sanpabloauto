import { CouponRecord } from "../types";
import { couponStorageKey } from "../constants";

export function readCoupons(): Record<string, CouponRecord> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(couponStorageKey) || "{}");
  } catch {
    return {};
  }
}

export function saveCoupons(records: Record<string, CouponRecord>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(couponStorageKey, JSON.stringify(records));
  } catch {}
}

export function createCouponId(visitorNumber: number) {
  const stamp = Date.now().toString(36).toUpperCase();
  return `SPA-${visitorNumber}-${stamp}`;
}

export function createSpecialCode(visitorNumber: number, generatedAt: string) {
  const date = new Date(generatedAt);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const visitorPart = String(visitorNumber).padStart(5, "0");
  return `SPA-${mm}${dd}-${visitorPart}`;
}

export function formatDateTime(value: string | null) {
  if (!value) return "Not yet";
  const d = new Date(value);
  return d.toLocaleString();
}

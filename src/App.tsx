import React from "react";
import HomePage from "./pages/HomePage";
import CouponDetailPage from "./pages/CouponDetailPage";

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const couponId = params.get("coupon");

  if (couponId) {
    return <CouponDetailPage couponId={couponId} />;
  }

  return <HomePage />;
}

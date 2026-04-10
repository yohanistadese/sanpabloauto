export type CouponRecord = {
  couponId: string;
  visitorNumber: number;
  generatedAt: string;
  firstScannedAt: string | null;
  redeemedAt: string | null;
  offer: string;
  address: string;
  specialCode: string;
};

import React from "react";

export default function CheckeredBar() {
  return (
    <div
      className="h-4 w-full rounded-full border border-white/10"
      style={{
        backgroundImage:
          "linear-gradient(45deg, #ffffff 25%, #0a0a0a 25%, #0a0a0a 50%, #ffffff 50%, #ffffff 75%, #0a0a0a 75%, #0a0a0a 100%)",
        backgroundSize: "24px 24px",
      }}
    />
  );
}

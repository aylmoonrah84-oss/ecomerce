import React from "react";
import { ShoppingBag } from "lucide-react";

export default function Loading() {
  return (
    <div
      className="
        fixed inset-0
        z-[9999]
        bg-bg-primary/90
        backdrop-blur-sm
        flex flex-col items-center justify-center
        gap-5
      "
    >
      <div
        className="
          w-20 h-20
          rounded-full
          bg-bg-secondary
          border border-border
          shadow-soft
          flex items-center justify-center
        "
      >
        <ShoppingBag
          className="
            w-8 h-8
            text-accent
            animate-pulse
          "
        />
      </div>

      <div className="flex gap-2">
        <span className="w-2 h-2 rounded-full bg-accent animate-bounce"></span>
        <span
          className="w-2 h-2 rounded-full bg-accent animate-bounce"
          style={{ animationDelay: "0.15s" }}
        ></span>
        <span
          className="w-2 h-2 rounded-full bg-accent animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></span>
      </div>

      <p className="text-text-secondary text-sm">
        در حال بارگذاری...
      </p>
    </div>
  );
}
"use client";

import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-t-transparent",
        {
          "size-4 border-2": size === "sm",
          "size-8 border-2": size === "md",
          "size-12 border-3": size === "lg",
        },
        className
      )}
    />
  );
}

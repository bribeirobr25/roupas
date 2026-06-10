"use client";

import { useI18n } from "@/lib/i18n/provider";

// Placeholder ad slot (CLAUDE §2.6). Must be visually distinct from the analysis
// result and clearly marked as advertising — never confused with the verdict.
export function AdCard() {
  const { dict } = useI18n();
  return (
    <div
      aria-label={dict.ads.placeholder}
      className="flex items-center justify-center rounded-2xl border border-dashed border-line bg-paper px-4 py-12 text-xs uppercase tracking-[0.22em] text-muted/80 select-none"
    >
      {dict.ads.placeholder}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";
import { AdCard } from "./AdCard";

// Analyzing state: rotating, evocative lines with a light CSS cross-fade, plus
// the placeholder ad slots.
export function AnalyzingState() {
  const { dict } = useI18n();
  const steps = dict.analyzing.steps;
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % steps.length), 1900);
    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <section aria-live="polite" aria-label={dict.analyzing.aria} className="w-full">
      <div className="flex items-center justify-center gap-3 py-14">
        <span
          aria-hidden
          className="h-2.5 w-2.5 rounded-full bg-accent"
          style={{ animation: "roupas-pulse 1.3s ease-in-out infinite" }}
        />
        <p
          key={i}
          className="font-display text-2xl italic text-ink sm:text-3xl"
          style={{ animation: "roupas-fade 1.9s ease-in-out" }}
        >
          {steps[i]}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <AdCard />
        <AdCard />
      </div>
    </section>
  );
}

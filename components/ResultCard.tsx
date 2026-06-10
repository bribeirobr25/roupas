"use client";

import { useI18n } from "@/lib/i18n/provider";
import type { Dict } from "@/lib/i18n/dictionaries";
import type { AnalyzeOk, ScoreBand, Wrinkle } from "@/lib/types";

// Band / wrinkle colour tokens — explicit class strings so Tailwind keeps them.
const BAND_TEXT: Record<ScoreBand, string> = {
  high: "text-good",
  medium: "text-warn",
  low: "text-bad",
  indeterminate: "text-indeterminate",
};
const BAND_BAR: Record<ScoreBand, string> = {
  high: "bg-good",
  medium: "bg-warn",
  low: "bg-bad",
  indeterminate: "bg-indeterminate",
};
const WRINKLE_TEXT: Record<Wrinkle, string> = {
  low: "text-good",
  medium: "text-warn",
  high: "text-bad",
  unknown: "text-indeterminate",
};

interface Item {
  label: string;
  value: string;
}

function foundItems(data: AnalyzeOk, dict: Dict): Item[] {
  const f = data.findings;
  const items: Item[] = [];
  if (f.fiberType.verified && f.fiberType.value)
    items.push({ label: dict.finding.fiberType, value: String(f.fiberType.value) });
  if (f.fiber.verified && f.fiber.value)
    items.push({ label: dict.finding.fiber, value: f.fiber.value });
  if (f.gsm.verified && f.gsm.value != null)
    items.push({ label: dict.finding.gsm, value: `${f.gsm.value} g/m²` });
  if (f.weave.verified && f.weave.value)
    items.push({ label: dict.finding.weave, value: String(f.weave.value) });
  if (f.spinning.verified && f.spinning.value)
    items.push({
      label: dict.finding.spinning,
      value: String(f.spinning.value).replace(/-/g, " "),
    });
  if (f.elastane.verified && f.elastane.value != null)
    items.push({ label: dict.finding.elastane, value: `${f.elastane.value}%` });
  if (f.polyester.verified && f.polyester.value != null)
    items.push({ label: dict.finding.polyester, value: `${f.polyester.value}%` });
  if (f.nonIron.value)
    items.push({ label: dict.finding.nonIron, value: dict.value.nonIron });
  if (f.construction.length > 0)
    items.push({
      label: dict.finding.construction,
      value: f.construction.join(", "),
    });
  return items;
}

function missingLabels(data: AnalyzeOk, dict: Dict): string[] {
  const map: Record<string, string> = {
    fiber: dict.finding.fiber,
    fiberType: dict.finding.fiberType,
    gsm: dict.finding.gsm,
    weave: dict.finding.weave,
    spinning: dict.finding.spinning,
  };
  return data.missing.map((k) => map[k]).filter(Boolean);
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted">
      {children}
    </p>
  );
}

export function ResultCard({ data }: { data: AnalyzeOk }) {
  const { dict } = useI18n();
  const found = foundItems(data, dict);
  const missing = missingLabels(data, dict);
  const band = data.score.band;
  const isIndeterminate = band === "indeterminate";

  return (
    <article className="roupas-rise w-full overflow-hidden rounded-3xl border border-line bg-paper-raised shadow-[0_18px_50px_-28px_rgba(10,10,12,0.28)]">
      <div className="p-7 sm:p-10">
        {/* 1. Category */}
        <div className="mb-8">
          <Kicker>{dict.result.detectedCategory}</Kicker>
          <p className="mt-1.5 font-display text-2xl text-ink">
            {dict.category[data.category]}
          </p>
          {data.categoryConfidence === "low" && (
            <p className="mt-1 text-sm text-muted">{dict.result.categoryLow}</p>
          )}
        </div>

        {/* 2. The verdict — the hero */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p
            className={`font-display text-5xl font-black leading-[0.95] tracking-[-0.02em] sm:text-6xl ${BAND_TEXT[band]}`}
          >
            {dict.result.band[band]}
          </p>
          {!isIndeterminate && (
            <div className="shrink-0 sm:text-right">
              <p className={`font-display text-5xl font-light ${BAND_TEXT[band]}`}>
                {data.score.value}
                <span className="text-2xl text-muted">/100</span>
              </p>
              <div className="mt-2 h-1.5 w-44 overflow-hidden rounded-full bg-line">
                <div
                  className={`h-full origin-left rounded-full ${BAND_BAR[band]}`}
                  style={{
                    width: `${data.score.value}%`,
                    animation: "roupas-sweep 0.9s cubic-bezier(0.16,1,0.3,1) both",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* 3. Will it wrinkle? */}
        <div className="mb-9 border-t border-line pt-7">
          <Kicker>{dict.result.wrinkleQuestion}</Kicker>
          <p
            className={`mt-1.5 font-display text-3xl italic ${WRINKLE_TEXT[data.wrinkle]}`}
          >
            {dict.result.wrinkle[data.wrinkle]}
          </p>
        </div>

        {/* 4. What the cloth admits (verified) */}
        {found.length > 0 && (
          <div className="mb-9 border-t border-line pt-7">
            <h2 className="font-display text-xl text-ink">{dict.result.found}</h2>
            <p className="mb-4 text-xs text-muted">{dict.result.verifiedTag}</p>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {found.map((it) => (
                <div key={it.label} className="flex items-baseline gap-2.5">
                  <span aria-hidden className="text-accent">
                    ✓
                  </span>
                  <dt className="text-sm text-muted">{it.label}</dt>
                  <dd className="text-sm font-medium text-ink">{it.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* 5. What it won't say */}
        {missing.length > 0 && (
          <div className="mb-9 border-t border-line pt-7">
            <h2 className="mb-4 font-display text-xl text-ink">
              {dict.result.missing}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {missing.map((label) => (
                <li
                  key={label}
                  className="rounded-full border border-dashed border-line px-3.5 py-1.5 text-sm text-muted"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 6. Audited brand */}
        {data.brandMatch?.ref && (
          <div className="mb-9 border-t border-line pt-7">
            <p className="text-sm leading-relaxed text-ink">
              <span className="font-display text-base font-semibold text-accent">
                {data.brandMatch.name}
              </span>{" "}
              <span className="text-muted">— {dict.result.brandMatch}</span>
            </p>
          </div>
        )}

        {/* 7. Confidence */}
        <div className="flex items-baseline gap-2 border-t border-line pt-7">
          <Kicker>{dict.result.confidenceLabel}</Kicker>
          <span className="text-sm font-medium text-ink">
            {dict.result.confidence[data.confidence]}
          </span>
        </div>
      </div>
    </article>
  );
}

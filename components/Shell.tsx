"use client";

import { useI18n } from "@/lib/i18n/provider";
import { APP_NAME } from "@/lib/brand";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Analyzer } from "./Analyzer";

// Single-page shell: wordmark + language switcher, a magazine-cover headline,
// the pitch, and the analyzer. Typography-led, mobile-first.
export function Shell() {
  const { dict } = useI18n();

  return (
    <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col px-5 py-6 sm:px-8 sm:py-9">
      <header className="flex items-center justify-between">
        <span className="font-display text-xl font-semibold tracking-tight text-ink lowercase">
          {APP_NAME}
          <span className="text-accent">.</span>
        </span>
        <LanguageSwitcher />
      </header>

      <main className="flex flex-1 flex-col justify-center py-12 sm:py-20">
        <h1 className="font-display text-[clamp(2.75rem,9vw,5.5rem)] leading-[0.95] tracking-[-0.02em] text-ink">
          <span className="block font-light italic text-muted">
            {dict.app.headlineLead}
          </span>
          <span className="block font-black">{dict.app.headlineMain}</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {dict.app.tagline}
        </p>

        <div className="mt-9">
          <Analyzer />
        </div>
      </main>

      <footer className="flex items-center justify-between border-t border-line pt-5 text-xs text-muted">
        <span className="lowercase tracking-wide">
          {APP_NAME} — {new Date().getFullYear()}
        </span>
        <span className="hidden sm:inline">read the cloth, not the label</span>
      </footer>
    </div>
  );
}

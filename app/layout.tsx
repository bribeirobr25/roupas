import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/provider";
import { APP_NAME } from "@/lib/brand";

// Display: Bodoni Moda — the high-contrast serif of the fashion press and the
// Mad Men era. Body: Inter — clean, modern, gets out of the way. Self-hosted by
// next/font at build time (no external runtime request).
const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const DESCRIPTION =
  "Paste a link to whatever you're tempted by. We read the cloth — fiber, weight, the way it'll wear — and hand you the truth the price tag won't.";

export const metadata: Metadata = {
  title: `${APP_NAME} — read the cloth, not the label`,
  description: DESCRIPTION,
  openGraph: {
    title: `${APP_NAME} — read the cloth, not the label`,
    description: DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${APP_NAME} — read the cloth, not the label`,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f5f7",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // lang defaults to "en"; the i18n provider sets the real value after mount.
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}

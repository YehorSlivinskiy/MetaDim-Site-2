import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MetaDim — Будуємо на десятиліття",
  description:
    "MetaDim — преміальна будівельна компанія. Житлові, комерційні та промислові об'єкти з гарантією якості.",
  openGraph: {
    title: "MetaDim",
    description: "Преміальне будівництво. Побудовано на десятиліття.",
    type: "website",
    locale: "uk_UA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="font-body bg-zinc-950 text-zinc-100 antialiased overflow-x-hidden">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

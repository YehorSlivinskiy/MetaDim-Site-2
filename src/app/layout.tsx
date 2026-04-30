import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import CookieBanner from "@/components/CookieBanner";
import {
  SITE_URL,
  BUSINESS,
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from "@/lib/seo";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MetaDim — Преміальне будівництво в Україні",
    template: "%s | MetaDim",
  },
  description: BUSINESS.description,
  applicationName: BUSINESS.brandName,
  authors: [{ name: BUSINESS.brandName, url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    "будівельна компанія",
    "будівництво",
    "будівництво Київ",
    "преміальне будівництво",
    "BIM проектування",
    "житлове будівництво",
    "комерційне будівництво",
    "промислове будівництво",
    "реконструкція будівель",
    "генеральний підрядник",
    "MetaDim",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: SITE_URL,
    siteName: BUSINESS.brandName,
    title: "MetaDim — Преміальне будівництво в Україні",
    description: BUSINESS.shortDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MetaDim — преміальне будівництво",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MetaDim — Преміальне будівництво в Україні",
    description: BUSINESS.shortDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  category: "construction",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
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
        <CookieBanner />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}

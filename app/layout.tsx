import type { Metadata } from "next";
import { Caveat, Outfit, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AppShell } from "@/components/AppShell";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, seo } from "@/lib/seo";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: seo.title,
    template: `%s — ${seo.name}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: seo.name, url: SITE_URL }],
  creator: seo.name,
  publisher: seo.name,
  category: "technology",
  applicationName: `${seo.name} Portfolio`,
  alternates: {
    canonical: "/",
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
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE_URL,
    siteName: `${seo.name} — Software Developer & AI Engineer`,
    title: seo.title,
    description: seo.description,
    firstName: seo.firstName,
    lastName: "Killa",
    username: "saumaykilla",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: seo.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  formatDetection: {
    email: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${sora.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream font-sans text-ink">
        <JsonLd />
        <AppShell>{children}</AppShell>
        <Analytics />
      </body>
    </html>
  );
}

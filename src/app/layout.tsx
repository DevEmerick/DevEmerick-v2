import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Guilherme Emerick | Portfólio",
    template: "%s | Guilherme Emerick",
  },
  description:
    "Portfólio de Guilherme Emerick com projetos, experiência profissional e contato para oportunidades de desenvolvimento web.",
  keywords: [
    "Guilherme Emerick",
    "portfolio",
    "full stack",
    "next.js",
    "react",
    "node.js",
    "desenvolvedor web",
  ],
  openGraph: {
    type: "website",
    siteName: "DevEmerick",
    title: "Guilherme Emerick | Portfólio",
    description:
      "Projetos, experiência e contato para oportunidades de desenvolvimento web.",
    locale: "pt_BR",
    url: "/pt-br",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guilherme Emerick | Portfólio",
    description:
      "Projetos, experiência e contato para oportunidades de desenvolvimento web.",
  },
  alternates: {
    languages: {
      "pt-BR": "/pt-br",
      en: "/en",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioPage from "@/components/PortfolioPage";

const locales = ["pt-br", "en"] as const;
type Locale = (typeof locales)[number];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isPt = locale === "pt-br";
  const title = isPt
    ? "Guilherme Emerick | Desenvolvedor Full Stack"
    : "Guilherme Emerick | Full Stack Developer";
  const description = isPt
    ? "Portfólio de Guilherme Emerick com projetos, experiência profissional e contato para oportunidades de desenvolvimento web."
    : "Guilherme Emerick portfolio with projects, professional experience, and contact for web development opportunities.";

  return {
    title,
    description,
    alternates: {
      languages: {
        "pt-BR": "/pt-br",
        en: "/en",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: isPt ? "pt_BR" : "en_US",
      url: isPt ? "/pt-br" : "/en",
      siteName: "DevEmerick",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return <PortfolioPage locale={locale as Locale} />;
}

"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Download, ArrowUp } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Stepper, { Step } from "@/components/Stepper";
import { TerminalPrompt } from "@/components/TerminalPrompt";
import { UnifiedExperienceCard } from "@/components/UnifiedExperienceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { Database, Layout } from "lucide-react";

type Locale = "pt-br" | "en";

type Dictionary = {
  nav: { about: string; experience: string; projects: string; contact: string; openMenu: string; closeMenu: string };
  hero: { subtitleStart: string; subtitleEnd: string; roles: string[]; projectsButton: string; githubButton: string };
  about: {
    title: string;
    p1: string;
    p2: string;
    resumeButton: string;
    statsYears: string;
    statsProjects: string;
  };
  experience: {
    title: string;
    overviewLabel: string;
    tagLabels: [string, string, string];
    items: Array<{ role: string; company: string; period: string; description: string }>;
  };
  projects: {
    title: string;
    subtitle: string;
    openLabel: string;
    items: Array<{ title: string; description: string; tags: string[]; icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>; slug: string; url?: string }>;
  };
  contact: {
    kicker: string;
    title: string;
    namePrompt: string;
    emailPrompt: string;
    messagePrompt: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    errors: {
      generic: string;
      invalidEmail: string;
      shortName: string;
      emptyMessage: string;
    };
    successTitle: string;
    successLines: [string, string, string];
  };
  footer: { built: string; backTop: string; skipToContent: string };
};

const translations: Record<Locale, Dictionary> = {
  "pt-br": {
    nav: {
      about: "Sobre",
      experience: "Experiência",
      projects: "Projetos",
      contact: "Contato",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
    },
    hero: {
      subtitleStart: "Construindo experiências",
      subtitleEnd: "para o próximo nível.",
      roles: ["Full Stack", "Front-end", "Back-end"],
      projectsButton: "Ver_Projetos",
      githubButton: "GitHub",
    },
    about: {
      title: "Sobre Mim",
      p1: "Olá! Sou o Guilherme, um desenvolvedor focado em resolver problemas reais através de código limpo e sistemas bem estruturados. Com sólida experiência no ecossistema JavaScript, transformo conceitos complexos em aplicações web completas e funcionais.",
      p2: "Como Full Stack, domino a criação de interfaces modernas e performáticas com React e Next.js, garantindo a melhor experiência de usuário. No back-end, foco em construir APIs robustas e escaláveis utilizando Node.js, sempre priorizando a segurança e a eficiência do sistema.",
      resumeButton: "Baixar Currículo",
      statsYears: "Anos de Exp",
      statsProjects: "Projetos",
    },
    experience: {
      title: "Experiência Profissional",
      overviewLabel: "Visão Geral",
      tagLabels: ["Performance", "Escalabilidade", "Código Limpo"],
      items: [
        {
          role: "FREELANCER",
          company: "Freelancer",
          period: "2022 - Presente",
          description: "Atuo como freelancer na área de desenvolvimento de software, criando e aprimorando aplicações web de acordo com as necessidades de cada projeto. Tenho formação em Análise e Desenvolvimento de Sistemas e conhecimentos em **JavaScript, TypeScript, React, Next.js, Node.js, APIs REST, HTML, CSS, Tailwind CSS, PostgreSQL, MySQL, Prisma, Git, GitHub, Docker e Vercel**. Desenvolvo projetos full stack, interfaces responsivas, integrações com APIs e soluções personalizadas, buscando sempre aplicar boas práticas de desenvolvimento, organização de código, segurança e experiência do usuário.",
        },
        {
          role: "UX DEVELOPER",
          company: "Digital Group",
          period: "2020-2021",
          description: "Manutenção, modelagem e criação dos principais canais de serviços digitais da Caixa Seguradora, comfoco na experiência do usuário e na eficiência operacional. Desenvolvimento de jornadas conversacionais e automação de fluxos de atendimento no WhatsApp, Instagram e Facebook, utilizando JavaScript para melhorar a inteligência e a personalização das interações.Integração com sistemas internos, garantindo escalabilidade e redução de esforço no atendimento aocliente.",
        },
        {
          role: "ESTÁGIO",
          company: "CNJ",
          period: "2019 - 2020",
          description: "Identificação, análise e correção de erros que impactavam diretamente a experiência dos usuários, contribuindo para a melhoria contínua da interface e da usabilidade do sistema. Atendimento a usuários internos e externos, incluindo advogados, magistrados e equipes técnicas, garantindo suporte eficiente e comunicação clara das necessidades. Criação da Ficha de Atendimento ao Cliente (SAC) para padronização e otimização do fluxo de suporte aos usuários. Desenvolvimento de relatórios personalizados a partir do banco de dados para apoiar decisões estratégicas e acompanhar as demandas do sistema. Colaboração com equipes de desenvolvimento no direcionamento de correções, melhorias e novos requisitos.",
        },
        
      ],
    },
    projects: {
      title: "Projetos em Destaque",
      subtitle: "Projetos Pessoais contruidos ao longo da minha jornada de aprendizado e desenvolvimento, aplicando boas práticas de desenvolvimento e arquitetura de software.",
      openLabel: "Abrir",
      items: [
        {
          title: "MINIGAME",
          description: "Jogo de fugir com o mouse baseado em um jogo de infancia que ficava no clickjogos, inspirado pela nostalgia e diversao que era jogar naquela epoca.",
          tags: ["HTML", "CSS", "JavaScript", "Vercel"],
          icon: Layout,
          slug: "mouse-ashy.vercel",
          url: "https://mouse-ashy.vercel.app/",
        },
        {
          title: "SPIDER-PROJECT",
          description: "Landing Page construida para um projeto de estudo de um filme do homem aranha, com o objetivo de praticar animações e interações com CSS e JavaScript.",
          tags: ["HTML", "SCSS", "JavaScript", "Vercel"],
          icon: Database,
          slug: "spider-man-lake.vercel",
          url: "https://spider-man-lake.vercel.app/",
        },
        {
          title: "NEXUS SAAS",
          description: "Uma plataforma moderna e completa de gerenciamento de tarefas e produtividade, no estilo trello, construída com React e potencializada por IA. O Nexus SaaS é uma demonstração de SaaS que apresenta padrões avançados de UI/UX, organização de tarefas em tempo real e recursos inteligentes de gerenciamento de fluxos de trabalho.",
          tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
          icon: Layout,
          slug: "nexus-saa-s-olive.vercel",
          url: "https://nexus-saa-s-olive.vercel.app/",
        },
      ],
    },
    contact: {
      kicker: "Communication",
      title: "Iniciar Transmissão",
      namePrompt: "Como podemos chamar-lo?",
      emailPrompt: "Qual o seu melhor e-mail?",
      messagePrompt: "Como posso ajudar?",
      namePlaceholder: "Nome completo...",
      emailPlaceholder: "email@exemplo.com",
      messagePlaceholder: "Descreva o seu projeto ou ideia...",
      nameLabel: "Seu nome",
      emailLabel: "Seu e-mail",
      messageLabel: "Mensagem",
      errors: {
        generic: "Não foi possível enviar agora. Tente novamente em instantes.",
        invalidEmail: "Informe um e-mail válido.",
        shortName: "Informe seu nome completo.",
        emptyMessage: "A mensagem não pode estar vazia.",
      },
      successTitle: "Transmissão Concluída",
      successLines: [
        "Exit code: 0x0000 (SUCCESS)",
        "Payload delivered to cloud storage.",
        "Expect a response shortly.",
      ],
    },
    footer: {
      built: "Built with precision.",
      backTop: "Voltar ao topo",
      skipToContent: "Pular para o conteúdo",
    },
  },
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      subtitleStart: "Building",
      subtitleEnd: "experiences for the next level.",
      roles: ["Full Stack", "Front-end", "Back-end"],
      projectsButton: "View_Projects",
      githubButton: "GitHub",
    },
    about: {
      title: "About Me",
      p1: "Hi! I'm Guilherme, a developer focused on solving real problems through clean code and well-structured systems. With solid experience in the JavaScript ecosystem, I turn complex concepts into complete and functional web applications.",
      p2: "As a Full Stack developer, I build modern and high-performance interfaces with React and Next.js to deliver the best user experience. On the back-end, I focus on robust, scalable APIs with Node.js, always prioritizing security and efficiency.",
      resumeButton: "Download Resume",
      statsYears: "Years Exp",
      statsProjects: "Projects",
    },
    experience: {
      title: "Professional Experience",
      overviewLabel: "Overview",
      tagLabels: ["Performance", "Scalability", "Clean Code"],
      items: [
        {
          role: "Full Stack Developer",
          company: "Specialization Projects",
          period: "Current Focus",
          description: "Dedicated to practical deepening in the modern JavaScript ecosystem (React, Next.js, Node.js) and software architecture.",
        },
        {
          role: "Mid-Level Front-end Developer",
          company: "Creative Digital Agency",
          period: "2020 - 2022",
          description: "Built complex interfaces with React and Redux and implemented design systems.",
        },
        {
          role: "Junior Web Developer",
          company: "StartUp Inova",
          period: "2018 - 2020",
          description: "Developed and maintained institutional websites and internal systems using HTML, CSS, JS, and Node.js.",
        },
      ],
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Systems built with precision and industry best practices.",
      openLabel: "Open",
      items: [
        {
          title: "E-commerce Platform",
          description: "Robust platform with Next.js, Stripe, and PostgreSQL focused on performance and sales scalability.",
          tags: ["Next.js", "Stripe", "PostgreSQL"],
          icon: Layout,
          slug: "storefront-v2",
        },
        {
          title: "Real-time Analytics",
          description: "Real-time analytics dashboard using WebSockets and event-driven Node.js architecture.",
          tags: ["Node.js", "WebSockets", "Redis"],
          icon: Database,
          slug: "analytics-engine",
        },
        {
          title: "Nexus SaaS",
          description: "SaaS platform created to practice building modern interfaces and scalable digital experiences.",
          tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
          icon: Layout,
          slug: "nexus-saa-s-olive.vercel",
          url: "https://nexus-saa-s-olive.vercel.app/",
        },
      ],
    },
    contact: {
      kicker: "Communication",
      title: "Start Transmission",
      namePrompt: "How should I call you?",
      emailPrompt: "What's your best email?",
      messagePrompt: "How can I help?",
      namePlaceholder: "Full name...",
      emailPlaceholder: "email@example.com",
      messagePlaceholder: "Describe your project or idea...",
      nameLabel: "Your name",
      emailLabel: "Your email",
      messageLabel: "Message",
      errors: {
        generic: "Could not send right now. Please try again shortly.",
        invalidEmail: "Please enter a valid email.",
        shortName: "Please enter your full name.",
        emptyMessage: "Message cannot be empty.",
      },
      successTitle: "Transmission Completed",
      successLines: [
        "Exit code: 0x0000 (SUCCESS)",
        "Payload delivered to cloud storage.",
        "Expect a response shortly.",
      ],
    },
    footer: {
      built: "Built with precision.",
      backTop: "Back to top",
      skipToContent: "Skip to content",
    },
  },
};

interface PortfolioPageProps {
  locale: Locale;
}

export default function PortfolioPage({ locale }: PortfolioPageProps) {
  const t = useMemo(() => translations[locale], [locale]);

  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
  const [mounted, setMounted] = useState(false);
  const [stepperKey, setStepperKey] = useState(0);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(200);

  const starsLayer1 = useMemo(
    () =>
      Array.from({ length: 70 }).map(() => ({
        top: Math.random() * 100 + "%",
        left: Math.random() * 100 + "%",
        delay: Math.random() * 5 + "s",
        opacity: Math.random() * 0.18 + 0.08,
      })),
    []
  );
  const starsLayer2 = useMemo(
    () =>
      Array.from({ length: 50 }).map(() => ({
        top: Math.random() * 100 + "%",
        left: Math.random() * 100 + "%",
        delay: Math.random() * 5 + "s",
        opacity: Math.random() * 0.22 + 0.12,
      })),
    []
  );
  const starsLayer3 = useMemo(
    () =>
      Array.from({ length: 30 }).map(() => ({
        top: Math.random() * 100 + "%",
        left: Math.random() * 100 + "%",
        delay: Math.random() * 5 + "s",
        opacity: Math.random() * 0.28 + 0.16,
      })),
    []
  );

  useEffect(() => {
    setMounted(true);
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const validateStep = useCallback(
    (step: number) => {
      if (step === 1) return formData.name.trim().length >= 3;
      if (step === 2) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      if (step === 3) return formData.message.trim().length > 0;
      return true;
    },
    [formData]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 500);

      const sections = ["home", "sobre", "experiencia", "projetos", "contato"];
      const current = sections.find((id) => {
        const section = document.getElementById(id);
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 140 && rect.bottom >= 140;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ticker = setTimeout(() => {
      const i = loopNum % t.hero.roles.length;
      const fullText = t.hero.roles[i];
      if (isDeleting) {
        setTypedText(fullText.substring(0, typedText.length - 1));
        setTypingSpeed(100);
      } else {
        setTypedText(fullText.substring(0, typedText.length + 1));
        setTypingSpeed(200);
      }

      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
        setTypingSpeed(500);
      }
    }, typingSpeed);
    return () => clearTimeout(ticker);
  }, [typedText, isDeleting, loopNum, typingSpeed, t.hero.roles]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleFinalStep = useCallback(async () => {
    setSubmitError("");
    setFormState("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const payload = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(payload?.error || t.contact.errors.generic);
      }

      setFormState("success");
      setTimeout(() => {
        setFormState("idle");
        setStepperKey((prev) => prev + 1);
        setFormData({ name: "", email: "", message: "" });
      }, 5000);
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : t.contact.errors.generic;
      setSubmitError(message);
      setFormState("idle");
      return false;
    }
  }, [formData, t.contact.errors.generic]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-blue-500 selection:text-white relative overflow-hidden">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:rounded-md">
        {t.footer.skipToContent}
      </a>

      <div
        className="fixed w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0 transition-transform duration-300 ease-out"
        style={{ transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)` }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-gray-950/85 backdrop-blur-lg border-b border-gray-800/80 shadow-lg py-3"
          : "bg-transparent border-b border-transparent py-5"
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button className="flex-shrink-0 font-bold text-xl tracking-tighter cursor-pointer relative z-10" onClick={() => scrollToSection("home")} aria-label="Home">
              <span className="text-blue-500">Dev</span>Emerick
            </button>
            <div className="hidden md:block relative z-10">
              <div className="ml-10 flex items-center space-x-8">
                {[
                  { key: t.nav.about, id: "sobre" },
                  { key: t.nav.experience, id: "experiencia" },
                  { key: t.nav.projects, id: "projetos" },
                  { key: t.nav.contact, id: "contato" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    aria-current={activeSection === item.id ? "page" : undefined}
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors relative group"
                  >
                    {item.key}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                  </button>
                ))}
                <div className="flex items-center gap-3 ml-2">
                  <Link
                    href="/pt-br"
                    aria-current={locale === "pt-br" ? "page" : undefined}
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors relative group"
                  >
                    PT
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-all ${locale === "pt-br" ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                  </Link>
                  <Link
                    href="/en"
                    aria-current={locale === "en" ? "page" : undefined}
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors relative group"
                  >
                    EN
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-all ${locale === "en" ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:hidden relative z-10">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
                aria-label={isMobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div id="mobile-nav" className="md:hidden border-t border-gray-800/80 bg-gray-950/95 backdrop-blur-lg">
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2">
              {[
                { key: t.nav.about, id: "sobre" },
                { key: t.nav.experience, id: "experiencia" },
                { key: t.nav.projects, id: "projetos" },
                { key: t.nav.contact, id: "contato" },
              ].map((item) => (
                <button
                  key={`mobile-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left px-2 py-2 text-sm text-gray-300 hover:text-white"
                >
                  {item.key}
                </button>
              ))}
              <div className="flex items-center gap-4 px-2 py-2">
                <Link
                  href="/pt-br"
                  aria-current={locale === "pt-br" ? "page" : undefined}
                  className="text-left text-sm text-gray-300 hover:text-white transition-colors relative group"
                >
                  PT
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-all ${locale === "pt-br" ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                </Link>
                <Link
                  href="/en"
                  aria-current={locale === "en" ? "page" : undefined}
                  className="text-left text-sm text-gray-300 hover:text-white transition-colors relative group"
                >
                  EN
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-all ${locale === "en" ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main id="main-content">
        <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 min-h-screen flex flex-col justify-center relative z-10 text-center">
          {mounted && (
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
              <div className="absolute inset-[-10%] w-[120%] h-[120%] transition-transform duration-1000 ease-out" style={{ transform: `translate(${mousePosition.x * -0.005}px, ${mousePosition.y * -0.005}px)` }}>
                {starsLayer1.map((star, i) => (
                  <div
                    key={`s1-${i}`}
                    className="absolute bg-white rounded-full animate-pulse"
                    style={{ top: star.top, left: star.left, width: "1px", height: "1px", opacity: star.opacity, animationDelay: star.delay, animationDuration: "3s", boxShadow: "0 0 6px 1px rgba(255,255,255,0.28)" }}
                  />
                ))}
              </div>
              <div className="absolute inset-[-10%] w-[120%] h-[120%] transition-transform duration-700 ease-out" style={{ transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)` }}>
                {starsLayer2.map((star, i) => (
                  <div
                    key={`s2-${i}`}
                    className="absolute bg-blue-100 rounded-full animate-pulse"
                    style={{ top: star.top, left: star.left, width: "1.5px", height: "1.5px", opacity: star.opacity, animationDelay: star.delay, animationDuration: "4s", boxShadow: "0 0 8px 2px rgba(191,219,254,0.22)" }}
                  />
                ))}
              </div>
              <div className="absolute inset-[-10%] w-[120%] h-[120%] transition-transform duration-500 ease-out" style={{ transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)` }}>
                {starsLayer3.map((star, i) => (
                  <div
                    key={`s3-${i}`}
                    className="absolute bg-blue-300 rounded-full animate-pulse"
                    style={{ top: star.top, left: star.left, width: "2px", height: "2px", opacity: star.opacity, animationDelay: star.delay, animationDuration: "2s", boxShadow: "0 0 10px 3px rgba(96,165,250,0.24)" }}
                  />
                ))}
              </div>
            </div>
          )}
          <FadeIn className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">Guilherme Emerick</h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed h-20 md:h-auto">
              {t.hero.subtitleStart} <span className="text-blue-400 font-semibold">{typedText}</span> {t.hero.subtitleEnd}
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-4">
              <button
                onClick={() => scrollToSection("projetos")}
                className="group bg-white text-black px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-gray-200 transition-all duration-300 shadow-[0_10px_40px_rgba(255,255,255,0.1)] active:scale-95 flex items-center gap-3 font-mono"
              >
                <span>&gt; {t.hero.projectsButton}</span>
              </button>

              <button
                onClick={() => window.open("https://github.com/DevEmerick", "_blank", "noopener,noreferrer")}
                className="group bg-transparent border border-white/20 text-gray-300 hover:text-white px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 hover:bg-white/[0.05] hover:border-white/40 flex items-center gap-3 font-mono"
              >
                <span>&gt; {t.hero.githubButton}</span>
              </button>
            </div>
          </FadeIn>
        </section>

        <section id="sobre" className="py-24 relative z-10">
          <div className="max-w-6xl mx-auto px-4">
            <FadeIn>
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/3 flex justify-center">
                  <div className="relative w-full max-w-80 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-gray-800">
                    <Image
                      src="/myself.jpeg"
                      alt="Guilherme Emerick"
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <h2 className="text-3xl font-bold mb-2">{t.about.title}</h2>
                  <div className="w-16 h-1 bg-blue-600 rounded-full mb-6"></div>

                  <div className="space-y-6">
                    <p className="text-gray-400 text-lg leading-relaxed text-justify">{t.about.p1}</p>
                    <p className="text-gray-400 text-lg leading-relaxed text-justify">{t.about.p2}</p>
                  </div>

                  <div className="mt-10 mb-10">
                    <button className="bg-blue-600/5 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-3 transition-all duration-500 border border-blue-600/20 hover:border-blue-600 hover:scale-105 w-full sm:w-auto">
                      <Download size={18} /> {t.about.resumeButton}
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-gray-950 border border-gray-800 p-4 rounded-xl flex-1 text-center">
                      <span className="block text-3xl font-bold text-blue-500 mb-1">+3</span>
                      <span className="text-sm text-gray-400">{t.about.statsYears}</span>
                    </div>
                    <div className="bg-gray-950 border border-gray-800 p-4 rounded-xl flex-1 text-center">
                      <span className="block text-3xl font-bold text-purple-500 mb-1">+20</span>
                      <span className="text-sm text-gray-400">{t.about.statsProjects}</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section id="experiencia" className="py-24 relative z-10">
          <div className="max-w-6xl mx-auto px-4 text-center mb-24">
            <h2 className="text-3xl font-bold mb-4">{t.experience.title}</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-6xl mx-auto px-4 space-y-24 relative before:absolute before:z-0 before:inset-0 before:left-1/2 before:-translate-x-px before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-gray-800 before:to-transparent hidden md:block">
            {t.experience.items.map((exp, index) => (
              <FadeIn key={index} delay={index * 150} className="relative z-10 flex items-center justify-center">
                <div className="w-full max-w-4xl group relative z-10">
                  <UnifiedExperienceCard {...exp} overviewLabel={t.experience.overviewLabel} tagLabels={t.experience.tagLabels} />
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="md:hidden space-y-12 px-4 max-w-6xl mx-auto">
            {t.experience.items.map((exp, index) => (
              <FadeIn key={`mobile-${index}`}>
                <UnifiedExperienceCard {...exp} overviewLabel={t.experience.overviewLabel} tagLabels={t.experience.tagLabels} />
              </FadeIn>
            ))}
          </div>
        </section>

        <section id="projetos" className="py-24 relative z-10">
          <div className="max-w-6xl mx-auto px-4 text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t.projects.title}</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="mt-6 text-gray-500 max-w-xl mx-auto italic opacity-70">{t.projects.subtitle}</p>
          </div>
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
            {t.projects.items.map((project, index) => (
              <FadeIn key={index} delay={index * 150}>
                <ProjectCard {...project} openLabel={t.projects.openLabel} />
              </FadeIn>
            ))}
          </div>
        </section>

        <section id="contato" className="min-h-screen py-24 md:py-0 relative overflow-hidden z-10 flex items-center">
          <div className="max-w-3xl mx-auto px-4 w-full flex flex-col items-center justify-center">
            <FadeIn className="text-center mb-16 md:mb-20">
              <span className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">{t.contact.kicker}</span>
              <h2 className="text-4xl font-bold text-white tracking-tight">{t.contact.title}</h2>
            </FadeIn>

            <FadeIn delay={200} className="w-full">
              <Stepper
                key={stepperKey}
                formState={formState}
                isLoading={formState === "loading"}
                initialStep={1}
                validateStep={validateStep}
                onFinalStepCompleted={handleFinalStep}
                successTitle={t.contact.successTitle}
                successLines={t.contact.successLines}
              >
                <Step>
                  <div className="space-y-12">
                    <TerminalPrompt label={t.contact.namePrompt} command="./get_user_info --identity" />
                    <label htmlFor="contact-name" className="sr-only">
                      {t.contact.nameLabel}
                    </label>
                    <div className="flex items-start gap-4 font-mono text-xl md:text-2xl">
                      <span className="text-blue-500 mt-1 select-none">&gt;</span>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        aria-invalid={formData.name.trim().length > 0 && formData.name.trim().length < 3}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.contact.namePlaceholder}
                        className="w-full bg-transparent border-none focus:ring-0 text-blue-400 placeholder-gray-800 outline-none caret-blue-500"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                </Step>
                <Step>
                  <div className="space-y-12">
                    <TerminalPrompt label={t.contact.emailPrompt} command="./setup_comm_link --target" />
                    <label htmlFor="contact-email" className="sr-only">
                      {t.contact.emailLabel}
                    </label>
                    <div className="flex items-start gap-4 font-mono text-xl md:text-2xl">
                      <span className="text-blue-500 mt-1 select-none">&gt;</span>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        aria-invalid={formData.email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.contact.emailPlaceholder}
                        className="w-full bg-transparent border-none focus:ring-0 text-blue-400 placeholder-gray-800 outline-none caret-blue-500 autofill:bg-transparent"
                        spellCheck="false"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </Step>
                <Step>
                  <div className="space-y-12">
                    <TerminalPrompt label={t.contact.messagePrompt} command="./prepare_payload --content" />
                    <label htmlFor="contact-message" className="sr-only">
                      {t.contact.messageLabel}
                    </label>
                    <div className="flex items-start gap-4 font-mono text-xl md:text-2xl">
                      <span className="text-blue-500 mt-2 select-none">&gt;</span>
                      <textarea
                        id="contact-message"
                        value={formData.message}
                        aria-invalid={formData.message.length === 0}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        placeholder={t.contact.messagePlaceholder}
                        className="w-full bg-transparent border-none focus:ring-0 text-blue-400 placeholder-gray-800 outline-none resize-none caret-blue-500 leading-relaxed"
                      />
                    </div>
                  </div>
                </Step>
              </Stepper>
            </FadeIn>
            <div aria-live="polite" className="mt-4 min-h-6">
              {submitError ? <p className="text-sm text-red-400 text-center">{submitError}</p> : null}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-950 py-20 border-t border-gray-900 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <div className="font-bold text-2xl tracking-tighter mb-6">
            <span className="text-blue-500">Dev</span>Emerick
          </div>
          <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.4em]">
            Guilherme Emerick © {new Date().getFullYear()} - {t.footer.built}
          </p>
        </div>
      </footer>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={t.footer.backTop}
        className={`fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 ${showBackToTop ? "opacity-100" : "opacity-0"}`}
      >
        <ArrowUp size={24} />
      </button>
    </div>
    
  );
}

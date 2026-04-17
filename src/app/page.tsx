"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Code2, Database, Layout, 
  Terminal, ExternalLink, ChevronDown, Menu, X, User, Send,
  Briefcase, Calendar, Download, ArrowUp, CheckCircle, Info,
  Sparkles, FileJson, FolderCode, Globe, Cpu, MessageSquare, Command, ChevronRight
} from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import Stepper, { Step } from '@/components/Stepper';
import { TerminalPrompt } from '@/components/TerminalPrompt';
import { UnifiedExperienceCard } from '@/components/UnifiedExperienceCard';
import { ProjectCard } from '@/components/ProjectCard';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formState, setFormState] = useState('idle');
  const [mounted, setMounted] = useState(false);
  const [stepperKey, setStepperKey] = useState(0);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(200);
  
  const words = useMemo(() => ['Full Stack', 'Front-end', 'Back-end'], []);

  const starsLayer1 = useMemo(() => Array.from({ length: 70 }).map(() => ({ top: Math.random() * 100 + '%', left: Math.random() * 100 + '%', delay: Math.random() * 5 + 's', opacity: Math.random() * 0.18 + 0.08 })), []);
  const starsLayer2 = useMemo(() => Array.from({ length: 50 }).map(() => ({ top: Math.random() * 100 + '%', left: Math.random() * 100 + '%', delay: Math.random() * 5 + 's', opacity: Math.random() * 0.22 + 0.12 })), []);
  const starsLayer3 = useMemo(() => Array.from({ length: 30 }).map(() => ({ top: Math.random() * 100 + '%', left: Math.random() * 100 + '%', delay: Math.random() * 5 + 's', opacity: Math.random() * 0.28 + 0.16 })), []);

  useEffect(() => {
    setMounted(true);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const validateStep = useCallback((step: number) => {
    if (step === 1) return formData.name.trim().length >= 3;
    if (step === 2) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (step === 3) return formData.message.trim().length > 0;
    return true;
  }, [formData]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efeito de Digitação
  useEffect(() => {
    let ticker = setTimeout(() => {
      const i = loopNum % words.length;
      const fullText = words[i];
      if (isDeleting) {
        setTypedText(fullText.substring(0, typedText.length - 1));
        setTypingSpeed(100);
      } else {
        setTypedText(fullText.substring(0, typedText.length + 1));
        setTypingSpeed(200);
      }
      
      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setLoopNum(prev => prev + 1);
        setTypingSpeed(500);
      }
    }, typingSpeed);
    return () => clearTimeout(ticker);
  }, [typedText, isDeleting, loopNum, typingSpeed, words]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const experiences = [
    {
      role: "Desenvolvedor Full Stack",
      company: "Projetos de Especialização",
      period: "Foco Atual",
      description: "Dedicando tempo ao aprofundamento prático no ecossistema moderno de JavaScript (React, Next.js, Node.js) e arquitetura de software."
    },
    {
      role: "Desenvolvedor Front-end Pleno",
      company: "Agência Digital Creative",
      period: "2020 - 2022",
      description: "Criação de interfaces complexas com React e Redux. Implementação de design systems."
    },
    {
      role: "Desenvolvedor Web Júnior",
      company: "StartUp Inova",
      period: "2018 - 2020",
      description: "Desenvolvimento e manutenção de websites institucionais e sistemas internos utilizando HTML, CSS, JS e Node.js."
    }
  ];

  const projects = [
    {
      title: "E-commerce Platform",
      description: "Plataforma robusta com Next.js, Stripe e PostgreSQL. Focada em performance e escalabilidade de vendas.",
      tags: ["Next.js", "Stripe", "PostgreSQL"],
      icon: Layout,
      slug: "storefront-v2"
    },
    {
      title: "Real-time Analytics",
      description: "Dashboard de análise de dados em tempo real utilizando WebSockets e arquitetura Node.js orientada a eventos.",
      tags: ["Node.js", "WebSockets", "Redis"],
      icon: Database,
      slug: "analytics-engine"
    }
  ];


  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-blue-500 selection:text-white relative overflow-hidden">
      
      <div 
        className="fixed w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0 transition-transform duration-300 ease-out"
        style={{ transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)` }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? 'bg-gray-950/85 backdrop-blur-lg border-b border-gray-800/80 shadow-lg py-3' : 'bg-transparent border-b border-transparent py-5'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0 font-bold text-xl tracking-tighter cursor-pointer relative z-10" onClick={() => scrollToSection('home')}>
              <span className="text-blue-500">Dev</span>Emerick
            </div>
            <div className="hidden md:block relative z-10">
              <div className="ml-10 flex items-center space-x-8">
                {['Sobre', 'Experiência', 'Projetos', 'Contato'].map((item) => (
                  <button key={item} onClick={() => scrollToSection(item.toLowerCase().replace('ê', 'e'))} className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors relative group">
                    {item}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                  </button>
                ))}
              </div>
            </div>
            <div className="md:hidden relative z-10">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white p-2">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 min-h-screen flex flex-col justify-center relative z-10 text-center">
        {mounted && (
          <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
            <div className="absolute inset-[-10%] w-[120%] h-[120%] transition-transform duration-1000 ease-out" style={{ transform: `translate(${mousePosition.x * -0.005}px, ${mousePosition.y * -0.005}px)` }}>
              {starsLayer1.map((star, i) => (
                <div
                  key={`s1-${i}`}
                  className="absolute bg-white rounded-full animate-pulse"
                  style={{ top: star.top, left: star.left, width: '1px', height: '1px', opacity: star.opacity, animationDelay: star.delay, animationDuration: '3s', boxShadow: '0 0 6px 1px rgba(255,255,255,0.28)' }}
                />
              ))}
            </div>
            <div className="absolute inset-[-10%] w-[120%] h-[120%] transition-transform duration-700 ease-out" style={{ transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)` }}>
              {starsLayer2.map((star, i) => (
                <div
                  key={`s2-${i}`}
                  className="absolute bg-blue-100 rounded-full animate-pulse"
                  style={{ top: star.top, left: star.left, width: '1.5px', height: '1.5px', opacity: star.opacity, animationDelay: star.delay, animationDuration: '4s', boxShadow: '0 0 8px 2px rgba(191,219,254,0.22)' }}
                />
              ))}
            </div>
            <div className="absolute inset-[-10%] w-[120%] h-[120%] transition-transform duration-500 ease-out" style={{ transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)` }}>
              {starsLayer3.map((star, i) => (
                <div
                  key={`s3-${i}`}
                  className="absolute bg-blue-300 rounded-full animate-pulse"
                  style={{ top: star.top, left: star.left, width: '2px', height: '2px', opacity: star.opacity, animationDelay: star.delay, animationDuration: '2s', boxShadow: '0 0 10px 3px rgba(96,165,250,0.24)' }}
                />
              ))}
            </div>
          </div>
        )}
        <FadeIn className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">Guilherme Emerick</h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed h-20 md:h-auto">Construindo experiências <span className="text-blue-400 font-semibold">{typedText}</span> para o próximo nível.</p>
          
          {/* BOTÕES REFINADOS */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-4">
            <button 
              onClick={() => scrollToSection('projetos')} 
              className="group bg-white text-black px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-gray-200 transition-all duration-300 shadow-[0_10px_40px_rgba(255,255,255,0.1)] active:scale-95 flex items-center gap-3 font-mono"
            >
              <span>&gt; Ver_Projetos</span>
            </button>
            
            <button 
              onClick={() => window.open('https://github.com/DevEmerick', '_blank')} 
              className="group bg-transparent border border-white/20 text-gray-300 hover:text-white px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 hover:bg-white/[0.05] hover:border-white/40 flex items-center gap-3 font-mono"
            >
              <span>&gt; GitHub</span>
            </button>
          </div>
        </FadeIn>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-2 border-gray-800 group">
                  <div className="absolute inset-0 bg-blue-500/20 group-hover:bg-transparent z-10 transition-colors"></div>
                  <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Guilherme&backgroundColor=1e293b" alt="Guilherme Emerick" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 relative z-0" />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-3xl font-bold mb-2">Sobre Mim</h2>
                <div className="w-16 h-1 bg-blue-600 rounded-full mb-6"></div>
                
                {/* RESTAURAÇÃO DO TEXTO PROFISSIONAL DETALHADO */}
                <div className="space-y-6">
                  <p className="text-gray-400 text-lg leading-relaxed text-justify">
                    Olá! Sou o Guilherme, um desenvolvedor focado em resolver problemas reais através de código limpo e sistemas bem estruturados. Com sólida experiência no ecossistema JavaScript, transformo conceitos complexos em aplicações web completas e funcionais.
                  </p>
                  <p className="text-gray-400 text-lg leading-relaxed text-justify">
                    Como Full Stack, domino a criação de interfaces modernas e performáticas com <strong className="text-gray-200 font-semibold">React</strong> e <strong className="text-gray-200 font-semibold">Next.js</strong>, garantindo a melhor experiência de usuário. No back-end, foco em construir APIs robustas e escaláveis utilizando <strong className="text-gray-200 font-semibold">Node.js</strong>, sempre priorizando a segurança e a eficiência do sistema.
                  </p>
                </div>
                
                <div className="mt-10 mb-10"><button className="bg-blue-600/5 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-3 transition-all duration-500 border border-blue-600/20 hover:border-blue-600 hover:scale-105 w-full sm:w-auto"><Download size={18} /> Baixar Currículo</button></div>
                <div className="flex gap-4">
                  <div className="bg-gray-950 border border-gray-800 p-4 rounded-xl flex-1 text-center"><span className="block text-3xl font-bold text-blue-500 mb-1">+3</span><span className="text-sm text-gray-400">Anos de Exp</span></div>
                  <div className="bg-gray-950 border border-gray-800 p-4 rounded-xl flex-1 text-center"><span className="block text-3xl font-bold text-purple-500 mb-1">+20</span><span className="text-sm text-gray-400">Projetos</span></div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Experiência Section */}
      <section id="experiencia" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4 text-center mb-24">
          <h2 className="text-3xl font-bold mb-4">Experiência Profissional</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 space-y-24 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-px before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-gray-800 before:to-transparent hidden md:block">
          {experiences.map((exp, index) => (
            <FadeIn key={index} delay={index * 150} className="relative flex items-center justify-center">
              <div className="w-full max-w-4xl group"><UnifiedExperienceCard {...exp} /></div>
            </FadeIn>
          ))}
        </div>
        <div className="md:hidden space-y-12 px-4 max-w-6xl mx-auto">{experiences.map((exp, index) => (<FadeIn key={`mobile-${index}`}><UnifiedExperienceCard {...exp} /></FadeIn>))}</div>
      </section>

      {/* Projetos Section */}
      <section id="projetos" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Projetos em Destaque</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-500 max-w-xl mx-auto italic opacity-70">Sistemas construídos com precisão e as melhores práticas da indústria.</p>
        </div>
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <FadeIn key={index} delay={index * 150}>
              <ProjectCard {...project} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="min-h-screen py-24 md:py-0 relative overflow-hidden z-10 flex items-center">
        <div className="max-w-3xl mx-auto px-4 w-full flex flex-col items-center justify-center">
          <FadeIn className="text-center mb-16 md:mb-20">
            <span className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Communication</span>
            <h2 className="text-4xl font-bold text-white tracking-tight">Iniciar Transmissão</h2>
          </FadeIn>

          <FadeIn delay={200} className="w-full">
            <Stepper
              key={stepperKey}
              initialStep={1}
              formState={formState}
              validateStep={validateStep}
              onFinalStepCompleted={() => {
                setFormState('loading');
                setTimeout(() => {
                  setFormState('success');
                  setTimeout(() => {
                    setFormState('idle');
                    setStepperKey(prev => prev + 1);
                    setFormData({ name: '', email: '', message: '' });
                  }, 5000);
                }, 1500);
              }}
            >
              <Step>
                <div className="space-y-12">
                  <TerminalPrompt label="Como podemos chamar-lo?" command="./get_user_info --identity" />
                  <div className="flex items-start gap-4 font-mono text-xl md:text-2xl">
                    <span className="text-blue-500 mt-1 select-none">&gt;</span>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nome completo..."
                      className="w-full bg-transparent border-none focus:ring-0 text-blue-400 placeholder-gray-800 outline-none caret-blue-500"
                      spellCheck="false"
                    />
                  </div>
                </div>
              </Step>
              <Step>
                <div className="space-y-12">
                  <TerminalPrompt label="Qual o seu melhor e-mail?" command="./setup_comm_link --target" />
                  <div className="flex items-start gap-4 font-mono text-xl md:text-2xl">
                    <span className="text-blue-500 mt-1 select-none">&gt;</span>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@exemplo.com"
                      className="w-full bg-transparent border-none focus:ring-0 text-blue-400 placeholder-gray-800 outline-none caret-blue-500 autofill:bg-transparent"
                      spellCheck="false"
                      autoComplete="off"
                    />
                  </div>
                </div>
              </Step>
              <Step>
                <div className="space-y-12">
                  <TerminalPrompt label="Como posso ajudar?" command="./prepare_payload --content" />
                  <div className="flex items-start gap-4 font-mono text-xl md:text-2xl">
                    <span className="text-blue-500 mt-2 select-none">&gt;</span>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      placeholder="Descreva o seu projeto ou ideia..."
                      className="w-full bg-transparent border-none focus:ring-0 text-blue-400 placeholder-gray-800 outline-none resize-none caret-blue-500 leading-relaxed"
                    />
                  </div>
                </div>
              </Step>
            </Stepper>
          </FadeIn>
        </div>
      </section>

      <footer className="bg-gray-950 py-20 border-t border-gray-900 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <div className="font-bold text-2xl tracking-tighter mb-6"><span className="text-blue-500">Dev</span>Emerick</div>
          <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.4em]">Guilherme Emerick © {new Date().getFullYear()} - Built with precision.</p>
        </div>
      </footer>
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        className={`fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 ${showBackToTop ? 'opacity-100' : 'opacity-0'}`}
      ><ArrowUp size={24} /></button>
    </div>
  );
}


"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  // Github, Linkedin, 
  Mail, Code2, Database, Layout, 
  Terminal, ExternalLink, ChevronDown, Menu, X, User, Send,
  Briefcase, Calendar, Download, ArrowUp, CheckCircle, Info
} from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import Stepper, { Step } from '@/components/Stepper';

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

  const starsLayer1 = useMemo(() => Array.from({ length: 70 }).map(() => ({ top: Math.random() * 100 + '%', left: Math.random() * 100 + '%', delay: Math.random() * 5 + 's', opacity: Math.random() * 0.1 + 0.02 })), []);
  const starsLayer2 = useMemo(() => Array.from({ length: 40 }).map(() => ({ top: Math.random() * 100 + '%', left: Math.random() * 100 + '%', delay: Math.random() * 5 + 's', opacity: Math.random() * 0.15 + 0.05 })), []);
  const starsLayer3 = useMemo(() => Array.from({ length: 20 }).map(() => ({ top: Math.random() * 100 + '%', left: Math.random() * 100 + '%', delay: Math.random() * 5 + 's', opacity: Math.random() * 0.2 + 0.08 })), []);

  useEffect(() => {
    setMounted(true);
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
              <div className="ml-10 flex items-center space-x-6">
                {['Sobre', 'Experiência', 'Projetos', 'Contato'].map((item) => (
                  <button key={item} onClick={() => scrollToSection(item.toLowerCase().replace('ê', 'e'))} className="text-gray-300 hover:text-white px-2 py-2 rounded-md text-sm font-medium transition-colors relative group">
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
      <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 min-h-screen flex flex-col justify-center relative z-10">
        {mounted && (
          <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
            <div className="absolute inset-[-10%] w-[120%] h-[120%] transition-transform duration-1000 ease-out" style={{ transform: `translate(${mousePosition.x * -0.005}px, ${mousePosition.y * -0.005}px)` }}>
              {starsLayer1.map((star, i) => <div key={`s1-${i}`} className="absolute bg-white rounded-full animate-pulse" style={{ top: star.top, left: star.left, width: '1px', height: '1px', opacity: star.opacity, animationDelay: star.delay, animationDuration: '3s' }} />)}
            </div>
            <div className="absolute inset-[-10%] w-[120%] h-[120%] transition-transform duration-700 ease-out" style={{ transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)` }}>
              {starsLayer2.map((star, i) => <div key={`s2-${i}`} className="absolute bg-blue-100 rounded-full animate-pulse" style={{ top: star.top, left: star.left, width: '1.5px', height: '1.5px', opacity: star.opacity, animationDelay: star.delay, animationDuration: '4s' }} />)}
            </div>
            <div className="absolute inset-[-10%] w-[120%] h-[120%] transition-transform duration-500 ease-out" style={{ transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)` }}>
              {starsLayer3.map((star, i) => <div key={`s3-${i}`} className="absolute bg-blue-300 rounded-full animate-pulse" style={{ top: star.top, left: star.left, width: '2px', height: '2px', opacity: star.opacity, animationDelay: star.delay, animationDuration: '2s', boxShadow: '0 0 5px 1px rgba(96,165,250,0.05)' }} />)}
            </div>
          </div>
        )}
        <FadeIn className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">Guilherme Emerick</h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed h-20 md:h-auto">Desenvolvedor <span className="text-blue-400 font-semibold">{typedText}</span><span className="animate-pulse">|</span> focado em construir aplicações web robustas e de alto desempenho.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => scrollToSection('projetos')} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.3)] w-full sm:w-auto"><Terminal size={20} /> Ver Projetos</button>
            <button onClick={() => window.open('https://github.com', '_blank')} className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all border border-gray-700 hover:scale-105 w-full sm:w-auto">GitHub</button>
          </div>
        </FadeIn>
        
        <FadeIn delay={600} className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <button onClick={() => scrollToSection('sobre')} className="text-gray-500 hover:text-white transition-colors"><ChevronDown size={32} /></button>
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
        <div className="max-w-4xl mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Experiência Profissional</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </FadeIn>
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-800">
            {experiences.map((exp, index) => (
              <FadeIn key={index} delay={index * 150} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-950 bg-gray-800 group-hover:bg-blue-500 transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"><Briefcase size={16} /></div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-gray-950 border border-gray-800 p-6 rounded-2xl transition-all"><h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3><h4 className="text-gray-500 mb-4">{exp.company}</h4><p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p></div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Projetos Section */}
      <section id="projetos" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Projetos</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn className="bg-gray-950 border border-gray-800 p-6 rounded-2xl hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500"><Layout size={24} /></div>
                <h3 className="text-xl font-bold">E-commerce Platform</h3>
              </div>
              <p className="text-gray-400 text-sm mb-6">Plataforma robusta com Next.js, Stripe e PostgreSQL. Focada em performance e escalabilidade.</p>
              <div className="flex gap-2"><span className="text-[10px] bg-gray-800 px-2 py-1 rounded">Next.js</span><span className="text-[10px] bg-gray-800 px-2 py-1 rounded">PostgreSQL</span></div>
            </FadeIn>
            <FadeIn className="bg-gray-950 border border-gray-800 p-6 rounded-2xl hover:border-purple-500/50 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500"><Database size={24} /></div>
                <h3 className="text-xl font-bold">Real-time Analytics</h3>
              </div>
              <p className="text-gray-400 text-sm mb-6">Dashboard de análise de dados em tempo real utilizando WebSockets e Node.js.</p>
              <div className="flex gap-2"><span className="text-[10px] bg-gray-800 px-2 py-1 rounded">Node.js</span><span className="text-[10px] bg-gray-800 px-2 py-1 rounded">Redis</span></div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="py-24 relative overflow-hidden z-10">
        <div className="max-w-2xl mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Vamos Trabalhar Juntos?</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
          </FadeIn>
          <FadeIn delay={200} className="bg-gray-900/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-gray-800 shadow-xl relative overflow-hidden">
            <div className={`absolute inset-0 bg-gray-900/95 backdrop-blur-md z-20 flex flex-col items-center justify-center transition-all duration-500 ${formState === 'success' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              <CheckCircle size={64} className="text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Mensagem Enviada!</h3>
              <p className="text-gray-400 text-center">Retornarei o mais breve possível.</p>
            </div>
            <Stepper key={stepperKey} initialStep={1} validateStep={validateStep} onFinalStepCompleted={() => { setFormState('loading'); setTimeout(() => { setFormState('success'); setTimeout(() => { setFormState('idle'); setStepperKey(prev => prev + 1); setFormData({ name: '', email: '', message: '' }); }, 5000); }, 1500); }}>
              <Step>
                <div className="space-y-4">
                  <div>
                    <label className="text-base font-medium text-gray-200 block">Como podemos chamá-lo?</label>
                    <p className="text-sm text-gray-500 mt-1">Saber o seu nome me ajuda a personalizar a nossa conversa.</p>
                  </div>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Seu nome completo" className="w-full bg-gray-950/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-blue-500 transition-all outline-none" />
                  <div className="bg-blue-500/5 border border-blue-500/10 p-3 rounded-lg flex gap-3 items-start">
                    <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-400 leading-relaxed italic">Dica: Usar seu nome real facilita o primeiro contacto e ajuda a estabelecer uma ligação profissional.</p>
                  </div>
                </div>
              </Step>
              <Step>
                <div className="space-y-4">
                  <div>
                    <label className="text-base font-medium text-gray-200 block">Qual o seu melhor e-mail?</label>
                    <p className="text-sm text-gray-500 mt-1">Prometo que não enviarei spam, apenas o necessário.</p>
                  </div>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="exemplo@dominio.com" className="w-full bg-gray-950/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-blue-500 transition-all outline-none" />
                  <div className="bg-gray-800/30 p-3 rounded-lg flex gap-3 items-start border border-gray-800">
                    <Mail size={16} className="text-gray-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-400 leading-relaxed">Costumo responder a todos os contactos profissionais num prazo de 24 a 48 horas úteis.</p>
                  </div>
                </div>
              </Step>
              <Step>
                <div className="space-y-4">
                  <div>
                    <label className="text-base font-medium text-gray-200 block">Como posso ajudar?</label>
                    <p className="text-sm text-gray-500 mt-1">Conte-me sobre o projeto ou a oportunidade.</p>
                  </div>
                  <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={3} placeholder="Escreva aqui os detalhes..." className="w-full bg-gray-950/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-blue-500 transition-all outline-none resize-none" />
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                    <div className="flex items-center gap-1.5"><CheckCircle size={10} className="text-blue-500" /> Escopo</div>
                    <div className="flex items-center gap-1.5"><CheckCircle size={10} className="text-blue-500" /> Prazos</div>
                    <div className="flex items-center gap-1.5"><CheckCircle size={10} className="text-blue-500" /> Tecnologias</div>
                    <div className="flex items-center gap-1.5"><CheckCircle size={10} className="text-blue-500" /> Objetivos</div>
                  </div>
                </div>
              </Step>
            </Stepper>
          </FadeIn>
        </div>
      </section>

      <footer className="bg-gray-950 py-8 border-t border-gray-900 text-center text-gray-600 text-sm">© {new Date().getFullYear()} Guilherme Emerick.</footer>
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        className={`fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 ${showBackToTop ? 'opacity-100' : 'opacity-0'}`}
      ><ArrowUp size={24} /></button>
    </div>
  );
}


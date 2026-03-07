import "./App.css";
import Folder from "./components/animation/folder.js";
import MiniProjectCard from "./components/MiniProjectCard.js";
import MiniLinkCard from "./components/MiniLinkCard.js";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faHandPointer, faEnvelope, faGlobe, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();
  const folderRef = useRef(null);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const timeoutRef = useRef(null);

  // Monitor window resize for responsive folder sizing
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate folder size proportionally based on viewport width
  const getFolderSize = () => {
    if (windowWidth < 360) return 0.65;      // Mobile XS
    if (windowWidth < 480) return 0.75;      // Mobile SM
    if (windowWidth < 640) return 0.85;      // Mobile MD
    if (windowWidth < 768) return 0.9;       // Mobile LG
    if (windowWidth < 1024) return 0.95;     // Tablet
    return 1;                                // Desktop+
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    // Reload rápido e eficiente
    window.location.href = window.location.pathname;
  };

  const handleContactsClick = (e) => {
    e.preventDefault();
    setIsContactsOpen(!isContactsOpen);
  };

  const handleProjectsClick = (e) => {
    e.preventDefault();
    
    if (isFolderOpen) {
      // Se já está aberto, fecha
      folderRef.current?.close();
      setIsFolderOpen(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    } else {
      // Se está fechado, abre e inicia o timer
      folderRef.current?.open();
      setIsFolderOpen(true);
      
      // Limpa timeout anterior se existir
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      // Define novo timeout de 5 segundos
      timeoutRef.current = setTimeout(() => {
        folderRef.current?.close();
        setIsFolderOpen(false);
      }, 5000);
    }
  };

  // Handle folder state changes and auto-close timer
  const handleFolderInteract = (isOpen) => {
    setIsFolderOpen(isOpen);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Reset auto-close timer if folder is opened
    if (isOpen) {
      timeoutRef.current = setTimeout(() => {
        folderRef.current?.close();
        setIsFolderOpen(false);
      }, 5000);
    }
  };

  // Limpar timeout ao desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);  return (
    <div className="App text-white min-h-screen flex flex-col scroll-smooth" style={{scrollbarGutter: 'stable'}}>
      <div className="flex flex-col laptop:h-screen laptop:max-h-[1080px]">
        
        {/* Navbar */}
        <div className="navmenu fixed top-0 left-0 right-0 text-white z-40" style={{backgroundColor: 'rgba(15, 23, 42, 0.85)', WebkitBackdropFilter: 'blur(4px)', backdropFilter: 'blur(4px)'}} >
          <div className="container mx-auto flex justify-between items-center p-3 mobile:p-5 laptop:px-[100px] relative">
            {/* Logo/Branding - Sempre visível */}
            <a href="#home" onClick={handleHomeClick} className="text-lg mobile:text-xl tablet:text-2xl font-bold tracking-tight">
              DevEmerick<span className="text-orange-500">.</span>
            </a>

            {/* Logo Centro - Oculto em tablet e abaixo */}
            <div className="absolute left-1/2 -translate-x-1/2 hidden laptop:block">
              <img src="/projects/img/logo.png" alt="Logo DevEmerick" className="h-7" />
            </div>

            {/* Desktop Navigation - Visível apenas em laptop e acima */}
            <div className="navlinks hidden laptop:flex items-center gap-8">
              <a
                href="#home"
                onClick={handleHomeClick}
                className="text-lg hover:text-indigo-400 transition-colors"
              >
                <span className="text-orange-500">#</span> {t('nav.home')}
              </a>
              <a
                href="#projects"
                onClick={handleProjectsClick}
                className="text-lg hover:text-indigo-400 transition-colors"
              >
                <span className="text-orange-500">#</span> {t('nav.projects')}
              </a>
              <a
                href="#contact"
                onClick={handleContactsClick}
                className="text-lg hover:text-indigo-400 transition-colors"
              >
                <span className="text-orange-500">#</span> {t('nav.contacts')}
              </a>

              {/* Language Selector - Desktop */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faGlobe} className="text-orange-400" />
                  <span className="text-sm font-semibold uppercase">{i18n.language}</span>
                </button>
                
                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-slate-800 rounded-lg shadow-lg border border-slate-700 z-50 overflow-hidden animate-fadeIn">
                    <button
                      onClick={() => {
                        i18n.changeLanguage('pt');
                        setIsLanguageOpen(false);
                      }}
                      className={`block w-full px-4 py-3 text-sm text-left hover:bg-slate-700 transition-colors ${ i18n.language === 'pt' ? 'bg-orange-500/20 text-orange-400' : 'text-white'}`}
                    >
                      Português
                    </button>
                    <button
                      onClick={() => {
                        i18n.changeLanguage('en');
                        setIsLanguageOpen(false);
                      }}
                      className={`block w-full px-4 py-3 text-sm text-left hover:bg-slate-700 transition-colors ${ i18n.language === 'en' ? 'bg-orange-500/20 text-orange-400' : 'text-white'}`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        i18n.changeLanguage('es');
                        setIsLanguageOpen(false);
                      }}
                      className={`block w-full px-4 py-3 text-sm text-left hover:bg-slate-700 transition-colors ${ i18n.language === 'es' ? 'bg-orange-500/20 text-orange-400' : 'text-white'}`}
                    >
                      Español
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Hamburger Menu - Visível apenas em tablet e abaixo */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="laptop:hidden text-orange-500 text-2xl hover:text-orange-400 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </button>
          </div>

          {/* Mobile Menu - Dropdown */}
          {isMenuOpen && (
            <div className="laptop:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-700 animate-fadeIn">
              <div className="flex flex-col px-4 mobile:px-6 py-4 space-y-3 mobile:space-y-4">
                {/* Home Link */}
                <a
                  href="#home"
                  onClick={(e) => {
                    handleHomeClick(e);
                    setIsMenuOpen(false);
                  }}
                  className="text-sm mobile:text-base text-white hover:text-indigo-400 transition-colors py-2"
                >
                  <span className="text-orange-500">#</span> {t('nav.home')}
                </a>

                {/* Projects Link */}
                <a
                  href="#projects"
                  onClick={(e) => {
                    handleProjectsClick(e);
                    setIsMenuOpen(false);
                  }}
                  className="text-sm mobile:text-base text-white hover:text-indigo-400 transition-colors py-2"
                >
                  <span className="text-orange-500">#</span> {t('nav.projects')}
                </a>

                {/* Contacts Link */}
                <a
                  href="#contact"
                  onClick={(e) => {
                    handleContactsClick(e);
                    setIsMenuOpen(false);
                  }}
                  className="text-sm mobile:text-base text-white hover:text-indigo-400 transition-colors py-2"
                >
                  <span className="text-orange-500">#</span> {t('nav.contacts')}
                </a>

                {/* Language Selector - Mobile */}
                <div className="border-t border-slate-700 pt-3 mobile:pt-4 mt-3 mobile:mt-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Idioma</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        i18n.changeLanguage('pt');
                        setIsMenuOpen(false);
                      }}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${ i18n.language === 'pt' ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-700/50 text-white hover:bg-slate-700'}`}
                    >
                      PT
                    </button>
                    <button
                      onClick={() => {
                        i18n.changeLanguage('en');
                        setIsMenuOpen(false);
                      }}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${ i18n.language === 'en' ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-700/50 text-white hover:bg-slate-700'}`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => {
                        i18n.changeLanguage('es');
                        setIsMenuOpen(false);
                      }}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${ i18n.language === 'es' ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-700/50 text-white hover:bg-slate-700'}`}
                    >
                      ES
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Seção de Apresentação (Hero) */}
        <main className="content container mx-auto flex-grow flex flex-col gap-6 mobile:gap-6 tablet:gap-8 laptop:gap-10 desktop:gap-20 laptop:grid laptop:grid-cols-[1fr_auto_1fr] items-center justify-center px-4 mobile:px-6 laptop:px-10 desktop-lg:px-[100px] relative overflow-hidden pt-16 mobile:pt-20 tablet:pt-24 laptop:pt-0">
          <img
            src="/projects/img/developer.png"
            alt=""
            className="watermark hidden laptop:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto pointer-events-none z-0 scale-[0.85]"
          />
          {/* Coluna 1: Apresentação */}
          <div className="presentation text-center laptop:text-left order-2 laptop:order-1 relative z-10 laptop:translate-y-56 w-[calc(100%+15px)]">
            <h1 className="text-2xl mobile:text-3xl mobile-lg:text-4xl tablet:text-5xl laptop:text-6xl font-bold leading-tight" style={{ opacity: isFolderOpen ? 0.4 : 1, transition: 'opacity 0.3s ease' }}>
              {t('hero.greeting')} <br />
              {t('hero.name')}{" "}
              <span className="text-white animate-blink ml-1 inline-block transform scale-x-75 scale-y-90">
                {" "}
                |
              </span>
            </h1>
            <div style={{ marginTop: '32px' }} className="mobile:mt-[48px] laptop:mt-[72px]">
              <div className="flex items-center justify-center laptop:justify-start gap-4 mobile:gap-6">
                <Folder
                  ref={folderRef}
                  size={getFolderSize()}
                  color="#5227FF"
                  label={<FontAwesomeIcon icon={faHandPointer} className="click-me-icon" />}
                  className="custom-folder"
                  onInteract={handleFolderInteract}
                  items={[
                    <MiniLinkCard
                      icon={faGithub}
                      label="GitHub"
                      href="https://github.com/DevEmerick"
                      bgColor="#24292e"
                      iconColor="#ffffff"
                    />,
                    <MiniLinkCard
                      icon={faLinkedin}
                      label="LinkedIn"
                      href="https://www.linkedin.com/in/guilherme-emerick-26945816a/"
                      bgColor="#0A66C2"
                      iconColor="#ffffff"
                    />,
                    <MiniProjectCard href="https://spider-man-lake.vercel.app/" />
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Coluna 2: Avatar */}
          <div className="avatar order-1 laptop:order-2 relative z-10 flex flex-col items-center justify-center laptop:translate-y-20">
            <img
              src="/projects/img/avatar.png"
              alt="Avatar de Emerick"
              className="w-full max-w-[136px] mobile:max-w-[170px] mobile-lg:max-w-[204px] tablet:max-w-[238px] laptop:max-w-[450px] h-auto object-contain"
            />
          </div>

          {/* Coluna 3: About me */}
          <div className="order-3 relative z-10 laptop:self-end laptop:mb-12">
            <p
              className="aboutme text-[rgb(207,207,207)] font-mono font-extrabold leading-[20px] mobile:leading-[24px] laptop:leading-[28px] text-center laptop:text-left 
            text-xs mobile:text-sm laptop:text-lg max-w-xs mobile:max-w-sm laptop:max-w-md mx-auto laptop:mx-0 drop-shadow-md"
            >
              {t('hero.description')}
            </p>
          </div>
        </main>
      </div>

      {/* Contacts Modal */}
      {isContactsOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 mobile:p-4 animate-fadeIn"
          onClick={() => setIsContactsOpen(false)}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-md animate-fadeIn"
            onClick={() => setIsContactsOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div 
            className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl mobile:rounded-2xl p-3 mobile:p-5 tablet:p-10 max-w-3xl w-full shadow-2xl border border-slate-700/60 animate-scaleIn max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsContactsOpen(false)}
              className="absolute top-2 mobile:top-4 right-2 mobile:right-4 text-slate-400 hover:text-white transition-colors duration-200 text-xl mobile:text-2xl font-light leading-none"
            >
              ×
            </button>

            {/* Header */}
            <div className="mb-3 mobile:mb-5">
              <h2 className="text-xl mobile:text-2xl tablet:text-4xl font-bold text-white mb-0.5 mobile:mb-1">{t('contacts_modal.title')}</h2>
              <p className="text-xs mobile:text-xs tablet:text-base text-slate-400 leading-tight">{t('contacts_modal.subtitle')}</p>
            </div>

            {/* Grid Content */}
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-3 mobile:gap-4">
              
              {/* Left Side - Contact Info */}
              <div className="space-y-1.5 mobile:space-y-2 hidden tablet:block">
                {/* Email */}
                <a
                  href="mailto:emerick.perth@gmail.com"
                  className="group flex flex-col items-center gap-1.5 p-2 mobile:p-4 rounded-lg bg-slate-700/40 hover:bg-slate-700/70 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex-shrink-0 w-8 mobile:w-12 h-8 mobile:h-12 rounded-lg bg-orange-500/20 group-hover:bg-orange-500/30 flex items-center justify-center transition-colors duration-200">
                    <FontAwesomeIcon icon={faEnvelope} className="text-orange-400 text-xs mobile:text-lg" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide leading-tight">{t('contacts_modal.email_label')}</p>
                    <p className="text-white font-semibold group-hover:text-orange-400 transition-colors duration-200 text-xs">emerick.perth@gmail.com</p>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/guilherme-emerick-26945816a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-1.5 p-2 mobile:p-4 rounded-lg bg-slate-700/40 hover:bg-slate-700/70 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex-shrink-0 w-8 mobile:w-12 h-8 mobile:h-12 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 flex items-center justify-center transition-colors duration-200">
                    <FontAwesomeIcon icon={faLinkedin} className="text-blue-400 text-xs mobile:text-lg" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide leading-tight">{t('contacts_modal.linkedin_label')}</p>
                    <p className="text-white font-semibold group-hover:text-blue-400 transition-colors duration-200 text-xs">Guilherme Emerick</p>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/DevEmerick"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-1.5 p-2 mobile:p-4 rounded-lg bg-slate-700/40 hover:bg-slate-700/70 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex-shrink-0 w-8 mobile:w-12 h-8 mobile:h-12 rounded-lg bg-gray-500/20 group-hover:bg-gray-500/30 flex items-center justify-center transition-colors duration-200">
                    <FontAwesomeIcon icon={faGithub} className="text-gray-300 text-xs mobile:text-lg" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide leading-tight">{t('contacts_modal.github_label')}</p>
                    <p className="text-white font-semibold group-hover:text-gray-300 transition-colors duration-200 text-xs">DevEmerick</p>
                  </div>
                </a>
              </div>

              {/* Right Side - Contact Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Abrir mailto com dados do formulário
                  const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\n\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`;
                  window.location.href = `mailto:emerick.perth@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="space-y-1.5 mobile:space-y-2"
              >
                {/* Name Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">
                    {t('contacts_modal.form.name_label')}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('contacts_modal.form.name_placeholder')}
                    required
                    className="w-full px-2.5 mobile:px-3 py-1.5 mobile:py-2 rounded-lg bg-slate-700/50 border border-slate-600/50 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all duration-200"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">
                    {t('contacts_modal.form.email_label')}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('contacts_modal.form.email_placeholder')}
                    required
                    className="w-full px-2.5 mobile:px-3 py-1.5 mobile:py-2 rounded-lg bg-slate-700/50 border border-slate-600/50 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all duration-200"
                  />
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">
                    {t('contacts_modal.form.subject_label')}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={t('contacts_modal.form.subject_placeholder')}
                    required
                    className="w-full px-2.5 mobile:px-3 py-1.5 mobile:py-2 rounded-lg bg-slate-700/50 border border-slate-600/50 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all duration-200"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">
                    {t('contacts_modal.form.message_label')}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('contacts_modal.form.message_placeholder')}
                    required
                    rows={2}
                    className="w-full px-2.5 mobile:px-3 py-1.5 mobile:py-2 rounded-lg bg-slate-700/50 border border-slate-600/50 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 hover:from-orange-600 hover:via-orange-600 hover:to-orange-700 text-white font-bold py-1.5 mobile:py-2 px-3 mobile:px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/25 active:scale-95 text-xs mobile:text-sm"
                >
                  {t('contacts_modal.form.submit')}
                </button>
              </form>

            </div>
          </div>
        </div>
      )}

      <footer className="w-full bg-gray-900"></footer>

      {/* Floating Contact Button - Mobile Only */}
      <button
        onClick={handleContactsClick}
        className="fixed bottom-5 right-5 laptop:hidden z-40 w-12 h-12 mobile:w-13 mobile:h-13 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:opacity-100 opacity-75 shadow-lg hover:shadow-orange-500/40 flex items-center justify-center text-white text-lg mobile:text-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-orange-400/30"
        title={t('nav.contacts')}
      >
        <FontAwesomeIcon icon={faEnvelope} />
      </button>
    </div>
  );
}

export default App;

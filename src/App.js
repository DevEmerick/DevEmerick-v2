import "./App.css";
import Folder from "./components/animation/folder.js";
import MiniProjectCard from "./components/MiniProjectCard.js";
import MiniLinkCard from "./components/MiniLinkCard.js";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faHandPointer, faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();
  const folderRef = useRef(null);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const timeoutRef = useRef(null);

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

  // Função para chamar quando o usuário interage com a pasta
  const handleFolderInteract = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Limpar timeout ao desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);  return (
    <div className="App text-white min-h-screen flex flex-col scroll-smooth" style={{scrollbarGutter: 'stable'}}>
      <div className="flex flex-col h-screen max-h-[1080px]">
        
        {/* Navbar */}
        <div className="navmenu fixed top-0 left-0 right-0 text-white z-40" style={{backgroundColor: 'rgba(15, 23, 42, 0.85)', WebkitBackdropFilter: 'blur(4px)', backdropFilter: 'blur(4px)'}} >
          <div className="container mx-auto flex justify-between items-center p-5 lg:px-[100px] relative">
            <a href="#home" onClick={handleHomeClick} className="text-2xl font-bold tracking-tight">
              DevEmerick<span className="text-orange-500">.</span>
            </a>

            <div className="absolute left-1/2 -translate-x-1/2">
              <img src="/projects/img/logo.png" alt="Logo DevEmerick" className="h-7" />
            </div>

            <div className="navlinks flex items-center gap-8">
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

              {/* Language Selector */}
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
                      className={`w-full px-4 py-3 text-sm text-left hover:bg-slate-700 transition-colors ${ i18n.language === 'pt' ? 'bg-orange-500/20 text-orange-400' : 'text-white'}`}
                    >
                      Português
                    </button>
                    <button
                      onClick={() => {
                        i18n.changeLanguage('en');
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-sm text-left hover:bg-slate-700 transition-colors ${ i18n.language === 'en' ? 'bg-orange-500/20 text-orange-400' : 'text-white'}`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        i18n.changeLanguage('es');
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-sm text-left hover:bg-slate-700 transition-colors ${ i18n.language === 'es' ? 'bg-orange-500/20 text-orange-400' : 'text-white'}`}
                    >
                      Español
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Apresentação (Hero) */}
        <main className="content container mx-auto flex-grow flex flex-col lg:grid lg:grid-cols-[1fr_auto_1fr] items-center justify-center px-6 sm:px-10 lg:px-[100px] gap-10 lg:gap-20 relative overflow-hidden">
          <img
            src="/projects/img/developer.png"
            alt=""
            className="watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto pointer-events-none z-0 scale-[0.85]"
          />
          {/* Coluna 1: Apresentação */}
          <div className="presentation text-center lg:text-left order-2 lg:order-1 relative z-10 lg:translate-y-56 w-[calc(100%+15px)]">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              {t('hero.greeting')} <br />
              {t('hero.name')}{" "}
              <span className="text-white animate-blink ml-1 inline-block transform scale-x-75 scale-y-90">
                {" "}
                |
              </span>
            </h1>
            <div style={{ marginTop: '72px' }}>
              <div className="flex items-center gap-6">
                <Folder
                  ref={folderRef}
                  size={1}
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
                    <MiniProjectCard href="#projects" />
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Coluna 2: Avatar */}
          <div className="avatar order-1 lg:order-2 relative z-10 flex flex-col items-center justify-center lg:translate-y-20">
            <img
              src="/projects/img/avatar.png"
              alt="Avatar de Emerick"
              className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[450px] h-auto object-contain"
            />
          </div>

          {/* Coluna 3: About me */}
          <div className="order-3 relative z-10 lg:self-end lg:mb-12">
            <p
              className="aboutme text-[rgb(207,207,207)] font-mono font-extrabold leading-[28px] text-center lg:text-left 
            text-lg max-w-xs sm:max-w-sm lg:max-w-md mx-auto lg:mx-0 drop-shadow-md"
            >
              {t('hero.description')}
            </p>
          </div>
        </main>
      </div>

      {/* Contacts Modal */}
      {isContactsOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsContactsOpen(false)}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-md animate-fadeIn"
            onClick={() => setIsContactsOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div 
            className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-10 max-w-3xl w-full shadow-2xl border border-slate-700/60 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsContactsOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors duration-200 text-3xl font-light leading-none"
            >
              ×
            </button>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-white mb-2">{t('contacts_modal.title')}</h2>
              <p className="text-slate-400">{t('contacts_modal.subtitle')}</p>
            </div>

            {/* Grid Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Side - Contact Info */}
              <div className="space-y-3">
                {/* Email */}
                <a
                  href="mailto:emerick.perth@gmail.com"
                  className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-slate-700/40 hover:bg-slate-700/70 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-500/20 group-hover:bg-orange-500/30 flex items-center justify-center transition-colors duration-200">
                    <FontAwesomeIcon icon={faEnvelope} className="text-orange-400 text-lg" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{t('contacts_modal.email_label')}</p>
                    <p className="text-white font-semibold group-hover:text-orange-400 transition-colors duration-200">emerick.perth@gmail.com</p>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/guilherme-emerick-26945816a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-slate-700/40 hover:bg-slate-700/70 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/20 group-hover:bg-blue-500/30 flex items-center justify-center transition-colors duration-200">
                    <FontAwesomeIcon icon={faLinkedin} className="text-blue-400 text-lg" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{t('contacts_modal.linkedin_label')}</p>
                    <p className="text-white font-semibold group-hover:text-blue-400 transition-colors duration-200">Guilherme Emerick</p>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/DevEmerick"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-slate-700/40 hover:bg-slate-700/70 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-500/20 group-hover:bg-gray-500/30 flex items-center justify-center transition-colors duration-200">
                    <FontAwesomeIcon icon={faGithub} className="text-gray-300 text-lg" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{t('contacts_modal.github_label')}</p>
                    <p className="text-white font-semibold group-hover:text-gray-300 transition-colors duration-200">DevEmerick</p>
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
                className="space-y-4"
              >
                {/* Name Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                    {t('contacts_modal.form.name_label')}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('contacts_modal.form.name_placeholder')}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                    {t('contacts_modal.form.email_label')}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('contacts_modal.form.email_placeholder')}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  />
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                    {t('contacts_modal.form.subject_label')}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={t('contacts_modal.form.subject_placeholder')}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                    {t('contacts_modal.form.message_label')}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('contacts_modal.form.message_placeholder')}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 hover:from-orange-600 hover:via-orange-600 hover:to-orange-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/25 active:scale-95"
                >
                  {t('contacts_modal.form.submit')}
                </button>
              </form>

            </div>
          </div>
        </div>
      )}

      <footer className="w-full bg-gray-900"></footer>
    </div>
  );
}

export default App;

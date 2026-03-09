import { useState } from 'react';
import { faGlobe, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'pt', label: 'Português', short: 'PT' },
  { code: 'en', label: 'English',   short: 'EN' },
  { code: 'es', label: 'Español',   short: 'ES' },
];

/**
 * Navbar – barra de navegação fixa com menu responsivo e seletor de idioma.
 *
 * Props:
 *  - onHomeClick:     handler para o link "Home"
 *  - onContactsClick: handler para o link "Contatos"
 *  - onProjectsClick: handler para o link "Projetos"
 */
function Navbar({ onHomeClick, onContactsClick, onProjectsClick }) {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsLanguageOpen(false);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: '#home',     label: t('nav.home'),     onClick: (e) => { onHomeClick(e); setIsMenuOpen(false); } },
    { href: '#projects', label: t('nav.projects'), onClick: (e) => { onProjectsClick(e); setIsMenuOpen(false); } },
    { href: '#contact',  label: t('nav.contacts'), onClick: (e) => { onContactsClick(e); setIsMenuOpen(false); } },
  ];

  return (
    <nav
      className="navmenu fixed top-0 left-0 right-0 text-white z-40"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', WebkitBackdropFilter: 'blur(4px)', backdropFilter: 'blur(4px)' }}
    >
      <div className="container mx-auto flex justify-between items-center p-3 mobile:p-5 laptop:px-[100px] relative">
        {/* Branding */}
        <a href="#home" onClick={onHomeClick} className="text-lg mobile:text-xl tablet:text-2xl font-bold tracking-tight">
          DevEmerick<span className="text-orange-500">.</span>
        </a>

        {/* Logo Centro – apenas desktop */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden laptop:block">
          <img src="/projects/img/logo.png" alt="Logo DevEmerick" className="h-7" />
        </div>

        {/* Links Desktop */}
        <div className="navlinks hidden laptop:flex items-center gap-8">
          {navLinks.map(({ href, label, onClick }) => (
            <a key={href} href={href} onClick={onClick} className="text-lg hover:text-indigo-400 transition-colors">
              <span className="text-orange-500">#</span> {label}
            </a>
          ))}

          {/* Seletor de idioma – Desktop */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faGlobe} className="text-orange-400" />
              <span className="text-sm font-semibold uppercase">{i18n.language}</span>
            </button>

            {isLanguageOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-slate-800 rounded-lg shadow-lg border border-slate-700 z-50 overflow-hidden animate-fadeIn">
                {LANGUAGES.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => changeLanguage(code)}
                    className={`block w-full px-4 py-3 text-sm text-left hover:bg-slate-700 transition-colors ${
                      i18n.language === code ? 'bg-orange-500/20 text-orange-400' : 'text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Botão hambúrguer – Mobile/Tablet */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="laptop:hidden text-orange-500 text-2xl hover:text-orange-400 transition-colors duration-200"
          aria-label="Menu"
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Menu Mobile – Dropdown */}
      {isMenuOpen && (
        <div className="laptop:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-700 animate-fadeIn">
          <div className="flex flex-col px-4 mobile:px-6 py-4 space-y-3 mobile:space-y-4">
            {navLinks.map(({ href, label, onClick }) => (
              <a
                key={href}
                href={href}
                onClick={onClick}
                className="text-sm mobile:text-base text-white hover:text-indigo-400 transition-colors py-2"
              >
                <span className="text-orange-500">#</span> {label}
              </a>
            ))}

            {/* Seletor de idioma – Mobile */}
            <div className="border-t border-slate-700 pt-3 mobile:pt-4 mt-3 mobile:mt-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">{t('nav.language')}</p>
              <div className="flex gap-2">
                {LANGUAGES.map(({ code, short }) => (
                  <button
                    key={code}
                    onClick={() => changeLanguage(code)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      i18n.language === code
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-slate-700/50 text-white hover:bg-slate-700'
                    }`}
                  >
                    {short}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

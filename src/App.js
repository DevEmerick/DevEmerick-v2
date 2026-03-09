import './App.css';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { useState } from 'react';
>>>>>>> e5c35a7 (refactor: extract Navbar, Hero, ContactsModal sections and shared hooks/constants from App.js)
=======
>>>>>>> f242ae4 (refactor: implement DRY principles and create reusable components)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 2e2914c (fix: add .js/.jsx extensions to ALL local imports for Vercel ES modules compatibility)
=======

>>>>>>> bf4d25b (feat: adiciona @vercel/speed-insights e SpeedInsights ao App.js)
import Navbar from './sections/Navbar.jsx';
import Hero from './sections/Hero.jsx';
import ContactsModal from './sections/ContactsModal.jsx';
import { useWindowWidth } from './hooks/useWindowWidth.js';
import { useFolderTimer } from './hooks/useFolderTimer.js';
import { useToggle } from './hooks/useToggle.js';
import { reloadPage } from './utils/navigation.js';
<<<<<<< HEAD
<<<<<<< HEAD
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
=======
import { SpeedInsights } from '@vercel/speed-insights/react';
>>>>>>> bf4d25b (feat: adiciona @vercel/speed-insights e SpeedInsights ao App.js)

function App() {
  const { t } = useTranslation();
  const [isContactsOpen, toggleContacts] = useToggle(false);
=======
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import ContactsModal from './sections/ContactsModal';
import { useWindowWidth } from './hooks/useWindowWidth';
import { useFolderTimer } from './hooks/useFolderTimer';
import { useToggle } from './hooks/useToggle';
import { reloadPage } from './utils/navigation';
=======
>>>>>>> 2e2914c (fix: add .js/.jsx extensions to ALL local imports for Vercel ES modules compatibility)

function App() {
  const { t } = useTranslation();
<<<<<<< HEAD
  const [isContactsOpen, setIsContactsOpen] = useState(false);
>>>>>>> e5c35a7 (refactor: extract Navbar, Hero, ContactsModal sections and shared hooks/constants from App.js)
=======
  const [isContactsOpen, toggleContacts] = useToggle(false);
>>>>>>> f242ae4 (refactor: implement DRY principles and create reusable components)

  const { getFolderSize } = useWindowWidth();
  const { folderRef, isFolderOpen, handleProjectsClick, handleFolderInteract } = useFolderTimer();

<<<<<<< HEAD
<<<<<<< HEAD
  const handleHomeClick = (e) => reloadPage(e);

  const handleContactsClick = (e) => {
    e.preventDefault();
    toggleContacts();
=======
  const handleHomeClick = (e) => {
    e.preventDefault();
    window.location.href = window.location.pathname;
  };

  const handleContactsClick = (e) => {
    e.preventDefault();
    setIsContactsOpen((prev) => !prev);
>>>>>>> e5c35a7 (refactor: extract Navbar, Hero, ContactsModal sections and shared hooks/constants from App.js)
=======
  const handleHomeClick = (e) => reloadPage(e);

  const handleContactsClick = (e) => {
    e.preventDefault();
    toggleContacts();
>>>>>>> f242ae4 (refactor: implement DRY principles and create reusable components)
  };

  return (
    <div className="App text-white min-h-screen flex flex-col scroll-smooth" style={{ scrollbarGutter: 'stable' }}>
      <div className="flex flex-col laptop:h-screen laptop:max-h-[1080px]">
        <Navbar
          onHomeClick={handleHomeClick}
          onContactsClick={handleContactsClick}
          onProjectsClick={handleProjectsClick}
        />
        <Hero
          folderRef={folderRef}
          isFolderOpen={isFolderOpen}
          getFolderSize={getFolderSize}
          onFolderInteract={handleFolderInteract}
        />
      </div>

<<<<<<< HEAD
<<<<<<< HEAD
      <ContactsModal isOpen={isContactsOpen} onClose={toggleContacts} />
=======
      <ContactsModal isOpen={isContactsOpen} onClose={() => setIsContactsOpen(false)} />
>>>>>>> e5c35a7 (refactor: extract Navbar, Hero, ContactsModal sections and shared hooks/constants from App.js)
=======
      <ContactsModal isOpen={isContactsOpen} onClose={toggleContacts} />
>>>>>>> f242ae4 (refactor: implement DRY principles and create reusable components)

      <footer className="w-full bg-gray-900" />

      {/* Botão flutuante de contato – apenas Mobile */}
      <button
        onClick={handleContactsClick}
        className="fixed bottom-5 right-5 laptop:hidden z-40 w-12 h-12 mobile:w-13 mobile:h-13 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:opacity-100 opacity-75 shadow-lg hover:shadow-orange-500/40 flex items-center justify-center text-white text-lg mobile:text-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-orange-400/30"
        title={t('nav.contacts')}
        aria-label={t('nav.contacts')}
      >
        <FontAwesomeIcon icon={faEnvelope} />
      </button>
      <SpeedInsights />
<<<<<<< HEAD
      <Analytics />
=======
>>>>>>> bf4d25b (feat: adiciona @vercel/speed-insights e SpeedInsights ao App.js)
    </div>
  );
}

export default App;

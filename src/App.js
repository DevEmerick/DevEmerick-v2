import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import Navbar from './sections/Navbar.jsx';
import Hero from './sections/Hero.jsx';
import ContactsModal from './sections/ContactsModal.jsx';
import { useWindowWidth } from './hooks/useWindowWidth.js';
import { useFolderTimer } from './hooks/useFolderTimer.js';
import { useToggle } from './hooks/useToggle.js';
import { reloadPage } from './utils/navigation.js';

function App() {
  const { t } = useTranslation();
  const [isContactsOpen, toggleContacts] = useToggle(false);

  const { getFolderSize } = useWindowWidth();
  const { folderRef, isFolderOpen, handleProjectsClick, handleFolderInteract } = useFolderTimer();

  const handleHomeClick = (e) => reloadPage(e);

  const handleContactsClick = (e) => {
    e.preventDefault();
    toggleContacts();
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

      <ContactsModal isOpen={isContactsOpen} onClose={toggleContacts} />

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
    </div>
  );
}

export default App;

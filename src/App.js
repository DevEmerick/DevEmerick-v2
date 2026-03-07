import "./App.css";
import Folder from "./components/animation/folder.js";
import MiniProjectCard from "./components/MiniProjectCard.js";
import MiniLinkCard from "./components/MiniLinkCard.js";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, useEffect } from "react";

function App() {
  const folderRef = useRef(null);  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const timeoutRef = useRef(null);

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
            <a href="#home" className="text-2xl font-bold tracking-tight">
              DevEmerick<span className="text-orange-500">.</span>
            </a>

            <div className="absolute left-1/2 -translate-x-1/2">
              <img src="/projects/img/logo.png" alt="Logo DevEmerick" className="h-7" />
            </div>

            <div className="navlinks flex items-center gap-8">
              <a
                href="#home"
                className="text-lg hover:text-indigo-400 transition-colors"
              >
                <span className="text-orange-500">#</span> Home
              </a>
              <a
                href="#projects"
                onClick={handleProjectsClick}
                className="text-lg hover:text-indigo-400 transition-colors"
              >
                <span className="text-orange-500">#</span> Projects
              </a>
              <a
                href="#contact"
                className="text-lg hover:text-indigo-400 transition-colors"
              >
                <span className="text-orange-500">#</span> Contacts
              </a>
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
              Hey there, <br />
              I'm Emerick{" "}
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
              I am a developer focused on Front-End and Full Stack development,
              passionate about transforming ideas into real and functional
              applications. I have experience with React, Next.js, TypeScript,
              Sass, and CSS.
            </p>
          </div>
        </main>
      </div>
      <footer className="w-full bg-gray-900"></footer>
    </div>
  );
}

export default App;

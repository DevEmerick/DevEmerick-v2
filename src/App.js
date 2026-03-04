import "./App.css";
/*import Folder from "./components/animation/folder.js";*/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faReact, faJsSquare, faTailwindCss } from "@fortawesome/free-brands-svg-icons";
// import { faVial } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";

function App() {
  const [showScroll, setShowScroll] = useState(true);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          setShowScroll(scrollTop < docHeight * 0.9);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="App text-white min-h-screen flex flex-col scroll-smooth" style={{scrollbarGutter: 'stable'}}>
      <div className="flex flex-col h-screen max-h-[1080px]">
        
        {/* Navbar */}
        <div className="navmenu fixed top-0 left-0 right-0 text-white z-40" style={{backgroundColor: 'rgba(15, 23, 42, 0.85)', WebkitBackdropFilter: 'blur(4px)', backdropFilter: 'blur(4px)'}} >
          <div className="container mx-auto flex justify-between items-center p-5 lg:px-[100px] relative">
            <a href="#home" className="text-2xl font-bold tracking-tight">
              DevEmerick<span className="text-orange-500">.</span>
            </a>

            <div className="absolute left-1/2 -translate-x-1/2">
              <img src="/logo.png" alt="Logo DevEmerick" className="h-7" />
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
            src="developer.png"
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
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg mt-8">
              Projects
            </button>
          </div>

          {/* Coluna 2: Avatar */}
          <div className="avatar order-1 lg:order-2 relative z-10 flex flex-col items-center justify-center lg:translate-y-20">
            <img
              src="avatar.png"
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

          {/* Seta indicadora de scroll centralizada no bottom */}
          <div className="fixed inset-x-0 bottom-[20px] flex justify-center z-20 pointer-events-none">
            <FontAwesomeIcon
              icon={faArrowDown}
              className={`text-indigo-300 text-2xl ${
                showScroll ? "opacity-100" : "opacity-0"
              }`}
              style={{animation: showScroll ? 'bounce 2s infinite' : 'none', transition: 'opacity 0.5s ease-out'}}
            />
          </div>
        </main>
      </div>
      <section
        id="projects"
        className="relative min-h-screen w-full bg-gray-900 overflow-hidden py-20 pt-24"
      >
        <div className="container mx-auto px-6 sm:px-10 lg:px-[100px]">
          <div className="flex justify-center">
            {/* Card 1 */}
            <div className="w-full max-w-[432px] rounded-lg overflow-hidden flex flex-col h-[395px] shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-700" style={{background: 'linear-gradient(to bottom, #272a31 14%, #020618 98%)'}}>
              {/* Content Container */}
              <div className="flex-grow flex flex-col p-4 sm:p-5 justify-between relative">
                {/* Title and Subtitle Images */}
                <div className="flex flex-col gap-1 items-center">
                  <img
                    src="/SpiderMan.png"
                    alt="Spider-Man"
                    className="w-3/4 h-auto object-contain"
                  />
                  <img
                    src="/MilesMorales.png"
                    alt="Miles Morales"
                    className="w-1/2 h-auto object-contain -translate-y-6 relative z-50"
                  />
                </div>

                {/* Spider Character Image */}
                <div className="absolute top-[100px] left-1/2 -translate-x-1/2 overflow-hidden flex items-center justify-center">
                  <img
                    src="/spiderimg.png"
                    alt="Spider-Man Character"
                    className="w-[240px] h-[162px] object-cover"
                  />
                </div>

                {/* Description */}
                <p className="absolute bottom-[61px] left-4 right-4 sm:left-5 sm:right-5 text-xs sm:text-sm text-gray-300 leading-relaxed text-center">
                  Lorem ipsum sed lorem non sit ac libero rhoncus quam ultricies nisl lectus sed vivamus montes volutpat tiguita habitant leo neque.
                </p>

                {/* Technologies Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col justify-between h-16">
                  <div className="flex gap-4 justify-center sm:justify-start">
                    <div className="flex items-center gap-1 text-gray-300 hover:text-indigo-400 transition-colors">
                      <FontAwesomeIcon icon={faReact} className="text-sm sm:text-base" />
                      <span className="text-xs hidden sm:inline">React</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-300 hover:text-indigo-400 transition-colors">
                      <FontAwesomeIcon icon={faJsSquare} className="text-sm sm:text-base" />
                      <span className="text-xs hidden sm:inline">JavaScript</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-300 hover:text-indigo-400 transition-colors">
                      <FontAwesomeIcon icon={faTailwindCss} className="text-sm sm:text-base" />
                      <span className="text-xs hidden sm:inline">Tailwind + Vite</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full bg-gray-900"></footer>
    </div>
  );
}

export default App;

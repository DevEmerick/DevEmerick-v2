import "./App.css";
import Folder from "./components/animation/folder.js";

function App() {
  return (
    <div className="App text-white min-h-screen flex flex-col">
      <div className="flex flex-col h-screen max-h-[1080px]">
        <div className="navmenu bg-gray-900 text-white shadow-lg">
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
            className="watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto pointer-events-none z-0"
          />
          {/* Coluna 1: Apresentação */}
          <div className="presentation text-center lg:text-left order-2 lg:order-1 relative z-10 lg:translate-y-56">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Hey there, <br />
              I'm Emerick{" "}
              <span className="text-white animate-blink ml-1 inline-block transform scale-x-75 scale-y-90">
                {" "}
                |
              </span>
            </h1>
            <p className="text-indigo-300 text-lg sm:text-xl mt-4">
              A passionate developer building things for the web.
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 mt-8">
              Projects
            </button>
          </div>

          {/* Coluna 2: Avatar */}
          <div className="avatar order-1 lg:order-2 relative z-10 flex justify-center lg:translate-y-28">
            <img
              src="avatar.png"
              alt="Avatar de Emerick"
              className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[450px] h-auto object-contain"
            />
          </div>

          {/* Coluna 3: About me */}
          <div className="order-3 relative z-10 lg:translate-y-20">
            <p className="aboutme text-indigo-300 text-2x1 text-center lg:text-left text-lg leading-relaxed max-w-xs sm:max-w-sm lg:max-w-md mx-auto lg:mx-0 lg:translate-y-48 lg:translate-x-14">
              I’m a Full Stack Developer with 4 years of industry experience,
              building scalable applications from backend to frontend. I
              occasionally dive into UX to ensure everything I ship is not just
              functional, but intuitive and user-friendly.
            </p>
          </div>
        </main>
      </div>
      <div className="projects"></div>
      <div className="footer"></div>
    </div>
  );
}

export default App;

import { openInNewTab } from '../../utils/navigation.js';

/**
 * MiniProjectCard – miniatura de um card de projeto.
 * Mesmo tamanho dos mini cards brancos da pasta.
 * Sem texto, apenas as imagens do projeto com o background gradient.
 *
 * Props:
 *  - href: link ou âncora ao clicar (default: '#projects')
 *  - onClick: callback customizado (sobrescreve href)
 *  - gradient: gradiente de fundo do card (CSS string)
 */
const MiniProjectCard = ({
  href = '#projects',
  onClick,
  gradient = 'linear-gradient(to bottom, #272a31 14%, #020618 98%)'
}) => {
  const handleClick = (e) => {
    if (onClick) {
      e.stopPropagation();
      e.preventDefault();
      onClick(e);
    } else if (href) {
      openInNewTab(href, e);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-full h-full rounded-[inherit] overflow-hidden cursor-pointer 
                 flex flex-col items-center justify-center relative
                 hover:brightness-110 transition-all duration-200"
      style={{ background: gradient }}
    >
      {/* Spider-Man title */}
      <img
        src="/projects/img/SpiderMan.png"
        alt="Spider-Man"
        className="absolute top-[5%] w-[70%] object-contain z-10"
        draggable={false}
      />
      {/* Miles Morales subtitle */}
      <img
        src="/projects/img/MilesMorales.png"
        alt="Miles Morales"
        className="absolute top-[22%] w-[50%] object-contain z-10"
        draggable={false}
      />
      {/* Spider character */}
      <img
        src="/projects/img/spiderimg.png"
        alt="Spider-Man Character"
        className="absolute bottom-[5%] w-[85%] object-contain z-0"
        draggable={false}
      />
    </div>
  );
};

export default MiniProjectCard;

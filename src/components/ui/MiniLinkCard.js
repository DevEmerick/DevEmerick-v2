import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * MiniLinkCard – mini card com ícone + label para links sociais.
 * Abre em nova aba ao clicar. Mesmo tamanho dos mini cards da pasta.
 *
 * Props:
 *  - icon: ícone FontAwesome
 *  - label: texto curto (ex: "GitHub")
 *  - href: URL do link
 *  - bgColor: cor de fundo
 *  - iconColor: cor do ícone
 */
const MiniLinkCard = ({
  icon,
  label = '',
  href = '#',
  bgColor = '#24292e',
  iconColor = '#ffffff'
}) => {
  const handleClick = (e) => {
    e.stopPropagation();
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={handleClick}
      className="w-full h-full rounded-[inherit] overflow-hidden cursor-pointer 
                 flex flex-col items-center justify-center gap-[6%] relative
                 hover:brightness-125 transition-all duration-200"
      style={{ background: bgColor }}
    >
      <FontAwesomeIcon
        icon={icon}
        style={{ color: iconColor, fontSize: '32%', width: '32%', height: '32%' }}
      />
      {label && (
        <span
          className="font-bold text-white text-center leading-tight drop-shadow-md"
          style={{ fontSize: 'clamp(4px, 1vw, 8px)' }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default MiniLinkCard;

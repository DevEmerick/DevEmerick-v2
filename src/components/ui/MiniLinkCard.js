import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { openInNewTab } from '../../utils/navigation.js';

/**
 * MiniLinkCard – mini card with icon + label for social links.
 * Opens in a new tab when clicked. Same size as folder mini cards.
 *
 * Props:
 *  - icon: FontAwesome icon
 *  - label: short text (e.g. "GitHub")
 *  - href: link URL
 *  - bgColor: background color
 *  - iconColor: icon color
 */
const MiniLinkCard = ({
  icon,
  label = '',
  href = '#',
  bgColor = '#24292e',
  iconColor = '#ffffff'
}) => {
  const handleClick = (e) => openInNewTab(href, e);

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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { openInNewTab } from '../../utils/navigation.js';

/**
 * MiniLinkCard – mini card with icon + label for social links.
 * Opens in a new tab when clicked. Same size as folder mini cards.
 *
 * Props:
 *  - icon: FontAwesome icon
 *  - label: short text (e.g. "GitHub")
 *  - href: link URL
 *  - bgColor: background color
 *  - iconColor: icon color
 */
const MiniLinkCard = ({
  icon,
  label = '',
  href = '#',
  bgColor = '#24292e',
  iconColor = '#ffffff'
}) => {
  const handleClick = (e) => openInNewTab(href, e);

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

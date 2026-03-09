import { useTranslation } from 'react-i18next';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faHandPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Folder from '../components/animation/Folder';
import MiniLinkCard from '../components/ui/MiniLinkCard.js';
import MiniProjectCard from '../components/ui/MiniProjectCard.js';
import { SOCIAL_LINKS } from '../constants/links.js';

/**
 * Hero – seção principal de apresentação (acima da dobra).
 *
 * Props:
 *  - folderRef:       ref imperative da pasta animada
 *  - isFolderOpen:    se a pasta está aberta (para efeito de opacidade)
 *  - getFolderSize:   função que retorna o multiplicador de escala da pasta
 *  - onFolderInteract: callback disparado ao interagir com a pasta
 */
function Hero({ folderRef, isFolderOpen, getFolderSize, onFolderInteract }) {
  const { t } = useTranslation();

  return (
    <main className="content container mx-auto flex-grow flex flex-col gap-6 mobile:gap-6 tablet:gap-8 laptop:gap-10 desktop:gap-20 laptop:grid laptop:grid-cols-[1fr_auto_1fr] items-center laptop:items-end justify-between px-4 mobile:px-6 laptop:px-10 desktop-lg:px-[100px] relative overflow-hidden pt-16 mobile:pt-20 tablet:pt-24 laptop:pt-0 pb-[60px]">
      {/* Marca d'água de fundo */}
      <img
        src="/projects/img/developer.png"
        alt=""
        className="watermark hidden laptop:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto pointer-events-none z-0 scale-[0.85]"
      />

      {/* Coluna 1 – Apresentação */}
      <div
        className="presentation text-center laptop:text-left order-2 laptop:order-1 relative z-10 laptop:self-end w-[calc(100%+15px)]"
      >
        <h1
          className="text-2xl mobile:text-3xl mobile-lg:text-4xl tablet:text-5xl laptop:text-6xl font-bold leading-tight"
          style={{ opacity: isFolderOpen ? 0.4 : 1, transition: 'opacity 0.3s ease' }}
        >
          {t('hero.greeting')} <br />
          {t('hero.name')}{' '}
          <span className="text-white animate-blink ml-1 inline-block transform scale-x-75 scale-y-90"> |</span>
        </h1>

        <div style={{ marginTop: '32px' }} className="mobile:mt-[48px] laptop:mt-[72px]">
          <div className="flex items-center justify-center laptop:justify-start gap-4 mobile:gap-6">
            <Folder
              ref={folderRef}
              size={getFolderSize()}
              color="#5227FF"
              label={<FontAwesomeIcon icon={faHandPointer} className="click-me-icon" />}
              className="custom-folder"
              onInteract={onFolderInteract}
              items={[
                <MiniLinkCard
                  icon={faGithub}
                  label="GitHub"
                  href={SOCIAL_LINKS.github}
                  bgColor="#24292e"
                  iconColor="#ffffff"
                />,
                <MiniLinkCard
                  icon={faLinkedin}
                  label="LinkedIn"
                  href={SOCIAL_LINKS.linkedin}
                  bgColor="#0A66C2"
                  iconColor="#ffffff"
                />,
                <MiniProjectCard href={SOCIAL_LINKS.spiderman} />,
              ]}
            />
          </div>
        </div>
      </div>

      {/* Coluna 2 – Avatar */}
      <div className="avatar order-1 laptop:order-2 relative z-10 flex flex-col items-center justify-center laptop:self-end">
        <img
          src="/projects/img/avatar.png"
          alt="Avatar de Emerick"
          className="w-full max-w-[136px] mobile:max-w-[170px] mobile-lg:max-w-[204px] tablet:max-w-[238px] laptop:max-w-[450px] h-auto object-contain"
        />
      </div>

      {/* Coluna 3 – About me */}
      <div className="order-3 relative z-10 laptop:self-end">
        <p className="aboutme text-[rgb(207,207,207)] font-mono font-extrabold leading-[20px] mobile:leading-[24px] laptop:leading-[28px] text-center laptop:text-left text-xs mobile:text-sm laptop:text-lg max-w-xs mobile:max-w-sm laptop:max-w-md mx-auto laptop:mx-0 drop-shadow-md">
          {t('hero.description')}
        </p>
      </div>
    </main>
  );
}

export default Hero;

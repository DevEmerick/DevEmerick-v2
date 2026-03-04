import { useState, useRef, useEffect, useCallback } from 'react';

const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color.split('').map(c => c + c).join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

/**
 * Folder - Componente responsivo de pasta animada
 *
 * Props:
 *  - color: cor da pasta (hex). Default: '#5227FF'
 *  - size: multiplicador fixo de escala. Default: 1 (base = 100px de largura)
 *  - responsive: se true, a pasta preenche 100% da largura do container pai. Default: false
 *  - maxWidth: largura máxima em px quando responsive=true. Default: 200
 *  - items: array de até 3 elementos React para exibir nos papéis
 *  - className: classes extras no wrapper
 */
const Folder = ({
  color = '#5227FF',
  size = 1,
  responsive = false,
  maxWidth = 200,
  items = [],
  label = '',
  className = ''
}) => {
  const maxItems = 3;
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const containerRef = useRef(null);
  const [scale, setScale] = useState(size);
  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );

  // Base dimensions (scale = 1)
  const BASE_W = 100;
  const BASE_H = 80;

  // Responsive: calcula scale com base na largura do container
  const updateScale = useCallback(() => {
    if (!responsive || !containerRef.current) return;
    const parentWidth = containerRef.current.parentElement?.offsetWidth;
    if (!parentWidth) return;
    const target = Math.min(parentWidth, maxWidth);
    setScale(target / BASE_W);
  }, [responsive, maxWidth]);

  useEffect(() => {
    if (!responsive) {
      setScale(size);
      return;
    }
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (containerRef.current?.parentElement) {
      ro.observe(containerRef.current.parentElement);
    }
    return () => ro.disconnect();
  }, [responsive, size, updateScale]);

  // Derived dimensions
  const w = BASE_W * scale;
  const h = BASE_H * scale;
  const tabW = 30 * scale;
  const tabH = 10 * scale;
  const radius = Math.max(2, 10 * scale);
  const tabRadius = Math.max(2, 5 * scale);
  const paperRadius = Math.max(2, 10 * scale);

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor('#ffffff', 0.1);
  const paper2 = darkenColor('#ffffff', 0.05);
  const paper3 = '#ffffff';

  const handleFolderClick = (e) => {
    // Só alterna se o clique foi na pasta, não nos papéis
    if (e.target.closest('[data-paper]')) return;
    setOpen(prev => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (e, index) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (e, index) => {
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const getOpenTransform = index => {
    if (index === 0) return 'translate(-120%, -70%) rotate(-15deg)';
    if (index === 1) return 'translate(10%, -70%) rotate(15deg)';
    if (index === 2) return 'translate(-50%, -100%) rotate(5deg)';
    return '';
  };

  const folderVars = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2,
    '--paper-3': paper3
  };

  const handleFolderMouseLeave = () => {
    if (open) {
      setOpen(false);
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: 'inline-block',
        width: responsive ? '100%' : undefined,
        maxWidth: responsive ? `${maxWidth}px` : undefined
      }}
      onMouseLeave={handleFolderMouseLeave}
    >
      <div
        className={`group relative transition-all duration-200 ease-in cursor-pointer ${
          !open ? 'hover:-translate-y-2' : ''
        }`}
        style={{
          ...folderVars,
          transform: open ? 'translateY(-8px)' : undefined,
          // Reserva espaço para a aba
          paddingTop: `${tabH}px`
        }}
        onClick={handleFolderClick}
      >
        <div
          className="relative"
          style={{
            width: `${w}px`,
            height: `${h}px`,
            backgroundColor: folderBackColor,
            borderRadius: `0 ${radius}px ${radius}px ${radius}px`
          }}
        >
          {/* Aba da pasta */}
          <span
            className="absolute z-0"
            style={{
              bottom: '98%',
              left: 0,
              width: `${tabW}px`,
              height: `${tabH}px`,
              backgroundColor: folderBackColor,
              borderRadius: `${tabRadius}px ${tabRadius}px 0 0`
            }}
          ></span>

          {/* Papéis */}
          {papers.map((item, i) => {
            const widthPct = i === 0 ? 70 : i === 1 ? 80 : 90;
            const closedHeightPct = i === 0 ? 80 : i === 1 ? 70 : 60;
            const openHeightPct = 80;

            const transformStyle = open
              ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)`
              : undefined;

            return (
              <div
                key={i}
                data-paper="true"
                onMouseMove={e => handlePaperMouseMove(e, i)}
                onMouseLeave={e => handlePaperMouseLeave(e, i)}
                className={`absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out ${
                  !open
                    ? 'transform -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0'
                    : 'hover:scale-105'
                }`}
                style={{
                  width: `${widthPct}%`,
                  height: `${open ? openHeightPct : closedHeightPct}%`,
                  ...(!open ? {} : { transform: transformStyle }),
                  backgroundColor: item ? 'transparent' : (i === 0 ? paper1 : i === 1 ? paper2 : paper3),
                  borderRadius: `${paperRadius}px`,
                  overflow: 'hidden',
                  pointerEvents: open ? 'auto' : 'none'
                }}
              >
                {item ? (
                  <div className="w-full h-full">{item}</div>
                ) : null}
              </div>
            );
          })}

          {/* Tampa esquerda */}
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? 'group-hover:[transform:skew(15deg)_scaleY(0.6)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: `${Math.max(2, 5 * scale)}px ${radius}px ${radius}px ${radius}px`,
              ...(open && { transform: 'skew(15deg) scaleY(0.6)' })
            }}
          ></div>

          {/* Tampa direita */}
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? 'group-hover:[transform:skew(-15deg)_scaleY(0.6)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: `${Math.max(2, 5 * scale)}px ${radius}px ${radius}px ${radius}px`,
              ...(open && { transform: 'skew(-15deg) scaleY(0.6)' })
            }}
          ></div>

          {/* Label na capa - acompanha a perspectiva */}
          {label && (
            <div
              className={`absolute z-40 inset-0 flex items-center justify-center pointer-events-none origin-bottom transition-all duration-300 ease-in-out ${
                !open ? 'group-hover:[transform:scaleY(0.6)]' : ''
              }`}
              style={{
                ...(open && { transform: 'scaleY(0.6)' })
              }}
            >
              {typeof label === 'string' ? (
                <span
                  className="tracking-tight text-white drop-shadow-md select-none whitespace-nowrap uppercase"
                  style={{
                    fontSize: `${Math.max(7, 10 * scale)}px`,
                    fontWeight: 800,
                    letterSpacing: `${0.5 * scale}px`
                  }}
                >
                  {label}
                </span>
              ) : (
                <span
                  className="text-white drop-shadow-md select-none"
                  style={{ fontSize: `${Math.max(14, 22 * scale)}px` }}
                >
                  {label}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Folder;

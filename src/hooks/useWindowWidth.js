import { useState, useEffect } from 'react';

/**
 * Hook: useWindowWidth
 * Monitora a largura da janela e expõe um helper para calcular
 * o tamanho proporcional da pasta (Folder) de acordo com o breakpoint.
 */
export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getFolderSize = () => {
    if (windowWidth < 360) return 0.65;   // Mobile XS
    if (windowWidth < 480) return 0.75;   // Mobile SM
    if (windowWidth < 640) return 0.85;   // Mobile MD
    if (windowWidth < 768) return 0.9;    // Mobile LG
    if (windowWidth < 1024) return 0.95;  // Tablet
    return 1;                             // Desktop+
  };

  return { windowWidth, getFolderSize };
}

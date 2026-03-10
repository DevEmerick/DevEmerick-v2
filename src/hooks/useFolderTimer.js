import { useRef, useState, useEffect } from 'react';

const AUTO_CLOSE_DELAY = 5000;

/**
 * Hook: useFolderTimer
 * Gerencia o estado de abertura/fechamento da pasta animada e o
 * timer de fechamento automático após AUTO_CLOSE_DELAY ms.
 *
 * Retorna ref da pasta, estado de abertura e os handlers necessários.
 */
export function useFolderTimer() {
  const folderRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isFolderOpen, setIsFolderOpen] = useState(false);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const startAutoClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      folderRef.current?.close();
      setIsFolderOpen(false);
    }, AUTO_CLOSE_DELAY);
  };

  const handleProjectsClick = (e) => {
    e.preventDefault();
    if (isFolderOpen) {
      folderRef.current?.close();
      setIsFolderOpen(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    } else {
      folderRef.current?.open();
      setIsFolderOpen(true);
      startAutoClose();
    }
  };

  const handleFolderInteract = (isOpen) => {
    // When called with no args (e.g. from paper hover), only cancel auto-close timer
    if (isOpen === undefined) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }
    const open = Boolean(isOpen);
    setIsFolderOpen(open);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (open) startAutoClose();
  };

  return { folderRef, isFolderOpen, handleProjectsClick, handleFolderInteract };
}

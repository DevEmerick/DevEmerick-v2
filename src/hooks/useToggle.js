import { useState, useCallback } from 'react';

/**
 * Hook: useToggle
 * Simplifica o pattern de toggle boolean state.
 * 
 * @param {boolean} initialValue - Valor inicial do estado (default: false)
 * @returns {[boolean, Function]} - [state, toggle function]
 * 
 * @example
 * const [isOpen, toggleOpen] = useToggle(false);
 * <button onClick={toggleOpen}>Toggle</button>
 */
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle];
}

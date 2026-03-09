/**
 * Theme Tokens - Classes Tailwind reutilizáveis
 * Centraliza padrões visuais recorrentes no projeto
 */

export const TRANSITIONS = {
  fast: 'transition-all duration-200',
  normal: 'transition-all duration-300',
  colors: 'transition-colors duration-200',
};

export const ROUNDED = {
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

export const BACKGROUNDS = {
  slate: {
    dark: 'bg-slate-900',
    medium: 'bg-slate-800',
    light: 'bg-slate-700',
    lighter: 'bg-slate-700/50',
    subtle: 'bg-slate-700/40',
  },
  orange: {
    gradient: 'bg-gradient-to-r from-orange-500 to-orange-600',
    gradientHover: 'hover:from-orange-600 hover:to-orange-700',
    gradientFull: 'bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600',
    gradientFullHover: 'hover:from-orange-600 hover:via-orange-600 hover:to-orange-700',
  },
};

export const BORDERS = {
  slate: {
    default: 'border border-slate-700',
    lighter: 'border border-slate-600/50',
    subtle: 'border border-slate-700/60',
  },
};

export const TEXT_COLORS = {
  slate: {
    light: 'text-slate-400',
    lighter: 'text-slate-500',
  },
  orange: {
    default: 'text-orange-500',
    hover: 'hover:text-orange-400',
  },
  white: 'text-white',
};

export const HOVER_EFFECTS = {
  scale: 'hover:scale-110 active:scale-95',
  brighten: 'hover:brightness-110',
  brightness125: 'hover:brightness-125',
};

/**
 * Combina classes de tokens para criar estilos compostos
 * @param {...string} classes - Classes CSS para combinar
 * @returns {string}
 */
export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

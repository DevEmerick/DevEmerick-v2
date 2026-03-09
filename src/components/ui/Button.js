<<<<<<< HEAD
import { cx, TRANSITIONS, ROUNDED, BACKGROUNDS, HOVER_EFFECTS } from '../../constants/theme.js';
=======
import { cx, TRANSITIONS, ROUNDED, BACKGROUNDS, HOVER_EFFECTS } from '../../constants/theme.js';
>>>>>>> f242ae4 (refactor: implement DRY principles and create reusable components)

/**
 * Button - Componente reutilizável de botão
 * 
 * @param {Object} props
 * @param {'primary'|'secondary'} props.variant - Variante visual do botão
 * @param {'sm'|'md'|'lg'} props.size - Tamanho do botão
 * @param {boolean} props.fullWidth - Se o botão ocupa 100% da largura
 * @param {ReactNode} props.children - Conteúdo do botão
 * @param {string} props.className - Classes CSS adicionais
 * @param {Function} props.onClick - Handler de clique
 * @param {'button'|'submit'|'reset'} props.type - Tipo do botão
 */
function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseClasses = cx(
    'font-bold',
    ROUNDED.lg,
    TRANSITIONS.normal,
    'shadow-lg',
    HOVER_EFFECTS.scale
  );

  const variantClasses = {
    primary: cx(
      BACKGROUNDS.orange.gradientFull,
      BACKGROUNDS.orange.gradientFullHover,
      'text-white',
      'hover:shadow-orange-500/25'
    ),
    secondary: cx(
      'bg-slate-700/50',
      'hover:bg-slate-700',
      'text-white',
      'border border-slate-600/50'
    ),
  };

  const sizeClasses = {
    sm: 'py-1 mobile:py-1.5 px-2 mobile:px-3 text-xs mobile:text-sm',
    md: 'py-1.5 mobile:py-2 px-3 mobile:px-4 text-xs mobile:text-sm',
    lg: 'py-2 mobile:py-3 px-4 mobile:px-5 text-sm mobile:text-base',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      className={cx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        widthClass,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

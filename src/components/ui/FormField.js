<<<<<<< HEAD
<<<<<<< HEAD
import { cx, TRANSITIONS, ROUNDED, BACKGROUNDS, BORDERS, TEXT_COLORS } from '../../constants/theme.js';
=======
import { cx, TRANSITIONS, ROUNDED, BACKGROUNDS, BORDERS, TEXT_COLORS } from '../../constants/theme.js';
>>>>>>> f242ae4 (refactor: implement DRY principles and create reusable components)
=======
import { cx, TRANSITIONS, ROUNDED, BACKGROUNDS, BORDERS, TEXT_COLORS } from '../../constants/theme.js';
>>>>>>> 2e2914c (fix: add .js/.jsx extensions to ALL local imports for Vercel ES modules compatibility)

/**
 * FormField - Componente reutilizável de campo de formulário
 * 
 * @param {Object} props
 * @param {string} props.label - Texto do label
 * @param {string} props.name - Nome do campo
 * @param {string} props.type - Tipo do input (text, email, etc)
 * @param {string} props.value - Valor controlado
 * @param {Function} props.onChange - Handler de mudança
 * @param {string} props.placeholder - Placeholder
 * @param {boolean} props.required - Se é obrigatório
 * @param {number} props.maxLength - Tamanho máximo
 * @param {boolean} props.multiline - Se é textarea
 * @param {number} props.rows - Número de linhas (textarea)
 * @param {string} props.className - Classes adicionais
 */
function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  maxLength,
  multiline = false,
  rows = 3,
  className = '',
}) {
  const labelClasses = cx(
    'block text-xs font-semibold uppercase tracking-wide mb-0.5',
    TEXT_COLORS.slate.light
  );

  const inputClasses = cx(
    'w-full px-2.5 mobile:px-3 py-1.5 mobile:py-2',
    ROUNDED.lg,
    BACKGROUNDS.slate.lighter,
    BORDERS.slate.lighter,
    'text-xs text-white placeholder-slate-500',
    'focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20',
    TRANSITIONS.fast,
    multiline && 'resize-none',
    className
  );

  const InputElement = multiline ? 'textarea' : 'input';

  return (
    <div>
      <label htmlFor={name} className={labelClasses}>
        {label}
      </label>
      <InputElement
        id={name}
        name={name}
        type={!multiline ? type : undefined}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        rows={multiline ? rows : undefined}
        className={inputClasses}
      />
    </div>
  );
}

export default FormField;

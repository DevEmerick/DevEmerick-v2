import { useState } from 'react';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { SOCIAL_LINKS } from '../constants/links';

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

const CONTACT_CARDS = [
  {
    href: `mailto:${SOCIAL_LINKS.email}`,
    iconBg: 'bg-orange-500/20 group-hover:bg-orange-500/30',
    icon: faEnvelope,
    iconColor: 'text-orange-400',
    labelKey: 'contacts_modal.email_label',
    value: SOCIAL_LINKS.email,
    valueHover: 'group-hover:text-orange-400',
    external: false,
  },
  {
    href: SOCIAL_LINKS.linkedin,
    iconBg: 'bg-blue-500/20 group-hover:bg-blue-500/30',
    icon: faLinkedin,
    iconColor: 'text-blue-400',
    labelKey: 'contacts_modal.linkedin_label',
    value: 'Guilherme Emerick',
    valueHover: 'group-hover:text-blue-400',
    external: true,
  },
  {
    href: SOCIAL_LINKS.github,
    iconBg: 'bg-gray-500/20 group-hover:bg-gray-500/30',
    icon: faGithub,
    iconColor: 'text-gray-300',
    labelKey: 'contacts_modal.github_label',
    value: 'DevEmerick',
    valueHover: 'group-hover:text-gray-300',
    external: true,
  },
];

/**
 * ContactsModal – modal de contato com formulário e cards de redes sociais.
 *
 * Props:
 *  - isOpen:  controla visibilidade do modal
 *  - onClose: callback para fechar o modal
 */
function ContactsModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(INITIAL_FORM);

  if (!isOpen) return null;

  const handleField = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:${SOCIAL_LINKS.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
    setFormData(INITIAL_FORM);
  };

  const inputClass =
    'w-full px-2.5 mobile:px-3 py-1.5 mobile:py-2 rounded-lg bg-slate-700/50 border border-slate-600/50 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all duration-200';

  const labelClass =
    'block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 mobile:p-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md animate-fadeIn" />

      {/* Conteúdo */}
      <div
        className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl mobile:rounded-2xl p-3 mobile:p-5 tablet:p-10 max-w-3xl w-full shadow-2xl border border-slate-700/60 animate-scaleIn max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-2 mobile:top-4 right-2 mobile:right-4 text-slate-400 hover:text-white transition-colors duration-200 text-xl mobile:text-2xl font-light leading-none"
          aria-label="Fechar"
        >
          ×
        </button>

        {/* Header */}
        <div className="mb-3 mobile:mb-5">
          <h2 className="text-xl mobile:text-2xl tablet:text-4xl font-bold text-white mb-0.5 mobile:mb-1">
            {t('contacts_modal.title')}
          </h2>
          <p className="text-xs mobile:text-xs tablet:text-base text-slate-400 leading-tight">
            {t('contacts_modal.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-3 mobile:gap-4">
          {/* Cards de contato – apenas tablet+ */}
          <div className="space-y-1.5 mobile:space-y-2 hidden tablet:block">
            {CONTACT_CARDS.map(({ href, iconBg, icon, iconColor, labelKey, value, valueHover, external }) => (
              <a
                key={href}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex flex-col items-center gap-1.5 p-2 mobile:p-4 rounded-lg bg-slate-700/40 hover:bg-slate-700/70 transition-all duration-200 cursor-pointer"
              >
                <div className={`flex-shrink-0 w-8 mobile:w-12 h-8 mobile:h-12 rounded-lg ${iconBg} flex items-center justify-center transition-colors duration-200`}>
                  <FontAwesomeIcon icon={icon} className={`${iconColor} text-xs mobile:text-lg`} />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide leading-tight">
                    {t(labelKey)}
                  </p>
                  <p className={`text-white font-semibold ${valueHover} transition-colors duration-200 text-xs`}>
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Formulário de contato */}
          <form onSubmit={handleSubmit} className="space-y-1.5 mobile:space-y-2">
            <div>
              <label className={labelClass}>{t('contacts_modal.form.name_label')}</label>
              <input
                type="text"
                value={formData.name}
                onChange={handleField('name')}
                placeholder={t('contacts_modal.form.name_placeholder')}
                required
                maxLength={100}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t('contacts_modal.form.email_label')}</label>
              <input
                type="email"
                value={formData.email}
                onChange={handleField('email')}
                placeholder={t('contacts_modal.form.email_placeholder')}
                required
                maxLength={254}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t('contacts_modal.form.subject_label')}</label>
              <input
                type="text"
                value={formData.subject}
                onChange={handleField('subject')}
                placeholder={t('contacts_modal.form.subject_placeholder')}
                required
                maxLength={200}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t('contacts_modal.form.message_label')}</label>
              <textarea
                value={formData.message}
                onChange={handleField('message')}
                placeholder={t('contacts_modal.form.message_placeholder')}
                required
                maxLength={2000}
                rows={2}
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 hover:from-orange-600 hover:via-orange-600 hover:to-orange-700 text-white font-bold py-1.5 mobile:py-2 px-3 mobile:px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/25 active:scale-95 text-xs mobile:text-sm"
            >
              {t('contacts_modal.form.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactsModal;

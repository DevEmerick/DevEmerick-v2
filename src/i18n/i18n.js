import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt from './locales/pt.json';
import en from './locales/en.json';
import es from './locales/es.json';

const resources = {
  pt: { translation: pt },
  en: { translation: en },
  es: { translation: es }
};

// Detectar idioma do navegador ou usar padrão salvo
const savedLanguage = localStorage.getItem('language') || navigator.language.split('-')[0];
const defaultLanguage = ['pt', 'en', 'es'].includes(savedLanguage) ? savedLanguage : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Salvar idioma quando mudar
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import idTranslations from './locales/id.json';
import enTranslations from './locales/en.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof enTranslations;
    };
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      id: {
        translation: idTranslations
      },
      en: {
        translation: enTranslations
      }
    },
    lng: typeof window !== 'undefined' ? localStorage.getItem('preferredLanguage')?.toLowerCase() || 'en' : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
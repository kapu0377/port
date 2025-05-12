import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationKO from './locales/ko.json';
import translationEN from './locales/en.json';
import translationJA from './locales/ja.json';

const resources = {
  ko: translationKO,
  en: translationEN,
  ja: translationJA
};
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ko', 
    
    interpolation: {
      escapeValue: false 
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'] 
    }
  });   

export default i18n; 
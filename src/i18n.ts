import i18next from 'i18next';
import ICU from 'i18next-icu';
import { initReactI18next } from 'react-i18next';
import de from './resources/de.json';
import en from './resources/en.json';

i18next
  .use(ICU)
  .use(initReactI18next)
  .init({
    fallbackLng: 'de',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      de: {
        translation: de,
      },
      en: {
        translation: en,
      },
    },
  });

export default i18next;

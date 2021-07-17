import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './locales/ru.js';

i18n
  .use(initReactI18next)
  .init({
    lng: 'ru',
    debug: true,
    resources: {
      ru,
    },
  });

export default i18n;

import i18n from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';
import LocalStorageBackend from 'i18next-localstorage-backend';
import { reactI18nextModule } from 'react-i18next';
import * as en from 'src/locales/en';

const options = {
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development',
  ns: ['common', 'message', 'error', 'contract'],

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  // react i18next special options (optional)
  react: {
    wait: true,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default',
  },
};

i18n
  .use(LocalStorageBackend)
  .use(LngDetector)
  .use(reactI18nextModule)
  .init(options);

Object.keys(en).forEach(ns => {
  i18n.addResourceBundle('en', ns, en[ns]);
});

export default i18n;

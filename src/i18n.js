import i18n from 'i18next';

const supportLang = ['en'];

i18n.init({
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development',
  ns: ['common', 'message', 'error', 'contract'],

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  // react i18next special options (optional)
  react: {
    wait: false,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default',
  },
});

supportLang.forEach(lang => {
  import(`src/locales/${lang}.js`).then(locale => {
    Object.keys(locale).forEach(ns => {
      i18n.addResourceBundle(lang, ns, locale[ns]);
    });
  });
});

export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    detection:{
      order: ["cookie", "navigator"],
      caches: ["cookie"],
      lookupCookie: "i18nextLng",
      cookieOptions: { path: "/", secure: true, sameSite: "lax" },
      load: "languageOnly",
    }
  });

  export default i18n;
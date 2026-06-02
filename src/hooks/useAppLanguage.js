import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGE_STORAGE_KEY } from "../i18n";

export function useAppLanguage() {
  const { i18n } = useTranslation();

  const language = i18n.language || "en";
  const direction = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("dir", direction);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language, direction]);

  function changeLanguage(nextLanguage) {
    i18n.changeLanguage(nextLanguage);
  }

  return {
    language,
    direction,
    changeLanguage,
  };
}

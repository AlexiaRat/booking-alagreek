import React, { createContext, useState } from "react";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("ro");
  const [showDropdown, setShowDropdown] = useState(false);

  const selectLanguage = (lang) => {
    setLanguage(lang);
    setShowDropdown(false);
  };

  return (
    <LanguageContext.Provider
      value={{ language, showDropdown, setShowDropdown, selectLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

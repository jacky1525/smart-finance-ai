"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  t: typeof translations.en;
  setLanguage: (lang: Language) => void;
}

const LANGUAGE_STORAGE_KEY = 'smartfinance_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isHydrated, setIsHydrated] = useState(false);

  // Client-side: localStorage'dan dil tercihini oku
  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'tr')) {
      setLanguageState(savedLanguage);
    }
    setIsHydrated(true);
  }, []);

  // Dil değiştiğinde localStorage'a kaydet
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  const value = {
    language,
    t: translations[language],
    setLanguage,
  };

  // Hydration tamamlanana kadar varsayılan dili göster (flicker önlemi)
  // Not: İsterseniz burada bir loading state de gösterebilirsiniz
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

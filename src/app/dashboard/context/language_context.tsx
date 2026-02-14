"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

import { translations } from './translations';

type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  t: typeof translations.en;
  setLanguage: (lang: Language) => void;
}

const LANGUAGE_STORAGE_KEY = 'smartfinance_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
    return (savedLanguage === 'en' || savedLanguage === 'tr') ? savedLanguage : 'en';
  });

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

"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'tr';

const translations = {
  en: {
    welcome: "Welcome",
    login: "Login",
    dashboard: {
      sidebar: {
        dashboard: "Dashboard",
        transactions: "Transactions",
        aiInsights: "AI Insights",
        budgets: "Budgets",
        investments: "Investments",
        settings: "Settings",
      },
      search: "Search...",
      netWorth: "Net Worth",
      monthlyIncome: "Monthly Income",
      monthlyExpenses: "Monthly Expenses",
      aiAssistant: "AI Assistant",
      aiWarning: "Your spending in 'Food' is 15% higher than last month. Consider reviewing your budget.",
      viewRecs: "View Recommendations",
      cashFlow: "Cash Flow",
      recentActivity: "Recent Activity",
    },
  },
  tr: {
    welcome: "Hoş Geldiniz",
    login: "Giriş Yap",
    dashboard: {
      sidebar: {
        dashboard: "Panel",
        transactions: "İşlemler",
        aiInsights: "Yapay Zeka",
        budgets: "Bütçeler",
        investments: "Yatırımlar",
        settings: "Ayarlar",
      },
      search: "Ara...",
      netWorth: "Net Değer",
      monthlyIncome: "Aylık Gelir",
      monthlyExpenses: "Aylık Gider",
      aiAssistant: "Yapay Zeka Asistanı",
      aiWarning: "'Gıda' harcamalarınız geçen aya göre %15 daha yüksek. Bütçenizi gözden geçirmeyi düşünün.",
      viewRecs: "Önerileri Gör",
      cashFlow: "Nakit Akışı",
      recentActivity: "Son Hareketler",
    },
  }
};

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

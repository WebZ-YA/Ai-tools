import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRtl: boolean;
  t: Record<string, string>;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    tools: 'Tools Library',
    pricing: 'Pricing & Plans',
    blog: 'Blog & Guides',
    dashboard: 'Dashboard',
    admin: 'Admin Center',
    searchPlaceholder: 'Search 35+ AI & utility tools...',
    signIn: 'Sign In',
    signOut: 'Sign Out',
  },
  ar: {
    home: 'الرئيسية',
    tools: 'مكتبة الأدوات',
    pricing: 'الأسعار والخطط',
    blog: 'المدونة والتعليمات',
    dashboard: 'لوحة التحكم',
    admin: 'مركز الإدارة',
    searchPlaceholder: 'ابحث في أكثر من 35 أداة ذكية وعامة...',
    signIn: 'تسجيل الدخول',
    signOut: 'تسجيل الخروج',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');

  useEffect(() => {
    const saved = localStorage.getItem('app-lang') as Language;
    if (saved) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const isRtl = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRtl, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};

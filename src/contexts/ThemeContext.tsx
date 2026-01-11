import React, { createContext, useContext, useState, useLayoutEffect } from 'react';

type Theme = 'light' | 'dark';
interface ThemeContextType { theme: Theme; toggleTheme: () => void; }

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // 1. الأولوية لما اختاره المستخدم سابقاً
    const saved = localStorage.getItem('nemora_theme') as Theme;
    if (saved) return saved;
    
    // 2. إذا لم يوجد، نتبع إعدادات جهاز المستخدم (System Preference)
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useLayoutEffect(() => {
    // تحديث السمة في الـ HTML
    document.documentElement.setAttribute('data-theme', theme);
    // جعل الـ scrollbar يتوافق مع الثيم (اختياري لكنه يعطي لمسة احترافية)
    document.documentElement.style.colorScheme = theme;
    
    localStorage.setItem('nemora_theme', theme);
    
    // تحديث لون شريط العنوان في الموبايل (Safari & Chrome Android)
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }
    // اللون هنا يجب أن يطابق تماماً لون الـ background في ملف الـ CSS الخاص بك
    meta.setAttribute('content', theme === 'dark' ? '#020617' : '#f8fafc');
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
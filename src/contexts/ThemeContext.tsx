import React, { createContext, useContext, useState, useLayoutEffect } from 'react';

type Theme = 'light' | 'dark';
interface ThemeContextType { theme: Theme; toggleTheme: () => void; }

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // 1. الأولوية المطلقة لما اختاره المستخدم يدوياً في المتصفح
    const saved = localStorage.getItem('nemora_theme') as Theme;
    if (saved) return saved;
    
    // 2. تغيير جوهري: جعل الافتراضي 'dark' دائماً بدلاً من اتباع إعدادات الجهاز
    return 'dark'; 
  });

  useLayoutEffect(() => {
    // تحديث السمة في الـ HTML
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.className = theme; // إضافة كلاس أيضاً لزيادة التأكيد في CSS
    
    // توافق الـ scrollbar
    document.documentElement.style.colorScheme = theme;
    
    localStorage.setItem('nemora_theme', theme);
    
    // تحديث لون شريط العنوان في الموبايل ليناسب الفخامة الداكنة
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }
    // تأكد أن هذه الألوان تطابق الخلفية (Background) في ملف CSS الخاص بك
    meta.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#ffffff');
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

// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isSystem: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  resolvedTheme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
  isSystem: true,
});

// Helper to get system theme preference
const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Helper to apply theme to document - UPDATED for CSS consistency
const applyThemeToDocument = (theme: ResolvedTheme) => {
  if (typeof document === 'undefined') return;
  
  const html = document.documentElement;
  
  // Update data-theme attribute (used in CSS)
  html.setAttribute('data-theme', theme);
  
  // Update class for Tailwind compatibility
  if (theme === 'dark') {
    html.classList.add('dark');
    html.classList.remove('light');
  } else {
    html.classList.add('light');
    html.classList.remove('dark');
  }
  
  // Update meta theme-color for mobile browsers - UPDATED colors
  const themeColor = theme === 'dark' ? '#0A0A0A' : '#FAFAFA';
  let metaThemeColor = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
  if (!metaThemeColor) {
    metaThemeColor = document.createElement('meta');
    metaThemeColor.name = 'theme-color';
    document.head.appendChild(metaThemeColor);
  }
  metaThemeColor.setAttribute('content', themeColor);
  
  // Update color-scheme CSS property
  document.documentElement.style.setProperty('--color-scheme', theme);
  
  // Update canonical URL - FIXED: Corrected variable name
  const currentUrl = window.location.href;
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = currentUrl;
  
  // Force reflow to ensure smooth transition
  html.getBoundingClientRect();
  
  // Dispatch theme change event for other components
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');
  const [isSystem, setIsSystem] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize theme from localStorage or system
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setThemeState(savedTheme);
        setIsSystem(false);
        applyThemeToDocument(savedTheme);
        setResolvedTheme(savedTheme);
      } else {
        // Use system preference
        const systemTheme = getSystemTheme();
        setThemeState('system');
        setIsSystem(true);
        applyThemeToDocument(systemTheme);
        setResolvedTheme(systemTheme);
        
        // Save system preference
        localStorage.setItem('theme', 'system');
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      // Fallback to system
      const systemTheme = getSystemTheme();
      setThemeState('system');
      setIsSystem(true);
      applyThemeToDocument(systemTheme);
      setResolvedTheme(systemTheme);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined' || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const newTheme = e.matches ? 'dark' : 'light';
      applyThemeToDocument(newTheme);
      setResolvedTheme(newTheme);
    };

    // Initial check
    handleChange(mediaQuery);

    // Modern event listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [theme]);

  // Set theme directly
  const setTheme = useCallback((newTheme: Theme) => {
    try {
      if (newTheme === 'system') {
        const systemTheme = getSystemTheme();
        setThemeState('system');
        setIsSystem(true);
        applyThemeToDocument(systemTheme);
        setResolvedTheme(systemTheme);
        localStorage.setItem('theme', 'system');
      } else {
        setThemeState(newTheme);
        setIsSystem(false);
        applyThemeToDocument(newTheme);
        setResolvedTheme(newTheme);
        localStorage.setItem('theme', newTheme);
      }
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }, []);

  // Toggle between light/dark while preserving system/override state
  const toggleTheme = useCallback(() => {
    if (theme === 'system') {
      // System is currently active, switch to opposite of current system theme
      const oppositeTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
      setTheme(oppositeTheme);
    } else {
      // Already in override mode, toggle between light/dark
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    }
  }, [theme, resolvedTheme, setTheme]);

  // Optional: Add keyboard shortcut (Ctrl/Cmd + Shift + T)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme]);

  // Optional: Watch for theme changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme' && e.newValue) {
        const newTheme = e.newValue as Theme;
        if (newTheme !== theme) {
          setTheme(newTheme);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [theme, setTheme]);

  // Provide theme preference to server (for SSR/Next.js)
  useEffect(() => {
    if (typeof document !== 'undefined' && isInitialized) {
      const script = document.createElement('script');
      script.type = 'application/json';
      script.id = 'theme-preference';
      script.textContent = JSON.stringify({
        theme,
        resolvedTheme,
        timestamp: new Date().toISOString(),
      });
      
      // Remove existing script if any
      const existing = document.getElementById('theme-preference');
      if (existing) existing.remove();
      
      document.head.appendChild(script);
    }
  }, [theme, resolvedTheme, isInitialized]);

  // Sync with CSS transitions for smoother theme switching
  useEffect(() => {
    const html = document.documentElement;
    
    // Enable transitions for theme switch
    html.classList.add('theme-transition');
    
    // Clean up
    return () => {
      html.classList.remove('theme-transition');
    };
  }, []);

  // Optional: Log theme changes in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && isInitialized) {
      console.log(`Theme changed: ${theme} (resolved: ${resolvedTheme})`);
    }
  }, [theme, resolvedTheme, isInitialized]);

  // Value to provide
  const value: ThemeContextType = {
    theme,
    resolvedTheme,
    toggleTheme,
    setTheme,
    isSystem,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
      
      {/* Inject CSS transitions for theme switching */}
      {typeof document !== 'undefined' && (
        <style dangerouslySetInnerHTML={{
          __html: `
            .theme-transition * {
              transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                          border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                          color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                          fill 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                          stroke 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                          box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            /* Prevent flash of unstyled content */
            :root:not([data-theme]) {
              color-scheme: light dark;
            }
            
            /* Smooth scrollbar transitions */
            ::-webkit-scrollbar-track {
              transition: background-color 0.4s ease;
            }
            
            ::-webkit-scrollbar-thumb {
              transition: background-color 0.4s ease;
            }
            
            /* Print styles - disable transitions */
            @media print {
              .theme-transition * {
                transition: none !important;
              }
            }
            
            /* Smooth transitions for our CSS custom properties */
            :root {
              transition: --color-surface 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                          --color-surface-elevated 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                          --color-on-surface 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                          --color-on-surface-muted 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                          --color-border 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
          `
        }} />
      )}
    </ThemeContext.Provider>
  );
};

// Custom hook with enhanced features
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  // Optional: Add a listener for external theme changes
  useEffect(() => {
    const handleThemeChange = (e: CustomEvent) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('Theme changed externally:', e.detail);
      }
    };
    
    window.addEventListener('themechange', handleThemeChange as EventListener);
    return () => {
      window.removeEventListener('themechange', handleThemeChange as EventListener);
    };
  }, []);
  
  return context;
};

// Helper hook for theme-dependent styling
export const useThemeClass = (lightClass: string, darkClass: string) => {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === 'dark' ? darkClass : lightClass;
};

// Helper hook for theme-dependent value
export const useThemeValue = <T,>(lightValue: T, darkValue: T): T => {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === 'dark' ? darkValue : lightValue;
};

// Utility function for server-side rendering
export const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') {
    // Server-side: check cookies or headers
    return 'system';
  }
  
  try {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved && (saved === 'light' || saved === 'dark' || saved === 'system')) {
      return saved;
    }
  } catch (error) {
    console.error('Error reading theme from localStorage:', error);
  }
  
  return 'system';
};

// Component to display current theme info (useful for debugging)
export const ThemeDebug: React.FC = () => {
  const { theme, resolvedTheme, isSystem } = useTheme();
  
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 left-4 z-50 p-2 bg-black/80 text-white text-xs rounded-lg backdrop-blur-sm">
      <div className="font-mono">
        <div>Theme: {theme}</div>
        <div>Resolved: {resolvedTheme}</div>
        <div>System: {isSystem ? 'Yes' : 'No'}</div>
      </div>
    </div>
  );
};

// Theme Toggle Component with enhanced UI - UPDATED for better styling
export const EnhancedThemeToggle: React.FC = () => {
  const { theme, resolvedTheme, toggleTheme, setTheme, isSystem } = useTheme();
  
  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
        <button
          onClick={() => setTheme('light')}
          className={`p-2 rounded-lg transition-all duration-300 ${theme === 'light' ? 'bg-white shadow-md text-amber-600' : 'hover:bg-white/50 text-gray-600 dark:text-gray-400'}`}
          aria-label="Light theme"
          title="Light theme"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
        
        <button
          onClick={() => setTheme('system')}
          className={`p-2 rounded-lg transition-all duration-300 ${theme === 'system' ? 'bg-gray-200 dark:bg-gray-700 shadow-md text-blue-600 dark:text-blue-400' : 'hover:bg-gray-200/50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400'}`}
          aria-label="System theme"
          title="Use system preference"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        
        <button
          onClick={() => setTheme('dark')}
          className={`p-2 rounded-lg transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800 shadow-md text-indigo-300' : 'hover:bg-gray-800/50 text-gray-600 dark:text-gray-400'}`}
          aria-label="Dark theme"
          title="Dark theme"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
        
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
          aria-label="Toggle theme"
          title="Toggle between light and dark"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
      </div>
      
      {isSystem && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
          Using system
        </div>
      )}
    </div>
  );
};

// Hook for media queries based on theme
export const useThemeMediaQuery = () => {
  const { resolvedTheme } = useTheme();
  
  const isDark = resolvedTheme === 'dark';
  const isLight = resolvedTheme === 'light';
  
  return {
    isDark,
    isLight,
    prefersDark: () => window.matchMedia('(prefers-color-scheme: dark)').matches,
    prefersLight: () => window.matchMedia('(prefers-color-scheme: light)').matches,
    prefersReducedMotion: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    prefersHighContrast: () => window.matchMedia('(prefers-contrast: high)').matches,
  };
};

// Simple Theme Toggle (alternative to EnhancedThemeToggle)
export const SimpleThemeToggle: React.FC = () => {
  const { resolvedTheme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="btn-ghost p-2 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300"
      aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {resolvedTheme === 'dark' ? (
        <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
};
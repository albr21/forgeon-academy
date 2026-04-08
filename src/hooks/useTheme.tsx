var APP = (window as any).APP;

function useTheme() {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem(APP.CONFIG.themeKey) || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(APP.CONFIG.themeKey, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  return { theme, toggleTheme };
}

APP.useTheme = useTheme;

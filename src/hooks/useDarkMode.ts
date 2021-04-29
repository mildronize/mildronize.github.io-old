import { useEffect, useState } from 'react';
import withThemeFlag from '../utils/withThemeFlag';

interface PropsType {
  setDarkMode: Function;
  setLightMode: Function;
}

const useDarkMode = () => {
  const [theme, setTheme] = useState('dark');
  const [componentMounted, setComponentMounted] = useState(false);

  const setMode = (mode:any) => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode);

    if(mode === 'dark') {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
      
    } else {
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
      
    }

    // window.__setPreferredTheme('dark');
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
    } else {
      setMode('dark');
    }
    setComponentMounted(true);
  }, []);

  return [theme, toggleTheme, componentMounted]
};

export default useDarkMode;
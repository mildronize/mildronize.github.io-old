import React from "react";
import { Helmet } from "react-helmet";
import config from "../../data/SiteConfig";
// import "./index.css";

import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { lightTheme, darkTheme, GlobalStyles } from '../themes';
import { useDarkMode } from '../hooks';

import ToggleDarkMode from '../components/ToggleDarkMode';

export default function MainLayout({ children }) {

  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />
  };

  return (
    <div className="layout-container">
      <Helmet>
        <meta name="description" content={config.siteDescription} />
        <html lang="en" />
      </Helmet>
     
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <ToggleDarkMode theme={theme} toggleTheme={toggleTheme} />
      Hello React App

      {children}
      </ThemeProvider>
    </div>
  );
}

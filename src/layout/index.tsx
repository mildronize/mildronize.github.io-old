import React from "react";
import { Helmet } from "react-helmet";
import config from "../../data/SiteConfig";
// import "./index.css";

import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme, GlobalStyles } from '../themes';
import { useDarkMode } from '../hooks';

// import ToggleDarkMode from '../components/ToggleDarkMode';

import { useSelector, useDispatch } from "react-redux";
import * as Theme from '../slices/theme.slice';

export default function MainLayout({ children }: any) {

  const theme: Theme.ThemeType = useSelector(Theme.selector);
  // const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme.isDark ? darkTheme : lightTheme;

  // if (!componentMounted) {
  //   return <div />
  // };


  return (
    <>
      <Helmet>
        <meta name="description" content={config.siteDescription} />
        <html lang="en" />
      </Helmet>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </>
  );
}

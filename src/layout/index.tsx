import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import config from "../../data/SiteConfig";
import "../themes/global.css";

import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../themes';
import { useDarkMode } from '../hooks';

// import ToggleDarkMode from '../components/ToggleDarkMode';

// import { useSelector, useDispatch } from "react-redux";
// import * as Theme from '../slices/theme.slice';

export default function MainLayout({ children }: any) {

  // const themeSelector: Theme.ThemeType = useSelector(Theme.selector);
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  let themeMode = darkTheme;

  // if (themeSelector.isDark === undefined) {
  //   console.log(theme);
  // useEffect(() => {
    // themeMode = theme === 'dark' ? darkTheme : lightTheme;
  // }, [theme]);

  // } else {

  // if (themeSelector.isDark !== undefined) {
  //   themeMode = themeSelector.isDark ? darkTheme : lightTheme;
  // }

  return (
    <>
      <Helmet>
        <meta name="description" content={config.siteDescription} />
        <html lang="en" />
      </Helmet>
      {/* <ThemeProvider theme={themeMode}> */}
        {/* <GlobalStyles /> */}
        {children}
      {/* </ThemeProvider> */}
    </>
  );
}

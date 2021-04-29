import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import config from "../../data/SiteConfig";
import "../themes/rootTheme.css";

import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../themes';

export default function MainLayout({ children }: any) {

  return (
    <>
      <Helmet>
        <meta name="description" content={config.siteDescription} />
        <html lang="en" />
      </Helmet>
      {/* <ThemeProvider theme={themeMode}> */}
      <GlobalStyle />
      {children}
      {/* </ThemeProvider> */}
    </>
  );
}

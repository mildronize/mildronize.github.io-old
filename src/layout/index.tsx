import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import config from "../../data/SiteConfig";
import "../themes/rootTheme.css";

import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../themes';
import styled from 'styled-components';
export default function MainLayout({ children }: any) {

  return (
    <>
      <Helmet>
        <meta name="description" content={config.siteDescription} />
        <html lang="en" />
      </Helmet>
      {/* <ThemeProvider theme={themeMode}> */}
      <GlobalStyle />
      <Container >
        {children}
      </Container>
      {/* </ThemeProvider> */}
    </>
  );
}

const Container = styled.div`
  padding: 0 20px;
`;
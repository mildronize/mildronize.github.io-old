import React from "react";
import styled from 'styled-components';
import Layout from ".";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer/Footer";
import config from "../../data/SiteConfig";
import CenterContainer from "../components/CenterContainer";

interface ICenterContainerProps {
  children: React.ReactNode;
  wide?: boolean;
}

const PageLayout = ({ children, wide }: any) => {

    return (
        <Layout>
            <TopBar />
            <CenterContainer wide={wide}>
                {children}
            </CenterContainer>
            <Footer config={config} />
        </Layout>
    );
};

export default PageLayout;

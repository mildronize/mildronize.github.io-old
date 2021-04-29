import React from "react";
import styled from 'styled-components';
import Layout from ".";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer/Footer";
import config from "../../data/SiteConfig";
import CenterContainer from "../components/CenterContainer";

const PageLayout = (props: any) => {
    const { children } = props;

    return (
        <Layout>
            <TopBar />
            <CenterContainer>
                {children}
            </CenterContainer>
            <Footer config={config} />
        </Layout>
    );
};

export default PageLayout;
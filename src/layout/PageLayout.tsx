import React from "react";
import styled from 'styled-components';
import Layout from ".";
import TopBar from "../components/TopBar";
import CenterContainer from "../components/CenterContainer";

const PageLayout = (props: any) => {
    const { children } = props;

    return (
        <Layout>
            <TopBar />
            <CenterContainer>
                {children}
            </CenterContainer>
        </Layout>
    );
};

export default PageLayout;
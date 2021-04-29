import React from "react";
import styled from 'styled-components';
import Layout from ".";
import TopBar from "../components/TopBar";

const PageLayout = (props: any) => {
    const { children, ...restProps } = props;

    return (
        <Layout>

            <Container {...restProps}>
                <TopBar />
                {children}
            </Container>
        </Layout>
    );
};

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;


export default PageLayout;
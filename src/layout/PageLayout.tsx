import React from "react";
import styled from 'styled-components';
import Layout from ".";

const PageLayout = (props: any) => {
    const { children, ...restProps } = props;

    return (
        <Layout>
            <Container {...restProps}>
                {children}
            </Container>
        </Layout>
    );
};

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;


export default PageLayout;
import React, { useState, useEffect } from "react";
import styled from 'styled-components';

const CenterContainer = (props: any) => {
  const { children, ...restProps } = props;

  return (
    <Container {...restProps}>
      {children}
    </Container>
  );
};

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

export default CenterContainer;
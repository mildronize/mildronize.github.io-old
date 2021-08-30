import React, { useState, useEffect } from "react";
import styled from 'styled-components';

interface ICenterContainerProps {
  children: React.ReactNode;
  wide?: boolean;
}

const CenterContainer = ({ children, wide = false }: ICenterContainerProps) => {

  return (
    <Container wide={wide}>
      {children}
    </Container>
  );
};
interface IContainerProps {
  wide: boolean;
}

const Container = styled.div`
  max-width: ${(props: IContainerProps) => props.wide? 1300 :700}px;
  margin: 0 auto;
`;

export default CenterContainer;

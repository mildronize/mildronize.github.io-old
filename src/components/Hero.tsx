import React, { useState, useEffect } from "react";
import styled from 'styled-components';

const Hero = (props: any) => {
  const { ...restProps } = props;

  return (
    <Container {...restProps}>
      <h2>Hi 👋 I'm Thada, welcome to my blog. <Subtitle>You can find almost stuff about me: 
        sharing ideas, programming techniques, web technology and others.</Subtitle></h2>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 150px;
  margin-bottom: 100px;

  h2{
    font-family: var(--font-family-inter);
  }
`;

const Subtitle = styled.span`
  color: var(--colors-text-2);
`;

export default Hero;
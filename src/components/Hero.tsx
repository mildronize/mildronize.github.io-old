import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import "../themes/font-awesome-all-5.2.0.css";

const Hero = (props: any) => {
  const { ...restProps } = props;

  return (
    <Container {...restProps}>
      <h2>Hi 👋 I'm Thada, Software Engineer, welcome to my blog. <Subtitle>
        Sharing ideas, programming techniques, web technology and others.</Subtitle></h2>

        <Button href="https://bit.ly/mildthada-notion-cv-v3" target="_blank">📄&nbsp; About</Button>
        <Button href="https://github.com/mildronize" target="_blank"><i className="fab fa-github"></i>&nbsp; Github</Button>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 150px;
  margin-bottom: 100px;

  h2{
    font-family: var(--font-family-inter);
    font-size: 1.6rem;

    ${breakpoint('tablet')`
      font-size: 2rem;
    `}

  }
`;

const Button = styled.a`
  font-weight: bold;
  padding: 10px;
  border-radius: 10px;
  :hover{
    background: var(--colors-hover-0);
  }
  i{
    color: var(--color-default);
    font-size: 1.2em;
  }
`;

const Subtitle = styled.span`
  color: var(--colors-text-2);
`;

export default Hero;

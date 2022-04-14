import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { onMobile, onTablet } from '../themes/responsive';
import "../themes/font-awesome-all-5.2.0.css";
import LinkButton from "./Button";
import UserLinks from "./UserLinks/UserLinks";
import config from "../../data/SiteConfig";

const Hero = (props: any) => {
  const { ...restProps } = props;

  return (
    <Container {...restProps}>
      <h2>Hi 👋 I'm Thada, DevSecOps Engineer, welcome to my blog. <Subtitle>
        Sharing ideas, programming techniques, web technology and others.</Subtitle></h2>
        <LinkButton href="/about">👤&nbsp; About Me</LinkButton>
        <LinkButton href="/cv" target="_blank">📄&nbsp; Resume</LinkButton>
        {/* <LinkButton href="https://github.com/mildronize" target="_blank"><i className="fab fa-github"></i>&nbsp; Github</LinkButton> */}
        <Social>Getting to know me: <UserLinks config={config} /></Social>
    </Container>
  );
};

const Container = styled.div`

  margin-bottom: 100px;

  h2{
    font-family: var(--font-family-inter);
    font-size: 1.3rem;

    ${onMobile} {
      font-size: 1.8rem;
    }

  }
`;


const Subtitle = styled.span`
  color: var(--colors-text-2);
`;

const Social = styled.p`
  margin-left: 8px;
  margin-top: 20px;
  font-size: 0.7rem;
`;

export default Hero;

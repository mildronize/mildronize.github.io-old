import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Link } from "gatsby";
import Flex from './Flex';
import ToggleDarkMode from './ToggleDarkModeWrapper';
import CenterContainer from "../components/CenterContainer";
import logo from './logo.png';

const TopBar = (props: any) => {
  const { ...restProps } = props;

  return (
    <div {...restProps}>
      <FixedTopContainer >
        <CenterContainer>
          <Flex container justify="space-between" >
            <Flex >
              <Link to="/" ><Logo src={logo} alt="Logo" /></Link>
            </Flex>
            <Flex >
              <ToggleDarkMode />
            </Flex>
          </Flex>
        </CenterContainer>
      </FixedTopContainer>
      <HeaderOffsetBottom />
    </div>
  );
};

const FixedTopContainer = styled.div`

  margin: 0;
  padding: 15px 0 10px 0;
  overflow: hidden;
  background: var(--background-default);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(10, 10, 10, 0.1);
  transition: var(--theme-transition);
`;

const Logo = styled.img`
  height: 28px;
`;
const HeaderOffsetBottom = styled.div`
  margin-bottom: 100px;
`;

export default TopBar;
import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Link } from "gatsby";
import ToggleDarkMode from './ToggleDarkModeWrapper';
import CenterContainer from "../components/CenterContainer";
import logo from './logo.png';

const TopBar = (props: any) => {
  const { ...restProps } = props;

  return (
    <div {...restProps}>
      <FixedTopContainer >
        <CenterContainer>
          <FlexContainer>
            <FlexItem>
              <Logo><Link to="/" >Mildronize</Link></Logo>
            </FlexItem>
            <FlexItem >
              <ToggleOffset>
                <ToggleDarkMode />
              </ToggleOffset>
            </FlexItem>
          </FlexContainer>
        </CenterContainer>
      </FixedTopContainer>
      <HeaderOffsetBottom />
    </div>
  );
};

const FixedTopContainer = styled.div`

  margin: 0;
  margin-left: -20px;
  padding: 15px 20px 10px 20px;
  overflow: hidden;
  background: var(--background-default);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  box-shadow: var(--shadow-2);
  transition: var(--theme-transition);
`;

// const Logo = styled.img`
//   height: 28px;
// `;

const Logo = styled.span`
  a{
    color: var(--colors-logo);
    font-family: var(--font-family-inter);
    font-weight: 700;
    font-size: 1.3rem;
  }
`;
const HeaderOffsetBottom = styled.div`
  margin-bottom: 100px;
`;

const ToggleOffset = styled.div`
margin-top:4px;
`;


const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FlexItem = styled.div``;


export default TopBar;
import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Link } from "gatsby";
import ToggleDarkMode from './ToggleDarkModeWrapper';
import CenterContainer from "./CenterContainer";
import logo from './logo.png';



const TopBar = (props: any) => {
  const { ...restProps } = props;
  const [draftMode, setDraftMode] = useState(false);

  const handleDraftMode = () => {
    if (!window) return '';
    if(/^\/draft\//.test(window.location.pathname)) {
      setDraftMode(true);
    }
  }

  useEffect(() => {
    handleDraftMode();
  }, []);


  return (
    <div {...restProps}>
      <FixedTopContainer >
        <CenterContainer wide>
          <FlexContainer>
            <FlexItem>
              <Logo><Link to="/" >Thada W.</Link></Logo>
              {draftMode && <DraftLabel><Link to="/draft" >DRAFT</Link></DraftLabel>}
            </FlexItem>
            <FlexItem >
              <MenuItem><Link to="/blog" >Blog</Link></MenuItem>
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

const DraftLabel = styled.span`
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  margin-left: 25px;
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 7px;
  background-color: var(--colors-blockquote);

  a{
    color: var(--color-default);
  }
`;

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
  margin-left: 5px;
`;


const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FlexItem = styled.div`
  display: flex;
  align-items: center;
`;

const MenuItem = styled.div`
  margin: 0 15px;
  cursor: pointer;
`;

export default TopBar;

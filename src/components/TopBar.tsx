import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Link } from "gatsby";
import ToggleDarkMode from './ToggleDarkModeWrapper';
import CenterContainer from "./CenterContainer";
import { useResponsive } from "../themes/responsive";

const TopBar = (props: any) => {
  const { ...restProps } = props;
  const { isMobile } = useResponsive();
  const [draftMode, setDraftMode] = useState(false);

  const isActiveMenu = (path: string) => {
    if (typeof window === 'undefined') return false;
    const regexString = `${path}`;
    const regex = new RegExp(regexString,"gm");
    if (regex.test(window.location.pathname)) {
      return true;
    }
    return false;
  }

  const handleDraftMode = () => {
    if (!window) return '';
    if (/^\/draft\//.test(window.location.pathname)) {
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
              <MenuItem active={isActiveMenu('/talk')}><Link to="/talk" >talk</Link></MenuItem>
              <MenuItem active={isActiveMenu('/blog')}><Link to="/blog" >blog</Link></MenuItem>
              {!isMobile && <MenuItem active={isActiveMenu('/tags')}><Link to="/tags" >tags</Link></MenuItem>}
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

type MenuItemType = {active?: boolean};
const MenuItem = styled.div`
  margin: 0 8px 0 8px;

  cursor: pointer;
  a {
    border-radius: 10px;
    color: ${(props :MenuItemType ) => props.active? `var(--text-heading)`: `var(--color-default)`};
    font-weight: ${(props :MenuItemType ) => props.active? `bold`: `300`};
    background:  ${(props :MenuItemType ) => props.active? ` var(--colors-hover-0)`: `none`};
    padding: 8px 12px;
  }
  a:hover {
    color: var(--text-heading);
    background: var(--colors-hover-0);
  }

`;

export default TopBar;

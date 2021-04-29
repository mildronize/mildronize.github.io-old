// Adapted from: https://codepen.io/aaroniker/pen/KGpXZo and 
// https://github.com/narative/gatsby-theme-novela/blob/714b6209c5bd61b220370e8a7ad84c0b1407946a/%40narative/gatsby-theme-novela/src/components/Navigation/Navigation.Header.tsx

import React from 'react'
import { func, string } from 'prop-types';
import styled from 'styled-components';

const ToggleDarkMode = ({ theme, toggleTheme }: any) => {
  const isDark = theme === 'dark';
  return (
    <>
      <IconWrapper
      isDark={isDark}
      onClick={toggleTheme}
      data-a11y="false"
      aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
      title={isDark ? "Activate light mode" : "Activate dark mode"}
    >
      <MoonOrSun isDark={isDark} />
      <MoonMask isDark={isDark} />
    </IconWrapper>
    </>
   
  );
};
const IconWrapper = styled.button<{ isDark: boolean }>`


  cursor: pointer;
  opacity: 0.5;
  position: relative;
  border-radius: 5px;
  width: 45px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  /* margin-top: 5px; */
  border: 0;
  background: rgba(255, 255, 255, 0.01);
  &:hover {
    opacity: 1;
  }
  &[data-a11y="true"]:focus::after {
    content: "";
    position: absolute;
    left: 0;
    top: -30%;
    width: 100%;
    height: 160%;
    border: 2px solid var(--color-default);
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  

`;

// This is based off a codepen! Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
const MoonOrSun = styled.div<{ isDark: boolean }>`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: ${p => (p.isDark ? "4px" : "2px")} solid
    var(--color-default);
  background: var(--color-default);
  transform: scale(${p => (p.isDark ? 0.55 : 1)});
  transition: all 0.45s ease;
  overflow: ${p => (p.isDark ? "visible" : "hidden")};
  &::before {
    content: "";
    position: absolute;
    right: -9px;
    top: -9px;
    height: 24px;
    width: 24px;
    border: 2px solid var(--color-default);
    border-radius: 50%;
    transform: translate(${p => (p.isDark ? "14px, -14px" : "0, 0")});
    opacity: ${p => (p.isDark ? 0 : 1)};
    transition: transform 0.45s ease;
  }
  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 -23px 0 var(--color-default),
      0 23px 0 var(--color-default),
      23px 0 0 var(--color-default),
      -23px 0 0 var(--color-default),
      15px 15px 0 var(--color-default),
      -15px 15px 0 var(--color-default),
      15px -15px 0 var(--color-default),
      -15px -15px 0 var(--color-default);
    transform: scale(${p => (p.isDark ? 1 : 0)});
    transition: all 0.35s ease;
  }
`;

const MoonMask = styled.div<{ isDark: boolean }>`
  position: absolute;
  right: -1px;
  top: -8px;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 0;
  background: var(--background-default);
  transform: translate(${p => (p.isDark ? "14px, -14px" : "0, 0")});
  opacity: ${p => (p.isDark ? 0 : 1)};
  /* background 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad) */
  /* transition: ${p => p.theme.colorModeTransition}, transform 0.45s ease; */
  transition: background 0.25s  var(--ease-in-out-quad), transform 0.45s ease; 
`;

export default ToggleDarkMode;
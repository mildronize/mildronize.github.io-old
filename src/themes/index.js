import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components'
export { GlobalStyles } from './global';

const colorModeTransition =
  'background 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad)';

export const lightTheme = {
  text: '#363537',
  colorModeTransition,
  colors: {
    primary: '#363537',
    accent: 'red',
    background: '#ffffff',
  }
}

export const darkTheme = {  
  text: '#FAFAFA',
  colorModeTransition,
  colors: {
    primary: '#FAFAFA',
    accent: 'hotpink',
    background: '#363537',
  }
}
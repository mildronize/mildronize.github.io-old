import React from 'react';
import { ThemeProvider, createGlobalStyle, DefaultTheme } from 'styled-components'
export { GlobalStyles } from './global';

const colorModeTransition =
  'background 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad)';

export const lightTheme: DefaultTheme = {

  colorModeTransition,
  colors: {
    primary: '#363537',
    background: '#ffffff',

    default: '#363537',
    gray: '#ffffff',
    brown: '#ffffff',
    orange: '#ffffff',
    yellow: '#ffffff',
    green: '#ffffff',
    blue: '#ffffff',
    purple: '#ffffff',
    pink: '#ffffff',
    red: '#ffffff'
  },
  background: {
    default: '#ffffff',
    gray: '#ffffff',
    brown: '#ffffff',
    orange: '#ffffff',
    yellow: '#ffffff',
    green: '#ffffff',
    blue: '#ffffff',
    purple: '#ffffff',
    pink: '#ffffff',
    red: '#ffffff'
  }
}

export const darkTheme: DefaultTheme = {

  colorModeTransition,
  colors: {
    primary: '#FAFAFA',
    background: '#363537',

    default: '#FAFAFA',
    gray: '#ffffff',
    brown: '#ffffff',
    orange: '#ffffff',
    yellow: '#ffffff',
    green: '#ffffff',
    blue: '#ffffff',
    purple: '#ffffff',
    pink: '#ffffff',
    red: '#ffffff'
  },

  background: {
    default: '#363537',
    gray: '#ffffff',
    brown: '#ffffff',
    orange: '#ffffff',
    yellow: '#ffffff',
    green: '#ffffff',
    blue: '#ffffff',
    purple: '#ffffff',
    pink: '#ffffff',
    red: '#ffffff'
  }
}



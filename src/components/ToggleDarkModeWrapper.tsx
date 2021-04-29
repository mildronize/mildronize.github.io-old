// https://github.com/narative/gatsby-theme-novela/blob/714b6209c5bd61b220370e8a7ad84c0b1407946a/%40narative/gatsby-theme-novela/src/components/Navigation/Navigation.Header.tsx

import React, { useState } from 'react'
import { func, string } from 'prop-types';
import styled from 'styled-components';
import withThemeFlag from '../utils/withThemeFlag';
import ToggleDarkMode from './ToggleDarkMode';

const ToggleDarkModeWrapper = ({ isLightTheme }: any) => {
    const setTheme = () => {
        console.log(isLightTheme ? 'light' : 'dark');
        window.__setPreferredTheme(isLightTheme ? 'dark' : 'light')
    }
    return (
        <>
            {isLightTheme != null ? (
                <ToggleDarkMode theme={isLightTheme ? 'light' : 'dark'} toggleTheme={setTheme} />
            ) : (
                <div style={{ height: '24px' }} />
            )}
        </>

    );
};

export default withThemeFlag(ToggleDarkModeWrapper);
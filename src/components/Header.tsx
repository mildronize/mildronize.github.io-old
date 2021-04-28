import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import Flex from './Flex';
import { lightTheme, darkTheme, GlobalStyles } from '../themes';
import { useDarkMode } from '../hooks';

import ToggleDarkMode from './ToggleDarkMode';

import { useSelector, useDispatch } from "react-redux";
import * as Theme from '../slices/theme.slice';


const Header = (props: any) => {
  const { ...restProps } = props;
  const dispatch = useDispatch();
  const [theme, toggleTheme, componentMounted] = useDarkMode();

  useEffect(() => {
    if (theme === 'light')
      dispatch(Theme.actions.setIsDark(false));
    else
      dispatch(Theme.actions.setIsDark(true));
  }, [theme]);

  if (!componentMounted) {
    return <div />
  };

  return (
    <Container {...restProps}>
      <ToggleDarkMode theme={theme} toggleTheme={toggleTheme} />
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const HorizontalLine = styled.hr`
  /* color:  */
`;


export default Header;
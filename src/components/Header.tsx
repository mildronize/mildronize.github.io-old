import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { lighten, darken } from 'polished';

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

  // if (!componentMounted) {
  //   return <div />
  // };

  return (
    <Container {...restProps}>

      <Flex justify="space-between" >
        <Flex >
          Mildronize
        </Flex>
        <Flex >
          <ToggleDarkMode theme={theme} toggleTheme={toggleTheme} />
        </Flex>
      </Flex>
      <HorizontalLine />

    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;
`;

const HorizontalLine = styled.hr`
  border: 0px;
  border-bottom: 1px solid ${p => p.theme.colors.gray};
`;


export default Header;
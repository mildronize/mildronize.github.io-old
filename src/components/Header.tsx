import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { lighten, darken } from 'polished';
import { graphql, Link } from "gatsby";

import Flex from './Flex';
import { lightTheme, darkTheme, GlobalStyles } from '../themes';
// import { useDarkMode } from '../hooks';

import ToggleDarkMode from './ToggleDarkModeWrapper';
import { useSelector, useDispatch } from "react-redux";
import * as Theme from '../slices/theme.slice';


const Header = (props: any) => {
  const { ...restProps } = props;
  const dispatch = useDispatch();
  
  const setDarkMode = () => {
    dispatch(Theme.actions.setIsDark(true));
  }

  const setLightMode = () => {
    dispatch(Theme.actions.setIsDark(false));
  }
  // const [theme, toggleTheme, componentMounted] = useDarkMode(
  //   // setDarkMode, setLightMode
  // );

  // useEffect(() => {
  //   // console.log(theme);
  //   if (theme === 'light')
  //     dispatch(Theme.actions.setIsDark(false));
  //   else
  //     dispatch(Theme.actions.setIsDark(true));
  // }, [theme]);




  return (
    <Container {...restProps}>

      <Flex justify="space-between" >
        <Flex >
          <Link to="/" >Mildronize</Link>
        </Flex>
        <Flex >
          {/* <ToggleDarkMode theme={theme} toggleTheme={toggleTheme} /> */}
          <ToggleDarkMode />
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
  border-bottom: 1px solid var(--colorDefault);
`;


export default Header;
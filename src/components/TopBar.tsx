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


const TopBar = (props: any) => {
  const { ...restProps } = props;

  return (
    <Container {...restProps}>

      <ul>
        <li><a className="active" href="#home">Home</a></li>
        <li><a href="#news">News</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#about">About</a></li>
      </ul>

    </Container>
  );
};

const Container = styled.div`
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 0;
  width: 100%;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #111;
}

.active {
  /* background-color: #4CAF50; */
}
`;

const HorizontalLine = styled.hr`
  border: 0px;
  border-bottom: 1px solid var(--color-default);
`;


export default TopBar;
// https://www.freecodecamp.org/news/how-to-get-started-with-gatsby-2-and-redux-ae1c543571ca/
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

export default ({ element }:any) => (
  <Provider store={store}>{element}</Provider>
);
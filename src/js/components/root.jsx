import React from 'react';
import { Provider } from 'react-redux';
import App from './app';

const Root = ({store}) => {
  return (
    <Provider store={store}>
      <App hello="hi"/>
    </Provider>
  );
};


export default Root;

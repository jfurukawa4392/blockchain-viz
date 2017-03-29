import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import { mineBlock } from './actions/chain_actions';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');
  let store = configureStore();

  window.store = store;
  window.state = store.getState;
  window.dispatch = store.dispatch;
  window.mineBlock = mineBlock;

  ReactDOM.render(<Root store={store}/>, root);
});

import { createStore } from 'redux';
import RootReducer from '../reducers/root_reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = (preloadedState = {}) => (
  createStore(
    RootReducer,
    preloadedState
  )
);

export default configureStore;

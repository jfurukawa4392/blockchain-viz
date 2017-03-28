import { combineReducers } from 'redux';
import BlocksReducer from './blocks_reducer';

const RootReducer = combineReducers({
  blocks: BlocksReducer,
});

export default RootReducer;

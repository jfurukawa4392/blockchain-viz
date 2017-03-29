import { combineReducers } from 'redux';
import BlocksReducer from './blocks_reducer';
import NodesReducer from './nodes_reducer';

const RootReducer = combineReducers({
  blocks: BlocksReducer,
  nodes: NodesReducer
});

export default RootReducer;

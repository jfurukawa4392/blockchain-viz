import { combineReducers } from 'redux';
import BlocksReducer from './blocks_reducer';
import NodesReducer from './nodes_reducer';
import TransactionsReducer from './transactions_reducer';

const RootReducer = combineReducers({
  blocks: BlocksReducer,
  nodes: NodesReducer,
  unverifiedTxns: TransactionsReducer,
});

export default RootReducer;

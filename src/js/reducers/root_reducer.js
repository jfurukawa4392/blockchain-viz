import { combineReducers } from 'redux';
import BlocksReducer from './blocks_reducer';
import NodesReducer from './nodes_reducer';
import TransactionsReducer from './transactions_reducer';
import DetailReducer from './detail_reducer';
import UserNodeReducer from './user_node_reducer';

const RootReducer = combineReducers({
  blocks: BlocksReducer,
  nodes: NodesReducer,
  unverifiedTxns: TransactionsReducer,
  userNode: UserNodeReducer,
  detail: DetailReducer
});

export default RootReducer;

import {
  RECEIVE_TRANSACTION
} from '../actions/node_actions';
import merge from 'lodash/merge';

const TransactionsReducer = (state = [], action) => {
  let newState;
  switch(action.type){
    case(RECEIVE_TRANSACTION):
      newState = state.map(txn => Object.assign({}, txn));
      newState.push(action.txn);
      return newState;
    default:
      return state;
  }
};

export default TransactionsReducer;

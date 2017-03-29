import {
  RECEIVE_TRANSACTION,
} from '../actions/node_actions';
import {
  CLEAR_TRANSACTIONS
} from '../actions/transactions_actions';
import merge from 'lodash/merge';

const TransactionsReducer = (state = [], action) => {
  let newState;
  switch(action.type){
    case(RECEIVE_TRANSACTION):
      newState = state.map(txn => Object.assign({}, txn));
      newState.push(action.txn);
      return newState;
    case(CLEAR_TRANSACTIONS):
      return [];
    default:
      return state;
  }
};

export default TransactionsReducer;

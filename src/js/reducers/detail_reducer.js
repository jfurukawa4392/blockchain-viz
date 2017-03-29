import { RECEIVE_BLOCK } from '../actions/chain_actions';
import { RECEIVE_NODE } from '../actions/node_actions';

const _nullDetail = {};

const DetailReducer = (state = _nullDetail, action) => {
  let newState;
  switch(action.type){
    case(RECEIVE_NODE):
      return action.node;
    case(RECEIVE_BLOCK):
      return action.block;
    default:
      return state;
  }
};

export default DetailReducer;

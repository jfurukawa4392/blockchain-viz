import { RECEIVE_BLOCK } from '../actions/chain_actions';
import { RECEIVE_NODE, RECEIVE_INITIAL } from '../actions/node_actions';

const initialDetail = {};

const DetailReducer = (state = initialDetail, action) => {
  let newState;
  switch(action.type){
    case(RECEIVE_NODE):
      return action.node;
    case(RECEIVE_BLOCK):
      return action.block;
    case(RECEIVE_INITIAL):
      return initialDetail;
    default:
      return state;
  }
};

export default DetailReducer;

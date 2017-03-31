import { RECEIVE_USER_NODE } from '../actions/node_actions';
import { MINE_BLOCK } from '../actions/chain_actions';
import merge from 'lodash/merge';

const UserNodeReducer = (state = {}, action) => {
  let newState;
  switch(action.type){
    case(RECEIVE_USER_NODE):
      return action.node;
    case(MINE_BLOCK):
      newState = merge({}, state);
      newState.balance += 25;
      newState.minedBlocks.push(action.block.hash);
      return newState;
    default:
      return state;
  }
};

export default UserNodeReducer;

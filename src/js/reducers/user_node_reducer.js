import { RECEIVE_USER_NODE } from '../actions/node_actions';
import merge from 'lodash/merge';

const UserNodeReducer = (state = {}, action) => {
  let newState;
  switch(action.type){
    case(RECEIVE_USER_NODE):
      return action.node;
    default:
      return state;
  }
};

export default UserNodeReducer;

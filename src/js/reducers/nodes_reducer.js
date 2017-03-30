import {
  RECEIVE_NODE
} from '../actions/node_actions';
import merge from 'lodash/merge';

const randCoord = (maximum, minimum) => (
  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
);

const makeHash = () => (
  Math.random().toString(36).slice(19)
);

const _nodes = {
  readOnly: [
    { id: makeHash(), x: 350, y: 75, miner: false, balance: 50 },
    { id: makeHash(), x: 300, y: 100, miner: false, balance: 50 },
    { id: makeHash(), x: 350, y: 125, miner: false, balance: 50 },
    { id: makeHash(), x: 300, y: 150, miner: false, balance: 50 },
    { id: makeHash(), x: 350, y: 175, miner: false, balance: 50 },
    { id: makeHash(), x: 300, y: 200, miner: false, balance: 50 },
    { id: makeHash(), x: 350, y: 225, miner: false, balance: 50 },
    { id: makeHash(), x: 300, y: 250, miner: false, balance: 50 },
    { id: makeHash(), x: 350, y: 275, miner: false, balance: 50 },
  ],
  miners: [
    { id: makeHash(), x: 150, y: 125, miner: true, minedBlocks: [], balance: 50 },
    { id: makeHash(), x: 150, y: 175, miner: true, minedBlocks: [], balance: 50 },
    { id: makeHash(), x: 150, y: 225, miner: true, minedBlocks: [], balance: 50 }
  ]
};

const NodesReducer = (state = _nodes, action) => {
  let newState;
  switch(action.type){
    case(RECEIVE_NODE):
      newState = merge({}, state);
      if(action.node.miner){
        let tgtNode = newState.miners.filter((node) => node.id === action.node.id)[0];
        tgtNode.minedBlocks = action.node.minedBlocks;
        newState.miners = newState.miners.map((node) => {
          if(node.id === tgtNode.id){
            return tgtNode;
          } else {
            return node;
          }
        });
        return newState;
      }
      return state;
    default:
      return state;
  }
};

export default NodesReducer;

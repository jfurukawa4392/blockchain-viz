import { RECEIVE_NODE } from '../actions/node_actions';
import { MINE_BLOCK } from '../actions/chain_actions';

import merge from 'lodash/merge';

const randCoord = (maximum, minimum) => (
  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
);

const makeHash = () => (
  Math.random().toString(36).slice(19)
);

// const _nodes = {
//   readOnly: [
//     { id: makeHash(), x: 400, y: 75, miner: false, balance: 50 },
//     { id: makeHash(), x: 400, y: 125, miner: false, balance: 50 },
//     { id: makeHash(), x: 400, y: 175, miner: false, balance: 50 },
//     { id: makeHash(), x: 400, y: 225, miner: false, balance: 50 },
//     { id: makeHash(), x: 400, y: 275, miner: false, balance: 50 },
//     { id: makeHash(), x: 300, y: 100, miner: false, balance: 50 },
//     { id: makeHash(), x: 300, y: 150, miner: false, balance: 50 },
//     { id: makeHash(), x: 300, y: 200, miner: false, balance: 50 },
//     { id: makeHash(), x: 300, y: 250, miner: false, balance: 50 },
//   ],
//   miners: [
//     { id: makeHash(), x: 150, y: 125, miner: true, minedBlocks: [], balance: 50 },
//     { id: makeHash(), x: 150, y: 175, miner: true, minedBlocks: [], balance: 50 },
//     { id: makeHash(), x: 150, y: 225, miner: true, minedBlocks: [], balance: 50 }
//   ]
// };

const _nodes = [
    { id: makeHash(), x: 400, y: 75, miner: false, balance: 50 },
    { id: makeHash(), x: 400, y: 125, miner: false, balance: 50 },
    { id: makeHash(), x: 400, y: 175, miner: false, balance: 50 },
    { id: makeHash(), x: 400, y: 225, miner: false, balance: 50 },
    { id: makeHash(), x: 400, y: 275, miner: false, balance: 50 },
    { id: makeHash(), x: 300, y: 100, miner: false, balance: 50 },
    { id: makeHash(), x: 300, y: 150, miner: false, balance: 50 },
    { id: makeHash(), x: 300, y: 200, miner: false, balance: 50 },
    { id: makeHash(), x: 300, y: 250, miner: false, balance: 50 },
    { id: makeHash(), x: 150, y: 125, miner: true, minedBlocks: [], balance: 50 },
    { id: makeHash(), x: 150, y: 175, miner: true, minedBlocks: [], balance: 50 },
    { id: makeHash(), x: 150, y: 225, miner: true, minedBlocks: [], balance: 50 }
];

const NodesReducer = (state = _nodes, action) => {
  let newState;
  switch(action.type){
    case(RECEIVE_NODE):
      newState = state.map(node => Object.assign({}, node));
      if(action.node.miner){
        let tgtNode = newState.filter((node) => node.id === action.node.id)[0];
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
    case(MINE_BLOCK):
      newState = merge({}, state);
      action.txns.forEach((txn) => {
        newState
      });
      return newState;
    default:
      return state;
  }
};

export default NodesReducer;

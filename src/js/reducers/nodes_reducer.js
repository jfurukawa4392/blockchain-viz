import { RECEIVE_NODE } from '../actions/node_actions';
import { MINE_BLOCK } from '../actions/chain_actions';

import merge from 'lodash/merge';

const randCoord = (maximum, minimum) => (
  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
);

const makeHash = () => (
  Math.random().toString(36).slice(2)
);

const _nodes = [
    { id: makeHash(), x: 425, y: 95, miner: false, balance: 50 },
    { id: makeHash(), x: 460, y: 125, miner: false, balance: 50 },
    { id: makeHash(), x: 480, y: 175, miner: false, balance: 50 },
    { id: makeHash(), x: 460, y: 225, miner: false, balance: 50 },
    { id: makeHash(), x: 425, y: 250, miner: false, balance: 50 },
    { id: makeHash(), x: 350, y: 100, miner: false, balance: 50 },
    { id: makeHash(), x: 300, y: 150, miner: false, balance: 50 },
    { id: makeHash(), x: 300, y: 200, miner: false, balance: 50 },
    { id: makeHash(), x: 350, y: 250, miner: false, balance: 50 },
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
        newState = newState.map((node) => {
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
      newState = state.map(node => Object.assign({}, node));
      action.block.txns.forEach((txn) => {
        if(txn.to !== txn.from){
          for (let i = 0; i < newState.length; i++) {
            if(newState[i].id === txn.to){
              newState[i].balance += txn.amount;
            } else if(newState[i].id === txn.from){
              newState[i].balance -= txn.amount;
            }
          }
        }
      });
      newState.filter((node) => node.id === action.block.minedBy.id)[0].balance += 25;
      return newState;
    default:
      return state;
  }
};

export default NodesReducer;

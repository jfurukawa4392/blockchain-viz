import {
  RECEIVE_NODE
} from '../actions/node_actions';
import merge from 'lodash/merge';

const randCoord = (maximum, minimum) => (
  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
);

const _nodes = {
  readOnly: [
    { id: 1, x: randCoord(450, 50), y: randCoord(350, 50), miner: false },
    { id: 2, x: randCoord(450, 50), y: randCoord(350, 50), miner: false },
    { id: 3, x: randCoord(450, 50), y: randCoord(350, 50), miner: false },
    { id: 4, x: randCoord(450, 50), y: randCoord(350, 50), miner: false },
    { id: 5, x: randCoord(450, 50), y: randCoord(350, 50), miner: false },
    { id: 6, x: randCoord(450, 50), y: randCoord(350, 50), miner: false },
    { id: 7, x: randCoord(450, 50), y: randCoord(350, 50), miner: false },
    { id: 8, x: randCoord(450, 50), y: randCoord(350, 50), miner: false },
    { id: 9, x: randCoord(450, 50), y: randCoord(350, 50), miner: false },
  ],
  miners: [
    { id: 50, x: randCoord(450, 50), y: randCoord(350, 50), miner: true, minedBlocks: [] },
    { id: 51, x: randCoord(450, 50), y: randCoord(350, 50), miner: true, minedBlocks: [] },
    { id: 52, x: randCoord(450, 50), y: randCoord(350, 50), miner: true, minedBlocks: [] }
  ]
};

const NodesReducer = (state = _nodes, action) => {
  let newState;
  switch(action.type){
    case(RECEIVE_NODE):
      let { readOnly, miners } = state;
      newState = merge({}, state);
      if(action.node.miner){
        let tgtNode = newState.miners.filter((node) => node.id === action.node.id)[0];
        tgtNode.minedBlocks = action.node.minedBlocks;
        newState = newState.miners.map((node) => {
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

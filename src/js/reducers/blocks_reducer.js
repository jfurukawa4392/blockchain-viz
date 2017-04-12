import{
  MINE_BLOCK,
} from '../actions/chain_actions';
import merge from 'lodash/merge';

const makeHash = () => (
  Math.random().toString(36).slice(2)
);

const _genesisBlock = {
  txns: [],
  hash: makeHash(),
  prevHash: null
};

const BlocksReducer = (state = [ _genesisBlock ], action) => {
  let newState;
  Object.freeze(state);
  switch (action.type){
    case(MINE_BLOCK):
      newState = state.map(block => Object.assign({}, block));
      let block = {
        txns: action.block.txns,
        hash: action.block.hash,
        prevHash: newState[newState.length-1].hash
      };
      newState.push(block);
      return newState;
    default:
      return state;
  }
};

export default BlocksReducer;

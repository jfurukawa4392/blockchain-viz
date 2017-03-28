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
  switch (action.type){
    case(MINE_BLOCK):
      newState = state.map(block => Object.assign({}, block));
      newState.push(action.block);
      return newState;
    default:
      return state;
  }
};

export default BlocksReducer;

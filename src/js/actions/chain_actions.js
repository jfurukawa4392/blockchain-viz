export const MINE_BLOCK = 'MINE_BLOCK';
export const RECEIVE_BLOCK = 'RECEIVE_BLOCK';

export const mineBlock = (txns = []) => {
  return {
    type: MINE_BLOCK,
    txns
  };
};

export const receiveBlock = (block) => ({
  type: RECEIVE_BLOCK,
  block
});

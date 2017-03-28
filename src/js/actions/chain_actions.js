export const MINE_BLOCK = 'MINE_BLOCK';
export const RECEIVE_BLOCK = 'RECEIVE_BLOCK';

export const mineBlock = (block) => ({
  type: MINE_BLOCK,
  block
});

export const receiveBlock = (block) => ({
  type: RECEIVE_BLOCK,
  block
});

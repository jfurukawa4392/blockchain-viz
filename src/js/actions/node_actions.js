export const RECEIVE_NODE = "RECEIVE_NODE";
export const RECEIVE_TRANSACTION = "RECEIVE_TRANSACTION";
export const RECEIVE_USER_NODE = "RECEIVE_USER_NODE";
export const RECEIVE_INITIAL = "RECEIVE_INITIAL";

export const receiveNode = (node) => ({
  type: RECEIVE_NODE,
  node
});

export const receiveTransaction = (txn) => ({
  type: RECEIVE_TRANSACTION,
  txn
});

export const receiveUserNode = (node) => ({
  type: RECEIVE_USER_NODE,
  node
});

export const receiveInitial = () => ({
  type: RECEIVE_INITIAL,
});

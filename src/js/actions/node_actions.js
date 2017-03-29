export const RECEIVE_NODE = "RECEIVE_NODE";
export const RECEIVE_TRANSACTION = "RECEIVE_TRANSACTION";

export const receiveNode = (node) => ({
  type: RECEIVE_NODE,
  node
});

export const receiveTransaction = (txn) => ({
  type: RECEIVE_TRANSACTION,
  txn
});

# blockchain-viz
An interactive visualization of the distributed ledger technology known as Blockchain. It is written using the ReactJS library and Redux framework. It was inspired by a visualization for GraphQL, a facebook querying technology that was illustrated by someone here: http://sgwilym.github.io/relay-visual-learners/

As a basic overview, you are a miner node in a cluster of nodes. Make payments to other nodes and mine blocks to reap cryptocurrency rewards.

## Background
Blockchain is an abstract term used to describe an implementation of a distributed ledger of data that can be thought of as a record of transactions/facts that have been validated. This ledger is shared amongst nodes in a peer-to-peer network cluster. A screenshot of the cluster is shown below:

![node cluster](docs/screenshots/node_cluster.png)

The regular participants are able to make transactions with one another, but the special, star-shaped nodes to the left are miners. The miner nodes are able to, through a series of mathematical guess-and-check processes, add a block to the chain that contains a bundle of now-verified transactions.
Ultimately, this technology allows for a fast, secure distribution of pseudo-databases among peers and doesn't require any trust between transacting parties.

For the sake of this illustration, the user must be aware of the following facets of the blockchain technology:

- Any participant node can emit a valid transaction to other nodes in hopes that it will be verified by being written into the next block in the chain
- Miners are participants that have the ability to group transactions together and add a new block of transactions to the end of the chain and reap a set reward of cryptocurrency for their work
- When a new block is written, that event is propagated to all other participants in the chain so everyone has the same set of verified facts

## Snippets
<p>Below is a code snippet for the mining progress bar and transaction verification</p>

``` javascript
handleMineClick(){
  let increment = 50;
  let newProgress, newBlock;
  let { blocks, unverifiedTxns, userNode } = this.props;
  if(blocks) increment = Math.floor(increment / blocks.length);

  newProgress = this.state.mineProgress + increment;
  if(newProgress >= 100){
    newBlock = {
      txns: unverifiedTxns,
      hash: makeHash(),
      minedBy: userNode
    };
    this.props.mineBlock(newBlock);
    this.props.clearTransactions();
    this.setState({
      mineProgress: 0
    });
  } else {
    this.setState({
      mineProgress: newProgress
    });
  }
}
```

This snippet handles the internal state of the mining progress bar and when it exceeds 100%, sends a mine block action to the reducers in the store. This adds a new block to the chain as well as rewards the miner with a $25 credit to their balance. It also processes all transactions that were included with the block as previously unverified transactions.


``` javascript
let fromBalance = unverifiedTxns.reduce((acc, txn) => {
  if(txn.from === userNode.id){
    acc + txn.amount;
  }
}, 0);

if(fromBalance + userNode.balance - this.state.amount < 0){
  this.setState({
    amount: 0,
    errors: "Not enough coins! Try mining a block..."
  });
  return;
}
let receiver = detail.id ? detail.id : userNode.id;
this.props.receiveTxn({
  to: receiver,
  from: userNode.id,
  amount: parseInt(this.state.amount)
});
```

This is the view layer validation of any transaction that gets submitted by the user. It checks all verified transactions that have yet to be included in a mined block and checks to see if the user has enough funds to make the payment. It will yield an error if the account cannot make the payment and tells them to mine a block if they want more coins.


## Demo
![make transaction](docs/screenshots/make_payment.gif)

<p> Above is an example of one full cycle. The user starts out as the top most miner node. After clicking on another node in the cluster, the user has the ability to pay that node a certain amount, not exceeding their current balance. </p>

![mine block](docs/screenshots/mine_block.gif)


<p>Once the transaction is accepted, however, it isn't immediately reflected, it is simply broadcasted to other nodes as an unverified transaction until a miner bundles it into and mines a block on the chain. The user is currently the only node that has the option to mine or transact, but once the user clicks the "mine" button enough and creates a new block, those transaction effects are reflected in all nodes' account balances: </p>

![verify transaction](docs/screenshots/check_txn.gif)


## Future Improvements
- Allow user to add nodes to cluster and increase mining difficulty proportionately to that
- Demonstrate how consensus works and how a 51% attack could be mounted and/or circumvented
- Add specifics about Ethereum's smart contract nodes and show how they interact by letting users emit signals to execute that code on the chain

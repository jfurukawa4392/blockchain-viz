import React from 'react';

const Detail = (props) => {
  let { detail, receiveTxn, userNode } = props;
  let description, txnForm, data;
  let contentType = null;

  if(detail.hash){
    //block
    contentType = "Block";
    data = (
      <ul
        className="raw-data">
        <li
          key={1}>
          Hash: {detail.hash}
        </li>
        <li
          key={2}>
          Parent Block: {detail.prevHash}
        </li>
        <li
          key={3}>
          Transactions:
          <ul>
            {detail.txns.map((txn, idx) => <li key={idx}>{`${txn.from} paid ${txn.amount} to ${txn.to}`}</li>)}
          </ul>
        </li>
      </ul>
    );
    description = (
      <content
        className="description">
        Blocks are bundled groups of transactions/data that have been mined
        by the miners, who are rewarded for their work with a set amount of cryptocurrency. As the computing power of a cluster
        increases, so does the competition and work required to successfully
        mine a block. <a href="http://www.blockchaintechnologies.com/blockchain-mining">
        Read more about the math here.</a>
      </content>
    );
  } else if(detail.id){
    //node
    contentType = "Node";
    data = (
      <ul
        className="raw-data">
        <li
          key={1}>
          Address: {`${detail.id}`}
        </li>
      </ul>
    );
    description = (
      <content
        className="description">
        Nodes are the the discrete computing units of a blockchain cluster.
        In cryptocurrency terms they can be thought of addresses/accounts that
        can transact and send data/currency amongst themselves. Nodes are
        classified either as miners or as read-only participants. Participants
        <a href="https://bitsonblocks.net/2015/09/09/a-gentle-introduction-to-blockchain-technology/">
         Learn more about their differences here.</a>
      </content>
    );
    txnForm = (
      <form onSubmit={(amt) =>
          {
            receiveTxn({
              to: detail.id,
              from: userNode.id,
              amount: amt
            });
          }
      }>
        <label>
          Amount
          <input type='text' name='amt' />
        </label>
        <input type='submit' />
      </form>
    );
  } else {
    contentType = "User Node";
    data = (
      <ul
        className="raw-data">
        <li
          key={1}>
          Address: {`${userNode.id}`}
        </li>
      </ul>
    );
    description = (
      <content
        className="description">
        The above diagram shows a basic illustration of the blockchain technology
        that is used by cryptocurrencies such as Bitcoin and Ethereum. It includes:
        <ul>
          <li>
            Nodes: represented by the circles/stars to the right are the computing nodes which can send transactions within the cryptocurrency economy.
          </li>
          <li>
            Blockchain: The chain itself can be thought of a record of <span>validated</span> transactions that has occurred since the original block, known as the genesis block.
          </li>
        </ul>
      </content>
    );
  }

  return(
    <section
      className="detail-inner">
      <div
        className="data-container">
        {`${contentType ? contentType + " Data" : ""}`}
        { data }
      </div>
      {description}
    </section>
  );
};

export default Detail;

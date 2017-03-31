import React from 'react';
import isEqual from 'lodash/isequal';

class Detail extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      amount: 0,
      errors: ""
    };
  }

  componentWillUpdate(nextProps){
    if(!isEqual(this.props.detail, nextProps.detail)){
      this.setState({
        errors: ""
      });
    }
  }

  handleSubmitTxn(e){
    e.preventDefault();
    let { detail, userNode, unverifiedTxns } = this.props;
    let fromBalance = unverifiedTxns.reduce((acc, txn) => {
      if(txn.from == userNode.id){
        return acc + txn.amount;
      }
    }, 0);
    fromBalance = fromBalance ? fromBalance : 0;

    if(userNode.balance - fromBalance - this.state.amount < 0){
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

    this.setState({
      amount: 0,
      errors: ""
    });
  }

  handleUpdate(e){
    this.setState({
      amount: e.target.value
    });
  }

  render(){
    let { detail, receiveTxn, userNode } = this.props;
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
              {detail.txns.map((txn, idx) => <li key={idx}>{`${txn.from} paid $${txn.amount} to ${txn.to}`}</li>)}
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
          <li
            key={2}>
            Coins: {`${detail.balance}`}
          </li>
        </ul>
      );
      description = (
        <content
          className="description">
          Nodes are the the discrete computing units of a blockchain cluster.
          In cryptocurrency terms they can be thought of anonymous addresses/accounts that
          can send data/currency amongst themselves. Nodes are
          classified either as miners or as read-only participants.<br />
          <a href="https://bitsonblocks.net/2015/09/09/a-gentle-introduction-to-blockchain-technology/">
           Learn more about their differences here.</a>
        </content>
      );
      txnForm = (
        <form onSubmit={(e) => this.handleSubmitTxn(e)}>
          <label>
            Payment Amount:
            <input
              type="text"
              onChange={(e) => this.handleUpdate(e)}
              value={this.state.amount}/>
            <input
              className="payment-submit"
              type="submit"
              value="Pay selected node"/>
          </label>
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
          <li
            key={2}>
            Coins: {`${userNode.balance}`}
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
              Blockchain: The chain itself can be thought of as a record of <span>validated</span> transactions that have occurred since the original block, known as the genesis block.
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
          <h3>{`${contentType ? contentType + " Data" : ""}`}</h3>
          { data }
          <span
            className="payment-errors">
            { this.state.errors }
          </span>
          { txnForm }
        </div>
        {description}
      </section>
    );
  }
}

export default Detail;

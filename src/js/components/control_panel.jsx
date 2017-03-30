import React from 'react';
import { clearTransactions } from '../actions/transactions_actions';
import { receiveTransaction } from '../actions/node_actions';
import { mineBlock } from '../actions/chain_actions';
import { Line, Circle } from 'rc-progress';
import { connect } from 'react-redux';
import Detail from './detail';

class ControlPanel extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      mineProgress: 0
    };

    this.handleMineClick = this.handleMineClick.bind(this);
    this.emitTxn = this.emitTxn.bind(this);
  }

  handleMineClick(){
    let increment = 50;
    let newProgress;
    let { blocks } = this.props;
    if(blocks) increment = Math.floor(increment / blocks.length);

    newProgress = this.state.mineProgress + increment;
    if(newProgress >= 100){
      this.props.mineBlock(this.props.unverifiedTxns);
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

  emitTxn(){
    let { detail, userNode } = this.props;
    let receiver = detail.id ? detail.id : userNode.id;

    this.props.receiveTransaction({
      to: receiver,
      from: userNode.id,
      amount: 10
    });
  }

  render(){

    return(
      <aside
        className="control-outer">
        <div
          className="control-inner">
          <h1>Mining Level:</h1>
          <Circle
            className="mine-circle"
            percent={`${this.state.mineProgress}`}
            strokeWidth="4"
            strokeColor="#A5BE00"/>
          <h3
            className="mine-progress-pct">
            {`${this.state.mineProgress}%`}
          </h3>
          <div
            className="buttons">
            <button
              onClick={() => this.handleMineClick()}>
              Mine!
            </button>
            <button
              onClick={() => this.emitTxn()}>
              Emit Transaction
            </button>
          </div>
        </div>
        <div
          className="detail-container">
          <Detail
            detail={this.props.detail}
            receiveTxn={this.props.receiveTransaction}
            userNode={this.props.userNode}/>
        </div>
      </aside>
    );
  }
}

const mapStateToProps = state => {
  return({
    unverifiedTxns: state.unverifiedTxns,
    blocks: state.blocks,
    detail: state.detail,
    userNode: state.userNode
  });
};

const mapDispatchToProps = dispatch => {
  return({
    receiveTransaction: txn => dispatch(receiveTransaction(txn)),
    mineBlock: txns => dispatch(mineBlock(txns)),
    clearTransactions: () => dispatch(clearTransactions()),
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPanel);

import React from 'react';
import { clearTransactions } from '../actions/transactions_actions';
import { receiveTransaction } from '../actions/node_actions';
import { mineBlock } from '../actions/chain_actions';
import { Line } from 'rc-progress';
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
    this.props.receiveTransaction();
  }

  render(){

    return(
      <aside
        className="control-outer">
        <div
          className="control-inner">
          Mining Level:
          <Line
            percent={`${this.state.mineProgress}`}
            strokeWidth="4"
            strokeColor="#aa0080"/>
          <button
            onClick={() => this.handleMineClick()}>
            Mine!
          </button>
          <button
            onClick={() => this.emitTxn()}>
            Emit Transaction
          </button>
        </div>
        <div
          className="detail-container">
          <Detail
            detail={this.props.detail}/>
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
  });
};

const mapDispatchToProps = dispatch => {
  return({
    receiveTransaction: txn => dispatch(receiveTransaction(txn)),
    mineBlock: txns => dispatch(mineBlock(txns)),
    clearTransactions: () => dispatch(clearTransactions())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPanel);

import React from 'react';
import { connect } from 'react-redux';
import { mineBlock, receiveBlock } from '../actions/chain_actions';

class Blockchain extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    //get 2d context for this component to render
    let { ctx, blocks } = this.props;
    console.log(document.getElementById("blockchain-outer"));
    ctx = document.getElementById("blockchain-outer").getContext("2d");

    //get blocks from store and render them with arrows
    let [ x, y ] = [ 50, 50 ];
    blocks.forEach((block, idx) => {
      if(idx === 0) idx = 'G';
      ctx.font = "20pt sans-serif";
      ctx.fillText(`Block ${idx}`, x + 50, y + 60);
      ctx.strokeRect(x, y, 200, 100);
      y += 200;
    });
  }

  render(){
    return(
      <content>
      </content>
    );
  }
}

const mapStateToProps = state => ({
  blocks: state.blocks,
  activeBlock: state.activeBlock,
  unverifiedTxns: state.unverifiedTxns
});

const mapDispatchToProps = dispatch => ({
  receiveBlock: (block) => dispatch(receiveBlock(block)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blockchain);

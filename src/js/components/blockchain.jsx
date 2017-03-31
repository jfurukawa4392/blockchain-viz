import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { mineBlock, receiveBlock } from '../actions/chain_actions';
import { Layer, Line, Text, Arrow, Rect, Stage, Group } from 'react-konva';
import Block from './block';

class Blockchain extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
    };
    this.chainEnd;
  }

  componentDidMount(){
    //wait until the canvas container renders to start drawing
    if(this.props.blocks.length){
      this.setState({
        loading: false
      });
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.blocks.length < this.props.blocks.length){
      const chainEnd = ReactDOM.findDOMNode(this.refs.last);
      if(chainEnd){
        this.refs.last.scrollIntoView();
      }
    }
  }

  render(){
    //get blocks from store and render them with arrows
    let chain = [];
    let blockShape;
    let { blocks } = this.props;
    let [ x, y ] = [ 75, -75 ];

    chain = blocks.map((block, idx) => {
        y += 100;
        if(idx < blocks.length-1){
          blockShape = (
            <Block
              groupRef="not-last"
              key={idx}
              idx={idx}
              receiveBlock={this.props.receiveBlock}
              block={block}
              x={x}
              y={y}/>
          );
        } else {
          blockShape = (
            <Block
              groupRef="last"
              ref="last"
              key={idx}
              idx={idx}
              receiveBlock={this.props.receiveBlock}
              block={block}
              x={x}
              y={y}/>
          );
        }
        return blockShape;
      }
    );

    return(
      <Stage
        className="blockchain-stage"
        width={300}
        height={blocks ? blocks.length*100 + 50 : 150}>
        <Layer>
          {this.state.loading ? null : chain}
        </Layer>
      </Stage>
    );
  }
}

const mapStateToProps = state => ({
  blocks: state.blocks,
  activeBlock: state.activeBlock,
  unverifiedTxns: state.unverifiedTxns
});

const mapDispatchToProps = dispatch => ({
  receiveBlock: (txns) => dispatch(receiveBlock(txns)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blockchain);

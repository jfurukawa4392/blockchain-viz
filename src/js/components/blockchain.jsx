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
      loading: true
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentDidMount(){
    //wait until the canvas container renders to start drawing
    if(this.props.blocks.length){
      this.setState({
        loading: false
      });
    }
  }

  handleClick(idx){
    this.props.receiveBlock(this.props.blocks[idx]);
  }

  handleHover(idx){
    this.props.receiveBlock(this.props.blocks[idx]);
  }

  handleMouseLeave(){
    this.props.receiveBlock({});
  }

  componentDidUpdate(){
    const divMarker = ReactDOM.findDOMNode(this.chainEnd);
    if(divMarker){
      divMarker.scrollIntoView();
    }
  }

  render(){
    //get blocks from store and render them with arrows
    let chain = [];
    let { blocks } = this.props;
    let [ x, y ] = [ 75, -75 ];

    chain = blocks.map((block, idx) => {
        y += 100;
        return(
          <Block
            key={idx}
            idx={idx}
            handleClick={this.handleClick}
            handleHover={this.handleHover}
            handleMouseLeave={this.handleMouseLeave}
            x={x}
            y={y}/>
        );
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

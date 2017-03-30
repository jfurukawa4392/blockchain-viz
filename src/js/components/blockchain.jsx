import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { mineBlock, receiveBlock } from '../actions/chain_actions';
import { Layer, Line, Text, Arrow, Rect, Stage, Group } from 'react-konva';

class Blockchain extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true
    };

    this.handleClick = this.handleClick.bind(this);
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

  componentDidUpdate(){
    const divMarker = ReactDOM.findDOMNode(this.chainEnd);
    if(divMarker){
      divMarker.scrollIntoView();
    }
  }

  render(){
    let chain = [];
    let ctx;
    //get blocks from store and render them with arrows
    let { blocks } = this.props;

    if(!this.state.loading){
      let [ x, y ] = [ 75, -75 ];
      let blockGroup, arrow;
      chain = blocks.map((block, idx) => {
        arrow = null;
        y += 100;
        if(idx!==0){
          arrow = (
            <Arrow
              x={x}
              y={y}
              points={[x, y, x, y-100]}
              pointerLength={10}
              pointerWidth={10}
              fill="black"
              stroke="black"/>
          );
        }
        blockGroup =
              <Group
                key={idx}
                id="heloooooo"
                onClick={() => this.handleClick(idx)}>
                <Rect
                  x={x}
                  y={y}
                  fill="#427AA1"
                  width={150}
                  height={75}
                  cornerRadius={10}/>
                <Text
                  x={x}
                  y={y+32}
                  width={150}
                  text={`${idx}`}
                  align="center"
                  stroke="#EBF2FA"/>
                {arrow}
              </Group>;
        return (blockGroup);
      });
    }
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

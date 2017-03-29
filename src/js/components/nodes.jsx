import React from 'react';
import { connect } from 'react-redux';
import { receiveNode } from '../actions/node_actions';
import { Layer, Line, Text, Circle, Stage, Group } from 'react-konva';

class Nodes extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount(){
    if(this.props.nodes){
      this.setState({
        loading: false
      });
    }
  }

  render(){

    let { nodes } = this.props;
    if(!this.state.loading){
      nodes = nodes.readOnly.concat(nodes.miners);
      let color;
      nodes = nodes.map((node, idx) => {
        color = 'green';
        if(node.miner) color = "blue";
        return(
          <Circle
            key={idx}
            id={node.id}
            x={node.x}
            y={node.y}
            radius={10}
            fill={color}
            stroke={color}/>
        );
      });
    }

    return(
      <Stage
        className="nodes-stage"
        width={500}
        height={400}>
        <Layer>
          {this.state.loading ? null : nodes}
        </Layer>
      </Stage>
    );
  }
}

// var circle = new Konva.Circle({
//       x: stage.getWidth() / 2,
//       y: stage.getHeight() / 2,
//       radius: 70,
//       fill: 'red',
//       stroke: 'black',
//       strokeWidth: 4
//     });

const mapStateToProps = (state) => ({
  nodes: state.nodes
});

const mapDispatchToProps = (dispatch) => ({
  receiveNode: (node) => dispatch(receiveNode(node))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nodes);

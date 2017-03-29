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
        if(node.miner) color = 'blue';
        let [ x, y ] = [ node.x, node.y ];
        return(
          <Group
            key={idx}>
            <Circle
              id={node.id}
              x={x}
              y={y}
              radius={15}
              fill={color}
              stroke={color}/>
            <Text
              x={x-8}
              y={y-3}
              width={15}
              fontSize={8}
              text={`${idx}`}
              fill={'black'}
              align="center"/>
          </Group>
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

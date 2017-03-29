import React from 'react';
import { connect } from 'react-redux';
import {
  receiveNode,
  receiveUserNode
} from '../actions/node_actions';
import { Layer, Line, Text, Circle, Star, Stage, Group } from 'react-konva';

class Nodes extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount(){
    let { nodes } = this.props;
    if(nodes.miners){
      this.props.receiveUserNode(nodes.miners[0]);
      this.setState({
        loading: false
      });
    }
  }

  handleNodeClick(id){
    let nodes = this.props.nodes.readOnly.concat(this.props.nodes.miners);
    let tgtNode = nodes.filter((node) => node.id === id)[0];
    this.props.receiveNode(tgtNode);
  }

  render(){
    let { nodes, userNode } = this.props;
    let allNodes;
    if(userNode && nodes.miners){
      allNodes = nodes.readOnly.concat(nodes.miners);

      let color, nodeShape, stroke;

      allNodes = allNodes.map((node, idx) => {
        let [ x, y ] = [ node.x, node.y ];
        color = 'green';
        stroke = 'green';

        if(node.miner){
          if(node.id === userNode.id){
            color = 'blue';
            stroke = 'gold';
          }
          nodeShape = (
            <Star
              id={node.id}
              x={x}
              y={y}
              numPoints={9}
              innerRadius={12}
              outerRadius={20}
              fill={color}
              stroke={stroke}/>
          );
        } else {
          nodeShape = (
            <Circle
              id={node.id}
              x={x}
              y={y}
              radius={15}
              fill={color}
              stroke={color}/>
          );
        }

        return(
          <Group
            key={idx}
            onClick={() => this.handleNodeClick(node.id)}>
            {nodeShape}
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
          {this.state.loading ? null : allNodes}
        </Layer>
      </Stage>
    );
  }
}

const mapStateToProps = (state) => ({
  nodes: state.nodes,
  userNode: state.userNode
});

const mapDispatchToProps = (dispatch) => ({
  receiveNode: (node) => dispatch(receiveNode(node)),
  receiveUserNode: (node) => dispatch(receiveUserNode(node)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nodes);

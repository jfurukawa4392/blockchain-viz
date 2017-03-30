import React from 'react';
import { connect } from 'react-redux';
import {
  receiveNode,
  receiveUserNode
} from '../actions/node_actions';
import Node from './node';
import { Layer, Line, Text, Circle, Star, Stage, Group } from 'react-konva';

class Nodes extends React.Component{
  constructor(props){
    super(props);

    this.handleNodeClick = this.handleNodeClick.bind(this);
  }

  componentDidMount(){
    let { nodes } = this.props;
    this.props.receiveUserNode(nodes.miners[0]);
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

      allNodes = allNodes.map((node, idx) => (
        <Node
          key={idx}
          node={node}
          userNode={userNode}
          handleNodeClick={this.handleNodeClick}
          idx={idx}/>
        )
      );
    }

    return(
      <Stage
        className="nodes-stage"
        width={500}
        height={400}>
        <Layer>
          {allNodes}
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

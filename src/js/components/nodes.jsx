import React from 'react';
import { connect } from 'react-redux';
import {
  receiveNode,
  receiveUserNode
} from '../actions/node_actions';
import Node from './node';
import Edges from './edges';
import { Layer, Stage, Group, Tween } from 'react-konva';

class Nodes extends React.Component{
  constructor(props){
    super(props);

    this.handleNodeClick = this.handleNodeClick.bind(this);
  }

  componentDidMount(){
    let { nodes } = this.props;
    this.props.receiveUserNode(nodes[9]);
  }

  handleNodeClick(id){
    let { nodes } = this.props;
    let tgtNode = nodes.filter((node) => node.id === id)[0];
    this.props.receiveNode(tgtNode);
  }

  render(){
    let { nodes, userNode } = this.props;
    let backLines, nodeShapes, nodeShape, layer;
    if(userNode && nodes){

      nodeShapes = nodes.map((node, idx) => {
        return (
          <Node
            key={idx}
            idx={idx}
            node={node}
            userNode={userNode}
            receiveNode={this.props.receiveNode}
            idx={idx}/>
        );
      }
      );

      backLines = nodes.map((node, idx) => {
          if(idx < 5){
            return(
              <Edges
                key={idx}
                node={node}
                nodes={nodes.slice(5,9)}/>
            );
          } else if(idx < 9){
            return(
              <Edges
                key={idx}
                node={node}
                nodes={nodes.slice(9)}/>
            );
          } else {
            return(
              <Edges
                key={idx}
                node={node}
                nodes={[{x: 5, y: 175}]} />
            );
          }
        }
      );

      layer = (
        <Layer>
          {backLines}
          {nodeShapes}
        </Layer>
      );

    }
    return(
      <Stage
        className="nodes-stage"
        width={500}
        height={400}>
        {layer}
      </Stage>
    );
  }
}

const mapStateToProps = (state) => ({
  nodes: state.nodes,
  userNode: state.userNode,
  unverifiedTxns: state.unverifiedTxns
});

const mapDispatchToProps = (dispatch) => ({
  receiveNode: (node) => dispatch(receiveNode(node)),
  receiveUserNode: (node) => dispatch(receiveUserNode(node)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nodes);

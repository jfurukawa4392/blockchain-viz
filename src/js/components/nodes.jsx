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
    this.props.receiveUserNode(nodes.miners[0]);
  }

  componentWillUpdate(nextProps){
    let { unverifiedTxns, nodes } = this.props;
    let newTxnsLength = nextProps.unverifiedTxns.length;
    if(unverifiedTxns.length < newTxnsLength){
      let allNodes = nodes.miners.concat(nodes.readOnly);
      let { to, from } = nextProps.unverifiedTxns[newTxnsLength-1];

      let transactors = allNodes.filter((node, idx) => {
        if(node.id === to || node.id === from){
            return idx;
        }
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
    let allNodes, backLines, nodeShapes, nodeShape, tween;
    if(userNode && nodes.miners){
      allNodes = nodes.readOnly.concat(nodes.miners);

      nodeShapes = allNodes.map((node, idx) => {
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

      backLines = allNodes.map((node, idx) => {
          if(idx < 5){
            return(
              <Edges
                key={idx}
                node={node}
                nodes={allNodes.slice(5,allNodes.length-nodes.miners.length+1)}/>
            );
          } else if(idx < nodes.readOnly.length){
            return(
              <Edges
                key={idx}
                node={node}
                nodes={nodes.miners}/>
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
    }
    return(
      <Stage
        className="nodes-stage"
        width={500}
        height={400}>
        <Layer>
          {backLines}
          {nodeShapes}
        </Layer>
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

import React from 'react';
import { connect } from 'react-redux';
import { receiveNode } from '../actions/node_actions';
import { Layer, Line, Text, Rect, Stage, Group } from 'react-konva';

class Nodes extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount(){
    if(document.getElementById(this.props.ctx)){
      this.setState({
        loading: false
      });
    }
  }

  render(){

    if(!this.state.loading){
      let { ctx, nodes } = this.props;
      nodes = nodes.readOnly.concat(nodes.miners);
      ctx = document.getElementById(ctx).getContext("2d");

      nodes.forEach((node, idx) => {
        ctx.fillStyle = "#c82124";
        if(node.miner) ctx.fillStyle = "#3370d4";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();
      });
    }

    return(
      <content>
      </content>
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

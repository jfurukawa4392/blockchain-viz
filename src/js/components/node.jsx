import React from 'react';
import { Text, Circle, Star, Group } from 'react-konva';

class Node extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      fill: '#679436'
    };

    this.handleNodeClick = this.handleNodeClick.bind(this);
  }

  handleNodeClick(node){
    this.props.receiveNode(node);
  }

  mouseEnter(){
    let { userNode } = this.props;
    this.setState({
      fill: "#A5BE00"
    });
  }

  mouseLeave(){
    this.setState({
      fill: '#679436'
    });
  }

  render(){
    let { node, userNode, idx, detailId } = this.props;
    let fill, nodeShape, stroke, text;
    let [ x, y ] = [ node.x, node.y ];
    fill = this.state.fill;
    stroke = '#679436';
    text = "";

    // highlight selected node
    if(node.id === detailId){
      fill = "#A5BE00";
      stroke = "#A5BE00";
    }

    if(node.miner){
      if(node.id === userNode.id){
        fill = '#427AA1';
        stroke = '#679436';
        text = 'YOU';
      }
      nodeShape = (
        <Star
          id={node.id}
          x={x}
          y={y}
          numPoints={20}
          innerRadius={15}
          outerRadius={20}
          fill={fill}
          stroke={stroke}/>
      );
    } else {
        nodeShape = (
          <Circle
            id={node.id}
            x={x}
            y={y}
            radius={15}
            fill={fill}
            stroke={fill}/>
        );
    }



    return(
      <Group
        key={idx}
        onClick={() => this.handleNodeClick(node)}
        onMouseEnter={() => this.mouseEnter()}
        onMouseLeave={() => this.mouseLeave()}>
        {nodeShape}
        <Text
          x={x-11}
          y={y-3}
          width={20}
          fontSize={8}
          text={`${text}`}
          fill={'black'}
          align="center"/>
      </Group>
    );
  }
}

export default Node;

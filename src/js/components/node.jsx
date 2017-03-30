import React from 'react';
import { Layer, Line, Text, Circle, Star, Stage, Group } from 'react-konva';

const Node = (props) => {
  let { node, userNode, handleNodeClick, idx } = props;
  let color, nodeShape, stroke, text;
  let [ x, y ] = [ node.x, node.y ];
  color = '#679436';
  stroke = '#679436';
  text = idx;

  if(node.miner){
    if(node.id === userNode.id){
      color = '#427AA1';
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
      onClick={() => handleNodeClick(node.id)}>
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
};

export default Node;

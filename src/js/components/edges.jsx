import React from 'react';
import { Line, Group } from 'react-konva';

class Edges extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let { node, nodes } = this.props;
    let nodeEdges;
    nodeEdges = nodes.map((toNode, idx) => (
      <Line
        key={idx}
        points={[node.x, node.y, toNode.x, toNode.y]}
        stroke="black"
        tension={0}/>
      )
    );

    return(
      <Group>
        { nodeEdges }
      </Group>
    );
  }
}

export default Edges;

// var line = new Konva.Line({
//   x: 100,
//   y: 50,
//   points: [73, 70, 340, 23, 450, 60, 500, 20],
//   stroke: 'red',
//   tension: 1
// });

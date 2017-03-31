import React from 'react';
import { Line, Text, Arrow, Rect, Group } from 'react-konva';

class Block extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      fill: "#427AA1"
    };
  }

  handleClick(block){
    this.props.receiveBlock(block);
  }

  handleHover(){
    this.setState({
      fill: "#064789"
    });
  }

  handleMouseLeave(){
    this.setState({
      fill: "#427AA1"
    });
  }

  render(){
    let { idx, x, y, block, groupRef } = this.props;
    let text = `Block ${idx}`;

    let arrow = null;
    if(idx > 0){
      arrow = (
        <Arrow
          points={[x+75, y, x+75, y-25]}
          pointerLength={10}
          pointerWidth={10}
          fill="black"
          stroke="black"/>
      );
    } else {
      text = "Genesis";
    }

    return(
      <Group
        onClick={() => this.handleClick(block)}
        onMouseEnter={() => this.handleHover()}
        onMouseLeave={() => this.handleMouseLeave()}>
        {arrow}
        <Rect
          x={x}
          y={y}
          fill={this.state.fill}
          width={150}
          height={75}
          cornerRadius={10}/>
        <Text
          x={x}
          y={y+32}
          width={150}
          text={text}
          align="center"
          stroke="black"
          fontFamily="Sans-serif"
          strokeWidth={1}/>
      </Group>
    );
  }
}

export default Block;

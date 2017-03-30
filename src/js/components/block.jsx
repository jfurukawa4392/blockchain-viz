import React from 'react';
import { Line, Text, Arrow, Rect, Group } from 'react-konva';

const Block = (props) => {
  let { idx, handleClick, x, y, handleHover, handleMouseLeave } = props;
  let text = idx;

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
  }

  return(
    <Group
      onClick={() => handleClick(idx)}
      onMouseEnter={() => handleHover(idx)}
      onMouseLeave={() => handleMouseLeave()}>
      {arrow}
      <Rect
        x={x}
        y={y}
        fill="#427AA1"
        width={150}
        height={75}
        cornerRadius={10}/>
      <Text
        x={x}
        y={y+32}
        width={150}
        text={`${text}`}
        align="center"
        stroke="#EBF2FA"/>
    </Group>
  );
};

export default Block;

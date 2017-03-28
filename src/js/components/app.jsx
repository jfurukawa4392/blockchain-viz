import React from 'react';
import Blockchain from './blockchain';

const App = (props) => (
  <content>
    <canvas
      id="blockchain-outer">
      <Blockchain
        ctx="blockchain-outer"/>
    </canvas>
  </content>
);

export default App;

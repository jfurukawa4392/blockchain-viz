import React from 'react';
import Blockchain from './blockchain';
import Nodes from './nodes';

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <content
        className="app-outer">
        <div
          className="blockchain-outer">
          <Blockchain
            ctx="blockchain-inner"/>
        </div>
        <div
          className="nodes-outer">
          <canvas
            id="nodes-inner">
            <Nodes ctx="nodes-inner" />
          </canvas>
        </div>
      </content>
    );
  }
}

export default App;

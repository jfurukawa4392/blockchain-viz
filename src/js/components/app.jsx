import React from 'react';
import Blockchain from './blockchain';
import Nodes from './nodes';
import ControlPanel from './control_panel';

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <content
        className="app-outer">
        <main
          className="diagram-container">
          <div
            className="blockchain-outer">
            <Blockchain/>
          </div>
          <div
            className="nodes-outer">
            <Nodes/>
          </div>
        </main>
        <ControlPanel />
      </content>
    );
  }
}

export default App;

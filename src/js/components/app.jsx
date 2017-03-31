import React from 'react';
import ReactDOM from 'react-dom';
import Blockchain from './blockchain';
import Nodes from './nodes';
import ControlPanel from './control_panel';

class App extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidUpdate(prevProps){
    if(prevProps.blocks.length < this.props.blocks.length){
      const chainEnd = ReactDOM.findDOMNode(this.chainEnd);
      console.log(chainEnd);
      if(chainEnd){
        chainEnd.scrollIntoView();
      }
    }
  }

  render(){
    return(
      <content
        className="app-outer">
        <h1>Blockchain Vizualizer</h1>
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

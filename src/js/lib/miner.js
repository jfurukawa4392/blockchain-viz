import Node from './node';
import Block from './block';

class Miner extends Node{
  constructor(){
    super();
    this.minedBlocks = [];
  }

  mineBlock(chain, txns = []){
    let newBlock = chain.addBlock({ txns });
    this.minedBlocks.push(newBlock);
  }
}

export default Miner;

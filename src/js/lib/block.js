import Transaction from './transaction';
import Util from './util';

class Block {
  constructor(optHash){
    this.hash = Util.makeHash();
    this.txns = optHash["txns"];
    this.previousBlock = optHash["previousBlock"];
  }
}

export default Block;

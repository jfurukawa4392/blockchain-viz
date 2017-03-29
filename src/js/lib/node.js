import Util from './util';

class Node{
  constructor(posArr, miner = false){
    this.id = Util.makeHash();
    [ this.x, this.y ] =  posArr;
    this.miner = miner;
  }
}

export default Node;

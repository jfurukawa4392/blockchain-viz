import Block from './block';
import Util from './util';

class Chain{
  constructor(){
    this.genesis = new Block({
      hash: Util.makeHash(),
      txns: [],
      previous: null
    });
    this.blocks = [ this.genesis ];
    this.latestBlock = null;
  }

  addBlock(block){
    // add block that doesn't have previous hash yet, keep track of last
    // blocks hash
    block.previousBlock = this.latestBlock;
    let newBlock = new Block(block);
    this.blocks.push(newBlock);
    this.latestBlock = newBlock.hash;
    return newBlock;
  }

  draw(ctx){
    ctx.clearRect(0, 0, 200, 400);
    this.blocks.forEach((block) => {
      block.draw();
      //draw an arrow from this block to previous
    });
  }
}

export default Chain;

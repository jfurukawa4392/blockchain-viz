import Chain from './chain';
import Node from './node';
import Miner from './miner';
import Block from './block';
import Transaction from './transaction';

class BlockChain{
  constructor(ctx){
    this.chain = new Chain();
    this.readOnly = [];
    this.miners = [];
    this.unverifiedTxns = [];
    this.ctx = ctx;

    //Create 12 participants and 4 miners
    for (var i = 0; i < 12; i++) {
      if(i%3 === 0){
        this.miners.push(new Miner());
      }
      this.readOnly.push(new Node());
    }

    this.interval = setInterval(() => this.start(), 3000);
  }


  start(){
    let randMiner = this.miners[Math.floor(Math.random() * this.readOnly.length)];
    randMiner.mineBlock(
      this.chain,
      this.unverifiedTxns.splice(0, Math.floor(this.unverifiedTxns/2))
    );
  }

  draw(){
    this.chain.draw(this.ctx);
  }

  addUnverified(){
    let randAddress = Math.floor(Math.random() * this.readOnly.length);
    let otherAddress = Math.floor(Math.random() * this.readOnly.length-1) || 1;
    let randAmount = Math.floor(Math.random() * 100);

    this.unverifiedTxns.push(
      new Transaction(
        this.readOnly[randAddress],
        this.readOnly[randAddress + otherAddress],
        randAmount)
    );
  }
}

export default BlockChain;

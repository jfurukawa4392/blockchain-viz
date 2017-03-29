import Util from './util';

class Transaction{
  constructor(from, to, amount){
    //from and to should be addresses
    this.txnHash = Util.makeHash();
    this.from = from;
    this.to = to;
    this.amount = amount;
  }
}

export default Transaction;

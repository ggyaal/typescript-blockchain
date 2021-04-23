import * as CryptoJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestemp: number;

  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestemp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + previousHash + timestemp + data).toString();

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestemp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestemp = timestemp;
  }
}

const firstBlock = new Block(
  0,
  "020202022012",
  "",
  "This is first Block.",
  1226
);

let blockChain: Block[] = [firstBlock];

const getBlockChain = (): Block[] => blockChain;

const getLatestBlock = (): Block => blockChain[blockChain.length - 1];

const getNewTimeStemp = (): number => Math.round(new Date().getTime() / 1000);

console.log(blockChain);

export {};

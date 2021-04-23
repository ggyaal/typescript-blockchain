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

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestemp === "number" &&
    typeof aBlock.data === "string";

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

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimeStemp: number = getNewTimeStemp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimeStemp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimeStemp
  );
  addBlock(newBlock);
  return newBlock;
};

const getHashForBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timestemp,
    aBlock.data
  );

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockChain.push(candidateBlock);
  }
};

// test add block
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");
createNewBlock("fifteenth block");

// console.log block data
console.log(blockChain);

export {};

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestemp: number;
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

let blockChain: [Block] = [firstBlock];

console.log(blockChain);

export {};

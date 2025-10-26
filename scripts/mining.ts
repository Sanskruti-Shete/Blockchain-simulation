import crypto from "crypto";
import { getMempool, clearMempool, Transaction } from "./mempool";

interface Block {
  index: number;
  timestamp: string;
  transactions: Transaction[];
  previousHash: string;
  merkleRoot: string;
  hash: string;
}

let blockchain: Block[] = [];

// Helper to compute SHA256
function sha256(data: string) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

// Merkle root computation
function getMerkleRoot(transactions: Transaction[]): string {
  if (transactions.length === 0) return "";
  let hashes = transactions.map((tx) => sha256(JSON.stringify(tx)));

  while (hashes.length > 1) {
    const temp: string[] = [];
    for (let i = 0; i < hashes.length; i += 2) {
      const left = hashes[i];
      const right = hashes[i + 1] || left;
      temp.push(sha256(left + right));
    }
    hashes = temp;
  }

  return hashes[0];
}

export function mineBlock(): Block {
  const mempool = getMempool();
  if (mempool.length === 0) {
    console.log("No transactions to mine!");
    process.exit(0);
  }

  const previousHash =
    blockchain.length > 0 ? blockchain[blockchain.length - 1].hash : "GENESIS";
  const merkleRoot = getMerkleRoot(mempool);
  const timestamp = new Date().toISOString();

  const blockData = previousHash + timestamp + merkleRoot + JSON.stringify(mempool);
  const hash = sha256(blockData);

  const newBlock: Block = {
    index: blockchain.length,
    timestamp,
    transactions: mempool,
    previousHash,
    merkleRoot,
    hash,
  };

  blockchain.push(newBlock);
  clearMempool();

  console.log(`Block #${newBlock.index} mined!`);
  console.log("Block hash:", newBlock.hash);

  return newBlock;
}

export function getBlockchain() {
  return blockchain;
}

import { keccak256, arrayify, concat } from "ethers/lib/utils";
import { mempool, Tx } from "./mempool";

interface Block {
  index: number;
  previousHash: string;
  merkleRoot: string;
  timestamp: number;
  transactions: Tx[];
  nonce: number;
}

export const blockchain: Block[] = [];

// Hash a transaction
function hashTx(tx: Tx) {
  return keccak256(new TextEncoder().encode(tx.from + tx.to + tx.value));
}

// Compute Merkle Root
function computeMerkleRoot(txs: Tx[]) {
  let hashes = txs.map(hashTx);
  if (hashes.length === 0) return keccak256(new TextEncoder().encode("0x0"));
  
  while (hashes.length > 1) {
    if (hashes.length % 2) hashes.push(hashes[hashes.length - 1]);
    const newHashes: string[] = [];
    for (let i = 0; i < hashes.length; i += 2) {
      newHashes.push(keccak256(concat([arrayify(hashes[i]), arrayify(hashes[i + 1])])));
    }
    hashes = newHashes;
  }
  return hashes[0];
}

// Create a new block
export function createBlock(): Block {
  const previousHash = blockchain.length
    ? blockchain[blockchain.length - 1].merkleRoot
    : "0x0";
  const merkleRoot = computeMerkleRoot(mempool);
  return {
    index: blockchain.length,
    previousHash,
    merkleRoot,
    timestamp: Date.now(),
    transactions: [...mempool],
    nonce: 0,
  };
}

// Simple Proof-of-Work Mining
export function mineBlock(block: Block, difficulty = 2) {
  let nonce = 0;
  let hash = "";
  do {
    nonce++;
    hash = keccak256(
      new TextEncoder().encode(
        block.index + block.previousHash + block.merkleRoot + nonce
      )
    );
  } while (!hash.startsWith("0".repeat(difficulty)));

  block.nonce = nonce;
  blockchain.push(block);
  mempool.length = 0; // clear mempool
  console.log("Block mined! Hash:", hash);
  console.log("Block contents:", block);
}

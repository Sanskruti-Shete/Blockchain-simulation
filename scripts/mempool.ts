// scripts/mempool.ts
import { ethers } from "hardhat";

export type Tx = {
  from: string;
  to: string;
  value: string;
  signature: string;
};

export const mempool: Tx[] = [];

// Add a transaction to mempool
export function addTx(tx: Tx) {
  const messageHash = ethers.utils.id(`Invest ${tx.value} ETH`);
  const recovered = ethers.utils.verifyMessage(
    ethers.utils.arrayify(messageHash),
    tx.signature
  );

  if (recovered !== tx.from) throw new Error("Invalid signature");
  mempool.push(tx);
  console.log("Transaction added to mempool:", tx);
}

export function showMempool() {
  console.log("Current Mempool:", mempool);
}

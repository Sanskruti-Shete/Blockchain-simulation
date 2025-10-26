export interface Transaction {
  from: string;
  to: string;
  value: string;
  signature: string;
}

export let mempool: Transaction[] = [];

export function addTransaction(tx: Transaction) {
  console.log("Transaction added to mempool:", tx);
  mempool.push(tx);
}

export function getMempool() {
  return mempool;
}

export function clearMempool() {
  mempool = [];
}

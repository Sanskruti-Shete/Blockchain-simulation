import { ethers } from "ethers";
import { addTransaction, getMempool, clearMempool } from "./mempool";
import { mineBlock, getBlockchain } from "./mining";

async function main() {
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
  const accounts = await provider.listAccounts();

  console.log("Simulating transactions...\n");

  // Add two transactions
  const tx1 = {
    from: accounts[0],
    to: "CrowdfundingContractAddress",
    value: "1",
    signature: ethers.utils.hexlify(ethers.utils.randomBytes(65)),
  };
  const tx2 = {
    from: accounts[1],
    to: "CrowdfundingContractAddress",
    value: "2",
    signature: ethers.utils.hexlify(ethers.utils.randomBytes(65)),
  };

  addTransaction(tx1);
  addTransaction(tx2);

  console.log("\n=== CURRENT MEMPOOL ===");
  console.log(getMempool());

  console.log("\n=== MINING BLOCK ===");
  const newBlock = mineBlock();

  console.log("\n✅ Block successfully mined!");
  console.log("Block Hash:", newBlock.hash);
  console.log("Previous Hash:", newBlock.previousHash);
  console.log("Merkle Root:", newBlock.merkleRoot);
  console.log("Transactions:", newBlock.transactions);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

import { ethers } from "hardhat";
import { addTx, showMempool } from "./mempool";
import { createBlock, mineBlock, blockchain } from "./mine-block";

async function main() {
  const [user1, user2] = await ethers.getSigners();

  // --- 1️⃣ Add transactions ---
  const msg1 = ethers.utils.id("Invest 1 ETH");
  const sig1 = await user1.signMessage(ethers.utils.arrayify(msg1));
  addTx({
    from: user1.address,
    to: "CrowdfundingContractAddress",
    value: "1",
    signature: sig1,
  });

  const msg2 = ethers.utils.id("Invest 2 ETH");
  const sig2 = await user2.signMessage(ethers.utils.arrayify(msg2));
  addTx({
    from: user2.address,
    to: "CrowdfundingContractAddress",
    value: "2",
    signature: sig2,
  });

  // --- 2️⃣ Show current mempool ---
  console.log("\n=== CURRENT MEMPOOL ===");
  showMempool();

  // --- 3️⃣ Mine a new block ---
  console.log("\n=== MINING BLOCK ===");
  const block = createBlock();
  mineBlock(block);

  // --- 4️⃣ Show entire blockchain ---
  console.log("\n=== BLOCKCHAIN STATE ===");
  console.log(blockchain);
}

main().catch(console.error);

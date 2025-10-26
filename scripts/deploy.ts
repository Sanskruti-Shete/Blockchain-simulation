import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function main(hre: HardhatRuntimeEnvironment) {
  const ethers = hre.ethers; // Hardhat 2 compatible
  const [deployer] = await ethers.getSigners();

  const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
  const crowdfunding = await Crowdfunding.deploy();
  await crowdfunding.deployed();

  console.log("Crowdfunding deployed at:", crowdfunding.address);
  console.log("Deployer address:", deployer.address);
}

if (require.main === module) {
  // Run script with Hardhat
  import("hardhat").then((hre) => main(hre.default)).catch(console.error);
}

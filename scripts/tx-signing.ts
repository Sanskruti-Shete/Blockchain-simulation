import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function main(hre: HardhatRuntimeEnvironment) {
  const ethers = hre.ethers;
  const [sender] = await ethers.getSigners();

  const message = "Invest 1 ETH";
  const messageHash = ethers.utils.id(message);

  const signature = await sender.signMessage(ethers.utils.arrayify(messageHash));
  console.log("Signature:", signature);

  const recovered = ethers.utils.verifyMessage(ethers.utils.arrayify(messageHash), signature);
  console.log("Recovered address:", recovered);
  console.log("Valid signature:", recovered === sender.address);
}

if (require.main === module) {
  import("hardhat").then((hre) => main(hre.default)).catch(console.error);
}

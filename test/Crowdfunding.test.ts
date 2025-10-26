import { ethers } from "hardhat";
import { expect } from "chai";

describe("Crowdfunding contract", function () {
  it("Should accept investments", async function () {
    const [investor] = await ethers.getSigners();
    const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
    const crowdfunding = await Crowdfunding.deploy();
    await crowdfunding.deployed();

    await crowdfunding.connect(investor).invest({ value: ethers.utils.parseEther("1") });
    expect(await crowdfunding.balances(investor.address)).to.equal(ethers.utils.parseEther("1"));
  });
});

import { expect } from "chai";
import pkg from "hardhat";

const { ethers } = pkg;

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Escrow", () => {
  let buyer, seller;
  let energyTrading;
  it("saves the addresses", async () => {
    // setup accounts
    [buyer, seller] = await ethers.getSigners();
    console.log("Buyer address:", buyer, seller);

    // Deploy Energy Trading contract
    const EnergyTrading = await ethers.getContractFactory("EnergyTrading");
    energyTrading = await EnergyTrading.deploy();
    await energyTrading.deployed();

    console.log(energyTrading.address, "testing the address");

    let transaction = await energyTrading
      .connect(seller)
      .mint("Solar", 20, ethers.utils.parseEther("0.4"));
    await transaction.wait();
  });
});

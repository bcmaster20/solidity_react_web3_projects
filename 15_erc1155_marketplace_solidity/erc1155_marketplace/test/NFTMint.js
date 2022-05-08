const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('NFTMint', function () {
  it("Should return the new nft mint", async function () {
    const NFTMint = await ethers.getContractFactory('NFTMint');
    const nftMint = await NFTMint.deploy();
    await nftMint.deployed();
    console.log(nftMint.address);
  });
});
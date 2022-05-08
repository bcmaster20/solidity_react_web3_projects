const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('NFTMarketPlace', function () {
  it("Should return the new marketplace", async function () {
    [owner, creator, addr1, addr2] = await ethers.getSigners();
    console.log("--- Signers ---");
    console.log("owner=", owner.address);
    console.log("creator=", creator.address);
    console.log("addr1=", addr1.address);
    console.log("addr2=", addr2.address);

    console.log("\n--- Mint Address ---");
    const NFTMint = await ethers.getContractFactory('NFTMint');
    const nftMint = await NFTMint.deploy();
    await nftMint.deployed();
    nftMintAddress = nftMint.address;
    console.log("nftMintAddress = ", nftMint.address);

    const Marketplace = await ethers.getContractFactory('Marketplace');
    const marketplace = await Marketplace.deploy(nftMintAddress);
    await marketplace.deployed();
    marketplaceAddress = marketplace.address;
    console.log("marketplaceAddress = ", marketplaceAddress);
    await nftMint.mint(1, 24);

    console.log("\n--- Confirm process ---");    
    await nftMint.setApprovalForAll(marketplaceAddress, true);
    const mbalance = await nftMint.balanceOf(marketplaceAddress, 1);
    console.log("mbalance = ", mbalance);

    listNFT = await marketplace.listNft(1, 24, 234, 11);
    await nftMint.balanceOf(marketplaceAddress, 1);

    await nftMint.setApprovalForAll(marketplaceAddress, true);
    // await marketplace.buyNFT(1, 5);
    // await marketplace.onERC1155Received(
    //   address(this),
    //   msg.sender,
    //   tokenId,
    //   amount,
    //   ''
    // );
    // buyNFT1 = await marketplace.buyNFT(1, 24);
    // await marketplace.buyNFT(1, 24);
  });
});
const { expect } = require('chai');
const { ethers } = require('hardhat');

// describe("accounts", async function() {
//     const accounts = await ethers.getSigners();

//     for (const account of accounts) {
//         console.log(account.address);
//     }
// });

describe('NFTMarketPlace', function () {
  it("Should return the new marketplace", async function () {
    [owner, creator, addr1, addr2] = await ethers.getSigners();
    // console.log("--- Signers ---");
    // console.log("owner=", owner.address);
    // console.log("creator=", creator.address);
    // console.log("addr1=", addr1.address);
    // console.log("addr2=", addr2.address);

    console.log("\n--- Mint Address ---");
    const NFTMint = await ethers.getContractFactory('NFTMint');
    const nftMint = await NFTMint.deploy();
    await nftMint.deployed();
    // console.log(nftMint);
    nftMintAddress = nftMint.address;
    console.log("nftMintAddress = ", nftMint.address);

    const Marketplace = await ethers.getContractFactory('Marketplace');
    const marketplace = await Marketplace.deploy(nftMintAddress);
    await marketplace.deployed();
    marketplaceAddress = marketplace.address;
    console.log("marketplaceAddress = ", marketplaceAddress);

    await nftMint.mint(1, 10);

    console.log("\n--- Confirm process ---");    
    let mbalance_owner = await nftMint.balanceOf(owner.address, 1);
    console.log("mbalance_owner = ", mbalance_owner);
    await nftMint.setApprovalForAll(marketplaceAddress, true);
    let market_balance = await nftMint.balanceOf(marketplaceAddress, 1);
    console.log("market_balance = ", market_balance);
    
    // await nftMint.connect(creator).mint(1, 20);
    // await nftMint.mint(1, 15)
    // const mbalance_creator = await nftMint.balanceOf(creator.address, 1);
    // console.log("mbalance_creator = ", mbalance_creator);
    // expect(mbalance_creator).to.equal(20);
    // expect(mbalance_creator).to.equal(15).to.be.revertedWith("Not 15 tokens");

    // const mbalance_owner = await nftMint.balanceOf(owner.address, 1);
    // console.log("mbalance_owner = ", mbalance_owner);
    // expect(mbalance_owner).to.equal(25);
    console.log(await owner.getBalance() );
    const auctionPrice = ethers.utils.parseUnits('5', 'ether')
    listNFT = await marketplace.listNft(1, 10, 10, 5, {value: auctionPrice});
    // console.log(await marketplaceAddress.getBalance() );
    market_balance  = await nftMint.balanceOf(marketplaceAddress, 1);
    console.log("market_balance = ", market_balance);
    mbalance_owner = await nftMint.balanceOf(owner.address, 1);
    console.log("mbalance_owner = ", mbalance_owner);
    // await nftMint.setApprovalForAll(owner.address, true);
    await marketplace.buyNFT(1, 5, {value : ethers.utils.parseEther("5")});
    // market_balance  = await nftMint.balanceOf(marketplaceAddress, 1);
    // console.log("market_balance = ", market_balance);
    // mbalance_owner = await nftMint.balanceOf(owner.address, 1);
    // console.log("mbalance_owner = ", mbalance_owner);
    // await nftMint.connect(creator).mint(1,10);

    // await nftMint.setApprovalForAll(marketplaceAddress, true);
    
    // await nftMint.connect(creator).setApprovalForAll(marketplaceAddress, true);
    return;
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
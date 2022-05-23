const { ethers } = require("hardhat");
const hre = require("hardhat");
require("dotenv").config({ path: ".env" });
const { CRYPTO_DEVS_NFT_CONTRACT_ADDRESS } = require("../constants");

async function main() {

  // Whitelist Deploy
  const Whitelist = await ethers.getContractFactory("Whitelist");
  const whitelist = await Whitelist.deploy(10);
  await whitelist.deployed();  
  console.log("Whitelist Contract Address:", whitelist.address);

  // CryptoDevs Deploy
  const CryptoDevs = await ethers.getContractFactory("CryptoDevs");
  const cryptoDevs = await CryptoDevs.deploy("", whitelist.address);
  await cryptoDevs.deployed();  
  console.log("CryptoDevs Contract Address:", cryptoDevs.address);

  // Address of the Crypto Devs NFT contract that you deployed in the previous module
  // const cryptoDevsNFTContract = CRYPTO_DEVS_NFT_CONTRACT_ADDRESS;
  const CryptoDevsToken = await ethers.getContractFactory("CryptoDevToken");
  const cryptoDevsToken = await CryptoDevsToken.deploy(cryptoDevs.address);
  console.log("Crypto Devs Token Contract Address:",cryptoDevsToken.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
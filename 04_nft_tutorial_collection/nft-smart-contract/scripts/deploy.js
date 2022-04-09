// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const {ethers} = require("hardhat");
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const CryptoBeetles = await hre.ethers.getContractFactory("CryptoBeetles");
  const cryptoBeetles = await CryptoBeetles.deploy("CryptoBeetles", "CBEET");
  try {
    await cryptoBeetles.deployed();
    console.log(`Contract succesfully deployed to : ${cryptoBeetles.address}` );
    const newItemId = await cryptoBeetles.mint("https://ipfs.io/ipfs/QmPFh9aiW8iwSDM2K1E9jXiqwG33zsf4xYeKJwb43PbHsA");
    console.log(`NFT minted successfully :: ${newItemId}`);
  } catch(err) {
    console.log(`Error: ${err.message}`);
  }

  // const mintNFT = async () => {
  //   try {
  //     const newItemId = await cryptoBeetles.mint("https://ipfs.io/ipfs/QmPFh9aiW8iwSDM2K1E9jXiqwG33zsf4xYeKJwb43PbHsA");
  //     console.log(`NFT minted successfully :: ${newItemId}`);
  //   } catch (err) {
  //     console.log(`Minting error: ${err.message}`);
  //   }
  // }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

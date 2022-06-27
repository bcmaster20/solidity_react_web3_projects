let { networkConfig } = require('../helper-hardhat-config')
const fs = require('fs')
const { expect } = require('chai');
const { ethers } = require('hardhat');
const { BigNumber } = require('ethers');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = await getChainId()
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]
    const networkName = networkConfig[chainId]['name']
    console.log(networkName);

    log("----------------------------------------------------")
    const BmDevNFT = await deploy('BmDevNFT', {
        from: deployer,
        log: true
    })
    const bmDevNFTContract = await ethers.getContractFactory("BmDevNFT")
    const bmdevnft = new ethers.Contract(BmDevNFT.address, bmDevNFTContract.interface, signer)    
    
    log(`---- Deploy ----`);
    log(`BmDevNFT to ${BmDevNFT.address}`)
    log(`\n---- Verify ----`);
    log(`Verify : BmDevNFT  \n npx hardhat verify --contract contracts/lazymint.sol:BmDevNFT --network ${networkName} ${BmDevNFT.address}`)

}

module.exports.tags = ['all', 'nftmint']

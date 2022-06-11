const { network, ethers } = require("hardhat")
let { networkConfig } = require('../helper-hardhat-config')
module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const rewardToken = await ethers.getContract("RewardToken")
    console.log(rewardToken.address)
    const chainId = await getChainId()    
    const args = [rewardToken.address, rewardToken.address]
    const stakingDeployment = await deploy("Staking", {
        from: deployer,
        args: args,
        log: true,
    })

    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0];
    const networkName = networkConfig[chainId]['name']        

    log(`Verify with:\n npx hardhat verify --network ${networkName} ${stakingDeployment.address} ${rewardToken.address} ${rewardToken.address}`)    
}


module.exports.tags = ["all", "staking"]
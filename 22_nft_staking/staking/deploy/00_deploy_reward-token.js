let { networkConfig } = require('../helper-hardhat-config')
module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = await getChainId()
    console.log(chainId);
    console.log(deployer);
    const networkName = networkConfig[chainId]['name']        
    console.log(networkName);
    // return;
    const args = []    
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0];

    const rewardToken = await deploy("RewardToken", {
        from: deployer,
        // args: args,
        log: true,
    })
    
    log(`Verify with:\n npx hardhat verify --contract "contracts/RewardToken.sol:RewardToken" --network ${networkName} ${rewardToken.address}`)
}


module.exports.tags = ["all", "rewardtoken"]
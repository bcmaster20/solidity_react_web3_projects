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
    const { deployer, alice, bob} = await getNamedAccounts()
    const chainId = await getChainId()
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]
    const networkName = networkConfig[chainId]['name']

    // log(deployments);
    log(`deployer=${deployer}, alice=${alice}, bob=${bob}`);
    // log(chainId);
    log(await getNamedAccounts())
    // log(networkName);
    log("----------------------------------------------------")


    const BMRewards = await deploy('BMRewards', {
        from: deployer,
        log: true
    })
    const bmRewardsContract = await ethers.getContractFactory("BMRewards")
    const bmRewards = new ethers.Contract(BMRewards.address, bmRewardsContract.interface, signer)    

    const USDT = await deploy('USDT', {
        from: deployer,
        log: true
    })
    const usdtContract = await ethers.getContractFactory("USDT")
    const usdt = new ethers.Contract(USDT.address, usdtContract.interface, signer)    

    const MATIC = await deploy('MATIC', {
        from: deployer,
        log: true
    })
    const maticContract = await ethers.getContractFactory("MATIC")
    const matic = new ethers.Contract(MATIC.address, maticContract.interface, signer)    


    const Collection = await deploy('Collection', {
        from: deployer,
        log: true
    })
    const collectionContract = await ethers.getContractFactory("Collection")
    const collection = new ethers.Contract(Collection.address, collectionContract.interface, signer)    

    const args = [Collection.address, BMRewards.address]

    const NFTStaking = await deploy('NFTStaking', {
        from: deployer,
        args: args,
        log: true
    })
    const nftStakingContract = await ethers.getContractFactory("NFTStaking")
    const nftStaking = new ethers.Contract(NFTStaking.address, nftStakingContract.interface, signer)   

    log(`\n----- Token Three BMRewards, USDT, MATIC ----`)
    log(`BMRewards to ${BMRewards.address}`)
    log(`USDT to ${USDT.address}`)
    log(`MATIC to ${MATIC.address}`)
    log(`\n----- Collection ----`)
    log(`Collection to ${Collection.address}`)
    log(`\n----- Staking ----`)
    log(`NFTStaking to ${NFTStaking.address}`)


    log(`\n----- Verify ----\n`)
    log(`----- Token Three BMRewards, USDT, MATIC ----`)
    log(`1. Verify : BMRewards  \n npx hardhat verify --network ${networkName} ${BMRewards.address}`)
    log(`2. Verify : USDT  \n npx hardhat verify --network ${networkName} ${USDT.address}`)
    log(`3. Verify : MATIC  \n npx hardhat verify --network ${networkName} ${MATIC.address}`)
    log(`\n----- Collection ----`)
    log(`4. Verify : Collection  \n npx hardhat verify --network ${networkName} ${Collection.address}`)
    log(`\n----- Staking ----`)
    log(`5. Verify : NFTStaking  \n npx hardhat verify --network ${networkName} ${NFTStaking.address} ${Collection.address} ${BMRewards.address}`)

    log(`\n----- Initialize and test ----\n`)

    log(`1. collection: add currency pid=0, BMRewards, cost: 30 at Collection NFT`)
    await collection.addCurrency(BMRewards.address, ethers.utils.parseEther("30"));
    // await collection.addCurrency(USDT.address, ethers.utils.parseEther("150"));
    // await collection.addCurrency(MATIC.address, ethers.utils.parseEther("200"));
    console.log((await collection.AllowedCrypto(0)).costvalue.toString());

    log(`2. bmRewards : approve bmrewards for nft mint at collection`)    
    await bmRewards.approve(Collection.address, ethers.utils.parseEther("30"))

    log(`3. collection: mint 1 pid=0`)        
    await collection.mint(deployer, 1, 0);

    log(`4. bmRewards: add controller`)
    await bmRewards.addController(NFTStaking.address);
    
    log(`5. collection: setApprovalForAll nft staking`)
    await collection.setApprovalForAll(NFTStaking.address, true);

    const initBalance = await bmRewards.balanceOf(deployer);

    log(`6. nftstaking start nft token 1`)
    await nftStaking.stake([1]);

    log(`7. Delay 3s`)
    delay(3000);

    log(`8. claim nft token 1`)
    tx = await nftStaking.claim([1]);
    // let claim = await tx.wait(1);
    // log(claim);
    // log(claim.events[0].topics);
    // log(claim.events[1].topics);
    const rewardsBalance = await bmRewards.balanceOf(deployer);
    log(`${initBalance.toString()}`)
    log(`${rewardsBalance.toString()}`)
    log(`9. Reward Token=${rewardsBalance.sub(initBalance).toString()}`)
}

module.exports.tags = ['all', 'stakingv2']

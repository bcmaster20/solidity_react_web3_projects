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
    const BMRewardsV1 = await deploy('BMRewardsV1', {
        from: deployer,
        log: true
    })
    const bmRewardsV1Contract = await ethers.getContractFactory("BMRewardsV1")
    const bmRewardsV1 = new ethers.Contract(BMRewardsV1.address, bmRewardsV1Contract.interface, signer)    

    const CollectionV1 = await deploy('CollectionV1', {
        from: deployer,
        log: true
    })
    const collectionV1Contract = await ethers.getContractFactory("CollectionV1")
    const collectionV1 = new ethers.Contract(CollectionV1.address, collectionV1Contract.interface, signer)    

    const args = [CollectionV1.address, BMRewardsV1.address]
    const NFTStakingV1 = await deploy('NFTStakingV1', {
        from: deployer,
        args: args,
        log: true
    })
    const nftStakingV1Contract = await ethers.getContractFactory("NFTStakingV1")
    const nftStakingV1 = new ethers.Contract(NFTStakingV1.address, nftStakingV1Contract.interface, signer)   
    
    log(`---- Deploy ----`);
    log(`BMRewardsV1 to ${BMRewardsV1.address}`)
    log(`CollectionV1 to ${CollectionV1.address}`)
    log(`NFTStakingV1 to ${NFTStakingV1.address}`)    

    log(`\n---- Verify ----`);
    log(`1. Verify : BMRewardsV1  \n npx hardhat verify --contract contracts/BMRewardsV1.sol:BMRewardsV1 --network ${networkName} ${BMRewardsV1.address}`)
    log(`2. Verify : CollectionV1  \n npx hardhat verify --contract contracts/CollectionV1.sol:CollectionV1 --network ${networkName} ${CollectionV1.address}`)
    log(`3. Verify : NFTStakingV1  \n npx hardhat verify --contract contracts/NFTStakingV1.sol:NFTStakingV1 --network ${networkName} ${NFTStakingV1.address} ${CollectionV1.address} ${BMRewardsV1.address}`)

    // // Initialize
    // log(`\n\n--- Initialize and testing ---\n`);
    // // 1. Mint 3 NFT Token By Deployer
    // log("1. 3 NFT Token Mint by CollectionV1");
    // const tx = await collectionV1.mint(deployer, 3);
    // const totalsupply = await collectionV1.totalSupply();
    
    // log("2. Add Controller the staking address at Rewards");
    await bmRewardsV1.addController(nftStakingV1.address);
    
    // log("3. Run the setApprovalForAll(nftstaking address, true) by deployer");
    // await collectionV1.setApprovalForAll(nftStakingV1.address, true);

    // const initBalance = await bmRewardsV1.balanceOf(deployer);

    // log("4. Run start stake 1");
    // await nftStakingV1.stake([1]);
    // // const vault = await nftStakingV1.vault(1);
    // // console.log(vault)
    // // let owner = await nftStakingV1.tokensOfOwner(deployer);
    // // console.log(owner)

    // log("5. Run start stake 2, 3");
    // await nftStakingV1.stake([2,3]);

    // log("6. Delay 3s");    
    // await delay(3000);

    // // console.log(await nftStakingV1.earningInfo(deployer, [1,2,3]));

    // log("7. Claim token 1, 2, 3");        
    // await nftStakingV1.claim([1, 2, 3]);

    // log("8. Reward token by NFT Token 1, 2, 3");
    // const rewardsBalance = await bmRewardsV1.balanceOf(deployer);

    // log(`9. Reward Token=${rewardsBalance.sub(initBalance).toString()}`);

    // console.log(rewardsBalance.toNumber());

// describe('Test contract', () => {
//     it('deploy the smart contract and reverts', async () => {
//         const MyContract = await ethers.getContractFactory('MyContract');
//         const contractInstance = await MyContract.deploy(<add something if you have parameters in the constructor>);
//         await expect(contractInstance.myFunction(BigNumber.from('6')))
//         .to.be.revertedWith('Num should be bigger than 5');
//     });
// });
// expect(storedLuckyNumber).to.be.not.undefined;
// expect(storedLuckyNumber).to.be.not.null;
// expect(storedLuckyNumber).to.be.not.equal(0);
// expect(storedLuckyNumber).to.be.equal(66);

    // console.log(expect(totalsupply).to.equal(BigNumber.from('3')));
    // expect(totalsupply).to.be.not.equal(3);
    // console.log(totalsupply);
    // await tx.wait(3)    
    // await tx.wait(1)
    // log(newItemId);
    // await collectionV1.setApproveForAll(NFTStakingV1.address, true);
    // await bmRewardsV1.addController(NFTStakingV1.address);
}

module.exports.tags = ['all', 'stakingv1']

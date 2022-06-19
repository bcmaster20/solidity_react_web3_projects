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

    log("----------------------------------------------------")
    const BMRewardsV1_Address = "0x56b945d26d9a2ab35e2ddf2ff22d5b3d5a0c621e";
//     BMRewardsV1 to 0x56b945d26d9a2ab35e2ddf2ff22d5b3d5a0c621e
// CollectionV1 to 0xB0395e01b0463Ff91D5d399ead8e0e93D7Eb8FD5
// NFTStakingV1 to 0x522A22948E8A1D4c1c018188D36537A17d7C6D94

    const bmRewardsV1Contract = await ethers.getContractFactory("BMRewardsV1")
    const bmRewardsV1 = new ethers.Contract(BMRewardsV1_Address, bmRewardsV1Contract.interface, signer)    

    const CollectionV1_Address = "0xB0395e01b0463Ff91D5d399ead8e0e93D7Eb8FD5";
    const collectionV1Contract = await ethers.getContractFactory("CollectionV1")
    const collectionV1 = new ethers.Contract(CollectionV1_Address, collectionV1Contract.interface, signer)    

    
    const NFTStakingV1_Address = "0x522A22948E8A1D4c1c018188D36537A17d7C6D94"
    const nftStakingV1Contract = await ethers.getContractFactory("NFTStakingV1")
    const nftStakingV1 = new ethers.Contract(NFTStakingV1_Address, nftStakingV1Contract.interface, signer)   
    
    log(`---- Deploy ----`);

    // // Initialize
    // log(`\n\n--- Initialize and testing ---\n`);
    // // 1. Mint 3 NFT Token By Deployer
    // log("1. 3 NFT Token Mint by CollectionV1");
    
    // log("2. Add Controller the staking address at Rewards");
    // console.log(nftStakingV1.address);
    await bmRewardsV1.addController(nftStakingV1.address);
    
    // log("3. Run the setApprovalForAll(nftstaking address, true) by deployer");
    await collectionV1.setApprovalForAll(nftStakingV1.address, true);
    await nftStakingV1.unstake([1]);
    // const initBalance = await bmRewardsV1.balanceOf(deployer);

    // log("4. Run start stake 1");
    // await nftStakingV1.stake([1]);
    // // const vault = await nftStakingV1.vault(1);
    // // console.log(vault)
    let owner = await nftStakingV1.tokensOfOwner(deployer);
    console.log(owner)

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

module.exports.tags = ['all', 'stakingv1_init']

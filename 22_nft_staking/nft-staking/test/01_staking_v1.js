let { networkConfig } = require('../helper-hardhat-config')
const fs = require('fs')

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


    log(deployments);
    log(deployer);
    log(chainId);
    log(await getNamedAccounts())
    log(networkName);
    log("----------------------------------------------------")


    const BMRewardsV1 = await deploy('BMRewardsV1', {
        from: deployer,
        log: true
    })
    

    const CollectionV1 = await deploy('CollectionV1', {
        from: deployer,
        log: true
    })

    const bmRewardsV1Contract = await ethers.getContractFactory("BMRewardsV1")
    const collectionV1Contract = await ethers.getContractFactory("CollectionV1")
    const bmRewardsV1 = new ethers.Contract(BMRewardsV1.address, bmRewardsV1Contract.interface, signer)    
    const collectionV1 = new ethers.Contract(CollectionV1.address, collectionV1Contract.interface, signer)    

    const args = [CollectionV1.address, BMRewardsV1.address]

    const NFTStakingV1 = await deploy('NFTStakingV1', {
        from: deployer,
        args: args,
        log: true
    })
    log(`BMRewardsV1 to ${BMRewardsV1.address}\n`)
    log(`CollectionV1 to ${CollectionV1.address}\n`)
    log(`NFTStakingV1 to ${NFTStakingV1.address}\n`)    
    const nftStakingV1Contract = await ethers.getContractFactory("NFTStakingV1")
    const nftStakingV1 = new ethers.Contract(NFTStakingV1.address, nftStakingV1Contract.interface, signer)   

    log(`1. Verify : BMRewardsV1  \n npx hardhat verify --network ${networkName} ${BMRewardsV1.address}`)
    log(`2. Verify : CollectionV1  \n npx hardhat verify --network ${networkName} ${CollectionV1.address}`)
    log(`3. Verify : NFTStakingV1  \n npx hardhat verify --network ${networkName} ${NFTStakingV1.address} ${CollectionV1.address} ${BMRewardsV1.address}`)
    // log(collectionV1);return;
    // let tx;
    const gas = await collectionV1.mint(deployer, 3).estimateGas();
    log(gas);
    return;
    const newItemId = await collectionV1.mint(deployer, 3, { gasLimit: 300000 });
    // await tx.wait(1)
    log(newItemId);
    // await collectionV1.setApproveForAll(NFTStakingV1.address, true);
    // await bmRewardsV1.addController(NFTStakingV1.address);


    return;

    const svgNFTContract = await ethers.getContractFactory("SVGNFT")
    
    const svgNFT = new ethers.Contract(SVGNFT.address, svgNFTContract.interface, signer)
    
    

    log(`Verify with:\n npx hardhat verify --network ${networkName} ${svgNFT.address}`)
    log("Let's create an NFT now!")
    let filepath = "./img/triangle.svg"
    let svg = fs.readFileSync(filepath, { encoding: "utf8" })
    // log(svg);
    log(`We will use ${filepath} as our SVG, and this will turn into a tokenURI. `)
    tx = await svgNFT.create(svg)
    await tx.wait(1)
    log(`You've made your first NFT!`)
    log(`You can view the tokenURI here ${await svgNFT.tokenURI(0)}`)
}

module.exports.tags = ['all', 'stakingv1']

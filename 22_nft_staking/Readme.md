# Defi Staking APP
Staking: Locking tokens to net rewards
The token locked "do" something.

## 1. Token Staking Project Create
### For Hardhat Project
```
npm install ethers hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers
npm install @openzeppelin/contracts dotenv hardhat-shorthand hardhat-deploy hardhat-contract-sizer hardhat-gas-reporter @nomiclabs/hardhat-etherscan
npm install --save-dev  @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers
npm install prettier prettier-plugin-solidity solhint solidity-coverage

```
### For Typescript Modules
```
yarn add --dev @typechain/ethers-v5 @typechain/hardhat @types/chai @types/node @types/mocha ts-node typechain typescript
```

### Hardhat Init
```
$ yarn hardhat
Create an empty hardhat.config.js
```

## SmartContract
### Staking, Withdraw, Rewards
```
        // 100 tokens /second
        // 1 token / staked token

        // staked: 50 staked tokens, 20 staked tokens, 30 staked tokens
        // rewards: 50 reward tokens, 20 staked tokens, 30 staked tokens

        // statked: 100, 50, 20, 30 (total = 200)
        // rewards: 50, 25, 10, 15

        // 5 seconds, 1 person had 100 token staked = reward 500 tokens
        // 6 seconds, 2 person have 100 tokens staked each:
        //  Person 1: 550
        //  Person 2: 50
        // ok between seconds 1 and 5, person 1 got 500 tokens
        // ok at second 6 on, person 1 get 50 tokens now

        // 100 tokens / second
        // Time = 0;
        // Person A: 80 staked
        // Person B: 20 staked

        // Time = 1
        // PA: 80 staked, Earned: 80, Withdrawn: 0
        // PA: 20 staked, Earned: 20, Withdrawn: 0

        // Time = 2
        // PA: 80 staked, Earned: 160, Withdrawn: 0
        // PA: 20 staked, Earned: 40, Withdrawn: 0

        // Time = 3
        // New person enters!
        // Stake 100
        // total tokens staked = 200
        // 0.5 token / staked token

        // PA: 80 staked, Earned: 240 + 40, ( 80 / 200) * 100, Withdrawn: 0
        // PB: 20 staked, Earned: 60 + 10, (20 / 200) * 100, Withdrawn: 0
        // PC: 100 staked, Earned: 50, Withdrawn: 0 

        // Time = 4
        // PA withdraw & claimed rewards on everything
        // PA: 0 staked, earned: 0, withdrawn 280

```

### Deploy Binance Test Network
```
$ yarn hardhat deploy
$ npx hardhat verify --contract "contracts/RewardToken.sol:RewardToken" --network bsctestnet 0x320Ea2E4348b0a3734Eb0613D951E291C0AE2D0c
$ npx hardhat verify --network bsctestnet 0xA3E8487ba02b9797FE6907e2C9152a2cFD47860c 0x320Ea2E4348b0a3734Eb0613D951E291C0AE2D0c 0x320Ea2E4348b0a3734Eb0613D951E291C0AE2D0c
```

### Test
```
$ yarn hardhat test
```

## Nextjs, tailwindcss for Front app build
```
$ mkdir staking/app && cd app
$ yarn create next-app .
$ yarn add --dev prettier
$ yarn add --dev tailwindcss postcss autoprefixer
$ yarn tailwindcss init -p
$ yarn dev
```

### Tailwind Setting
- copy below contents to tailwind.config.css
```
content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
```
- copy below contents to styles/globals.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### web3uikit moralis, react-moralis 
```
npm install web3uikit 
npm install moralis react-moralis
npm i magic-sdk
```

### Reference
 - [SmartContract](https://www.youtube.com/watch?v=-48_hdo9_gg)
 - [Full-Blockchain-Course] (https://github.com/smartcontractkit/full-blockchain-solidity-course-js)
 - [solidity example staking] (https://solidity-by-example.org/defi/staking-rewards/)
 - [FrontEnd](https://www.youtube.com/watch?v=5vhVInexaUI)
 - [Tailwindcss For Nextjs](https://tailwindcss.com/docs/guides/nextjs)


## 2. NFT Token Staking Project Create
### Hardhat Project Init
```
$ npm install ethers hardhat @nomiclabs/hardhat-ethers @nomiclabs/hardhat-waffle ethereum-waffle chai 
```

### NFTStaking Reward Token
- Test Code
```
    // Initialize
    log(`\n\n--- Initialize and testing ---\n`);
    // 1. Mint 3 NFT Token By Deployer
    log("1. 3 NFT Token Mint by CollectionV1");
    const tx = await collectionV1.mint(deployer, 3);
    const totalsupply = await collectionV1.totalSupply();
    
    log("2. Add Controller the staking address at Rewards");
    await bmRewardsV1.addController(nftStakingV1.address);
    
    log("3. Run the setApprovalForAll(nftstaking address, true) by deployer");
    await collectionV1.setApprovalForAll(nftStakingV1.address, true);

    const initBalance = await bmRewardsV1.balanceOf(deployer);

    log("4. Run start stake 1");
    await nftStakingV1.stake([1]);
    // const vault = await nftStakingV1.vault(1);
    // console.log(vault)
    // let owner = await nftStakingV1.tokensOfOwner(deployer);
    // console.log(owner)

    log("5. Run start stake 2, 3");
    await nftStakingV1.stake([2,3]);

    log("6. Delay 3s");    
    await delay(3000);

    // console.log(await nftStakingV1.earningInfo(deployer, [1,2,3]));

    log("7. Claim token 1, 2, 3");        
    await nftStakingV1.claim([1, 2, 3]);

    log("8. Reward token by NFT Token 1, 2, 3");
    const rewardsBalance = await bmRewardsV1.balanceOf(deployer);

    log(`9. Reward Token=${rewardsBalance.sub(initBalance).toString()}`);

```
- Run Result
```
$ npx hh deploy stakingv1
1. 3 NFT Token Mint by CollectionV1
2. Add Controller the staking address at Rewards
3. Run the setApprovalForAll(nftstaking address, true) by deployer
4. Run start stake 1
5. Run start stake 2, 3
6. Delay 3s
7. Claim token 1, 2, 3
8. Reward token by NFT Token 1, 2, 3
9. Reward Token=34722222222222
```

- Deploy Rinkeby
```
$ npx hh deploy --tags stakingv1 --network rinkeby
---- Deploy ----
BMRewardsV1 to 0x56b945d26d9a2ab35e2ddf2ff22d5b3d5a0c621e
CollectionV1 to 0xB0395e01b0463Ff91D5d399ead8e0e93D7Eb8FD5
NFTStakingV1 to 0x522A22948E8A1D4c1c018188D36537A17d7C6D94

---- Verify ----
1. Verify : BMRewardsV1
 npx hardhat verify --network rinkeby 0x56b945d26d9a2ab35e2ddf2ff22d5b3d5a0c621e
2. Verify : CollectionV1
 npx hardhat verify --network rinkeby 0xB0395e01b0463Ff91D5d399ead8e0e93D7Eb8FD5
3. Verify : NFTStakingV1
 npx hardhat verify --network rinkeby 0x522A22948E8A1D4c1c018188D36537A17d7C6D94 0xB0395e01b0463Ff91D5d399ead8e0e93D7Eb8FD5 0x56b945d26d9a2ab35e2ddf2ff22d5b3d5a0c621e

 npx hardhat verify --contract contracts/BMRewardsV1.sol:BMRewardsV1 --network rinkeby 0x56b945d26d9a2ab35e2ddf2ff22d5b3d5a0c621e
 npx hardhat verify --contract contracts/CollectionV1.sol:CollectionV1 --network rinkeby 0xB0395e01b0463Ff91D5d399ead8e0e93D7Eb8FD5
 npx hardhat verify --contract contracts/NFTStakingV1.sol:NFTStakingV1 --network rinkeby 0x522A22948E8A1D4c1c018188D36537A17d7C6D94 0xB0395e01b0463Ff91D5d399ead8e0e93D7Eb8FD5 0x56b945d26d9a2ab35e2ddf2ff22d5b3d5a0c621e
```

- Deploy Polygon
```
npx hh deploy --tags stakingv1 --network mumbai
---- Deploy ----
BMRewardsV1 to 0xe3B078C946f799828685bAA523c8B3218C68cF5b
CollectionV1 to 0x6A782Dc1663419d5b4E4f956d8e40c35721aeb59
NFTStakingV1 to 0xCd44c67F8f8B0F10D2A955F5B6B5E6Cc36437E07

---- Verify ----
1. Verify : BMRewardsV1
 npx hardhat verify --contract contracts/BMRewardsV1.sol:BMRewardsV1 --network mumbai 0xe3B078C946f799828685bAA523c8B3218C68cF5b
2. Verify : CollectionV1
 npx hardhat verify --contract contracts/CollectionV1.sol:CollectionV1 --network mumbai 0x6A782Dc1663419d5b4E4f956d8e40c35721aeb59
3. Verify : NFTStakingV1
 npx hardhat verify --contract contracts/NFTStakingV1.sol:NFTStakingV1 --network mumbai 0xCd44c67F8f8B0F10D2A955F5B6B5E6Cc36437E07 0x6A782Dc1663419d5b4E4f956d8e40c35721aeb59 0xe3B078C946f799828685bAA523c8B3218C68cF5b
```

### NFTStaking Multi Token
- Test Code
```
log(`\n----- Initialize and test ----\n`)

log(`1. collection: add currency pid=0, BMRewards, cost: 30 at Collection NFT`)
await collection.addCurrency(BMRewards.address, ethers.utils.parseEther("30"));
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

const rewardsBalance = await bmRewards.balanceOf(deployer);
log(`9. Reward Token=${rewardsBalance.sub(initBalance).toString()}`)

```

- Run Result
```
$ npx hh deploy --tags stakingv2
1. collection: add currency pid=0, BMRewards, cost: 30 at Collection NFT
30000000000000000000
2. bmRewards : approve bmrewards for nft mint at collection
3. collection: mint 1 pid=0
4. bmRewards: add controller
5. collection: setApprovalForAll nft staking
6. nftstaking start nft token 1
7. Delay 3s
8. claim nft token 1
9. Reward Token=11574074074074
```

- Deploy Polygon
```
npx hh deploy --tags stakingv2 --network mumbai
----- Token Three BMRewards, USDT, APE ----
BMRewards to 0x8e9CB9c8F54c6Db908731076e9A48903B849d585
USDT to 0xbB5B370bb1F7012492162aae57C856bCc84E8a07
MATIC to 0xB295A2fb002763bd5d1cf6E1821D2cd582993AB7

----- Collection ----
Collection to 0x41AbEA025c7BE5175b1C0dB105428AD0173ABBd8

----- Staking ----
NFTStaking to 0x0A1282Ac30a5212E4356fc9CeCF2130eaCb8Db9D

----- Verify ----

----- Token Three BMRewards, USDT, APE ----
1. Verify : BMRewards
 npx hardhat verify --contract contracts/BMRewards.sol:BMRewards --network mumbai 0x8e9CB9c8F54c6Db908731076e9A48903B849d585
2. Verify : USDT
 npx hardhat verify --contract contracts/USDT.sol:USDT --network mumbai 0xbB5B370bb1F7012492162aae57C856bCc84E8a07
3. Verify : APE
 npx hardhat verify --contract contracts/APE.sol:APE --network mumbai 0xB295A2fb002763bd5d1cf6E1821D2cd582993AB7

----- Collection ----
4. Verify : Collection
 npx hardhat verify --contract contracts/Collection.sol:Collection --network mumbai 0x41AbEA025c7BE5175b1C0dB105428AD0173ABBd8

----- Staking ----
5. Verify : NFTStaking
 npx hardhat verify --contract contracts/NFTStaking.sol:NFTStaking --network mumbai 0x0A1282Ac30a5212E4356fc9CeCF2130eaCb8Db9D 0x41AbEA025c7BE5175b1C0dB105428AD0173ABBd8 0x8e9CB9c8F54c6Db908731076e9A48903B849d585

----- Initialize and test ----

1. collection: add currency
Cost Per NFT: 30 BMR, 150 USDT, 25 APE

```

## Front React Staking APP (app)
```
$ npx create-react-app nft_staking_app
$ cd nft_staking_app
$ npm i web3 ethers react-bootstrap bootstrap axios
```

## Front React NFT Mint APP (app_mint)

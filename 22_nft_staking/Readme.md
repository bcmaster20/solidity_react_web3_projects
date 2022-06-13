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

## Reference
 [SmartContract](https://www.youtube.com/watch?v=-48_hdo9_gg)
 [Full-Blockchain-Course] (https://github.com/smartcontractkit/full-blockchain-solidity-course-js)
 [solidity example staking] (https://solidity-by-example.org/defi/staking-rewards/)
 [FrontEnd](https://www.youtube.com/watch?v=5vhVInexaUI)
 [Tailwindcss For Nextjs](https://tailwindcss.com/docs/guides/nextjs)


## 2. NFT Token Staking Project Create

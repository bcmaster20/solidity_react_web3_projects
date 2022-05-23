# HardHat NFT, Upgrade, Governance

# 1. NFT Art with On-Chain Metadata | FULL HARDHAT / JS
## Create Project
```
$ npm install ethers hardhat @nomiclabs/hardhat-waffle \
ethereum-waffle chai @nomiclabs/hardhat-ethers \
web3modal @openzeppelin/contracts ipfs-http-client \
axios dotenv hardhat-shorthand
$ npx hh
$ npm install base64-sol
```
## 1-1. SVG NFT 
### Install hardhat-deploy 
```
$ npm install -D hardhat-deploy
$ npm install --save-dev  @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers
```

### Add namedAccounts option in hardhat.config.js
```
  namedAccounts: {
    deployer: {
      default: 0,
    }
  }
```
```
$ npx hh deploy
$ npx hh deploy --tags svg
----------------------------------------------------
deploying "SVGNFT" (tx: 0xca3be345ff7fc4dd70fcdfca5bc5442a23f57c1716f71f52719b93a0e77a38d7)...: deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3 with 3097671 gas
You have deployed an NFT contract to 0x5FbDB2315678afecb367f032d93F642f64180aa3
Verify with:
 npx hardhat verify --network localhost 0x5FbDB2315678afecb367f032d93F642f64180aa3
Let's create an NFT now!
We will use ./img/triangle.svg as our SVG, and this will turn into a tokenURI.
You've made your first NFT!
```

### Install hardhat-etherscan
```
$ npm install --save-dev @nomiclabs/hardhat-etherscan
```
### Deploy Rinkeby
```
$ npx hh deploy --network rinkeby
$ npx hh verify --network rinkeby 0xa99a21FF09788d5D9B042F3C6F579D16C5FbE280
``` 

## 1-2. Random SVG
### Random V1
```
constructor(address _VRFCoordinator, address _LinkToken, bytes32 _keyhash, uint256 _fee) 
    VRFConsumerBase(_VRFCoordinator, _LinkToken) {
        keyHash = _keyhash;
        fee = _fee;
    }
    
    requestId = requestRandomness(keyHash, fee);
    // callback function // The Chainlink VRF has a max gas of 200,000 gas(computation units)
    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) internal override 
...

```    
requestId = requestRandomness(keyHash, fee);

### Test LinkToken for local chain
- [hardhat-starter-kit](https://github.com/smartcontractkit/hardhat-starter-kit)
- Install @chainlink
```
$ npm install @chainlink/token
$ npm install @chainlink/contracts
```

- LinkToken.sol
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.4.24;
import "@chainlink/token/contracts/v0.4/LinkToken.sol";
```

- VRFCoordinatorMock.sol
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "@chainlink/contracts/src/v0.6/tests/VRFCoordinatorMock.sol";
```
- MockV3Aggregator.sol
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
import "@chainlink/contracts/src/v0.7/tests/MockV3Aggregator.sol";
```
### Deploy RandomSVG to Rinkeby
```
npx hh deploy --network rinkeby --tags rsvg

You have deployed an NFT contract to 0x629C50B3A3Ab461BEaf6543bB60Cd6cFd1D3B631
Verify with:
 npx hardhat verify --network rinkeby 0x629C50B3A3Ab461BEaf6543bB60Cd6cFd1D3B631 0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B 0x01be23585060835e02b77ef475b0cc51aa1e0709 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311 100000000000000000

Successfully verified contract RandomSVG on Etherscan.
https://rinkeby.etherscan.io/address/0x629C50B3A3Ab461BEaf6543bB60Cd6cFd1D3B631#code
```

## Reference
- [YT](https://www.youtube.com/watch?v=9oERTH9Bkw0)
- [Github](https://github.com/PatrickAlphaC/all-on-chain-generated-nft)
- [Hardhat](https://hardhat.org/guides/)
- [Openzeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [SVG](https://www.w3schools.com/graphics/svg_intro.asp)
- [SVG](https://www.w3schools.com/graphics/svg_intro.asp)

# 2. Upgrading Smart Contract
## Proxy Terminology
```
1. The Implementation Contract
- Which has all our code of our protocal.
When we upgrade, we launch a brand new implemenation contract

2. The proxy contract.
Which points to which implementation is the "correct" one, and routes everyone's function calls to that contract.

3. The user
- They make calls to the proxy.

4. The admin
- This is the user(or group of users/voters) who upgrade to new implementation contracts
```

## Theory
- Biggest Gotchas:
```
1. Storage Clashes
2. Function Selector Clashes
```

- Function Selector
```
A 4 byte hash of a function name and function signature that define a function
```

- Transparent Proxy Pattern
```
Admins can't call implementation contract function.
Admin functions are functions that govern the upgrades.
Admin functions are located in the proxy contract.
Users still powerless on admin functions.
```

- Universal upgradeable Proxies
```
AdminOnly upgrade functions are in the implementation contracts instead of the proxy.
```

## Create Project and Install Module
```
$ npx hh init
$ npm install --save-dev @openzeppelin/hardhat-upgrades
```

## Deploy Rinkeby
- deploy.js
```
async function main() {
  const Box = await ethers.getContractFactory("Box")
  console.log("Deploying Box, ProxyAdmin, and then Proxy...")
  const proxy = await upgrades.deployProxy(Box, [42], { initializer: 'store' })
  console.log("Proxy of Box deployed to:", proxy.address)
}
```
- Deploy Command
```
$ npx hh run scripts/deploy.js --network rinkeby
Deploying Box, ProxyAdmin, and then Proxy...
Proxy of Box deployed to: 0x229bC540091cd5b5007661B6f9331Dd638023399
```
- Hardhat Test in Rinkeby
```
$ npx hh console --network rinkeby
$ const Box = await ethers.getContractFactory("Box")
$ const box = Box.attach("0x229bC540091cd5b5007661B6f9331Dd638023399")
$ (await box.retrieve()).toString() // '42'
```
## Upgrade Rinkeby
- Upgrade.js
```
    const BoxV2 = await ethers.getContractFactory("BoxV2")
    let box = await upgrades.upgradeProxy("0x229bC540091cd5b5007661B6f9331Dd638023399", BoxV2)
    console.log("Your upgraded proxy is done!", box.address)
```
- Upgrade Command
```
$ npx hh run scripts/upgrade.js --network rinkeby
Your upgraded proxy is done! 0x229bC540091cd5b5007661B6f9331Dd638023399
```

- Test of upgrade contract in Rinkeby
```
$ npx hh console --network rinkeby
$ const BoxV2 = await ethers.getContractFactory("BoxV2")
$ const boxV2 = BoxV2.attach("0x229bC540091cd5b5007661B6f9331Dd638023399")
$ (await boxV2.retrieve()).toString() // '42'
$ (await boxV2.increment())
$ (await boxV2.retrieve()).toString() // '43'
```

## Reference
- [YT](https://www.youtube.com/watch?v=bdXJmWajZRY)
- [Openzeppellin Upgrade](https://docs.openzeppelin.com/upgrades-plugins/1.x/)
- [Upgrade Step By Step](https://forum.openzeppelin.com/t/openzeppelin-upgrades-step-by-step-tutorial-for-hardhat/3580)

# 3. Connect to Wallet
## Project List
0. Hardhat Simple Storage
1. HTML / JS
2. NexTJS / React and "raw" ethers
3. NexTJS & "web3-react"
4. NexTJS & react-moralis
5. NextJS & "web3Modal"
6. NextJS & "useDapp"

## 0. Hardhat Simple Storage
```
$ npm install
$ npx hardhat deploy --network rinkeby
----------------------------------------------------
Deploying SimpleStorage and waiting for confirmations...
deploying "SimpleStorage" (tx: 0x94ef8aba3a05cdfd3a309c949fc1428d11b668edad431c5f61d166f2e46fc738)...: deployed at 0xb0c26D3c2161bD912F22d6e37624A339De2D006F with 463682 gas
SimpleStorage deployed at 0xb0c26D3c2161bD912F22d6e37624A339De2D006F
Verifying contract...
Nothing to compile
Compiling 1 file with 0.8.8
Successfully submitted source code for contract
contracts/SimpleStorage.sol:SimpleStorage at 0xb0c26D3c2161bD912F22d6e37624A339De2D006F
for verification on the block explorer. Waiting for verification result...

Successfully verified contract SimpleStorage on Etherscan.
https://rinkeby.etherscan.io/address/0xb0c26D3c2161bD912F22d6e37624A339De2D006F#code
```
### Reference
- [YT](https://www.youtube.com/watch?v=pdsYCkUWrgQ)

## 1. HTML / JS
- http-server
```
npm install http-server
npx http-server
```

- browserify
```
npm install browserify
browserify index.js --standalone bundle -o ./dist/bundle.js
```
### Reference
- [http-server](https://www.npmjs.com/package/http-server)


# 4. Dao & Governance
## Create Project
```
$ npm install hardhat
$ npm install ethers @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers web3modal @openzeppelin/contracts dotenv hardhat-shorthand
$ npm install -D hardhat-deploy
$ npm install --save-dev  @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers
$ npx hardhat init
※ create only hardhat.config.js 
```
## Typescript Module
- Example Command Typescript+Hardhat 
``` 
$ npm install typescript typechain ts-node @typechain/ethers-v5 @typechain/hardhat @types/chai @types/node 
```
- Install @typechain/hardhat, ts-node
```
$ npm install @typechain/hardhat
$ npm install --save-dev ts-node
```

## Deployment Scripts
### Deployment Scripts: 1. Governor Token
- Deploy and Delegate, numCheckpoints
```
  const governanceToken = await deploy("GovernanceToken", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  await delegate(governanceToken.address, deployer)

const delegate = async (governanceTokenAddress: string, delegatedAccount: string) => {
  const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress)
  const transactionResponse = await governanceToken.delegate(delegatedAccount)
  await transactionResponse.wait(1)
  console.log(`Checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`)
}
```

- Deploy Result
```
Deploying GovernanceToken and waiting for confirmations...
deploying "GovernanceToken" (tx: 0xb8328573ab9b294f1c56d0ebd6291a47f293f60fc6ae8b8152ab7b4e509c802e)...: deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3 with 3326223 gas
GovernanceToken at 0x5FbDB2315678afecb367f032d93F642f64180aa3
Delegating to 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Checkpoints: 1
Delegated!
```

### Deployment Scripts: 2. TimeLock
```
  const timeLock = await deploy("TimeLock", {
    from: deployer,
    args: [MIN_DELAY, [], []],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
```

### Deployment Scripts: 3. Governance
```
  const governanceToken = await get("GovernanceToken")
  const timeLock = await get("TimeLock")

  const governorContract = await deploy("GovernorContract", {
    from: deployer,
    args: [
      governanceToken.address,
      timeLock.address,
      QUORUM_PERCENTAGE,
      VOTING_PERIOD,
      VOTING_DELAY,
    ],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
```
- Error Fix
```
Error: ERROR processing dao-governance\deploy\03-deploy-governor-contract.ts:
Error: Transaction reverted: trying to deploy a contract whose code is too large
※※※※　Add option allowUnlimitedContractSize= true 
hardhat.config.ts
  networks : {
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
```
### Deployment Scripts: 4. Setup Contracts
```
  const governanceToken = await ethers.getContract("GovernanceToken", deployer)
  const timeLock = await ethers.getContract("TimeLock", deployer)
  const governor = await ethers.getContract("GovernorContract", deployer)

  log("----------------------------------------------------")
  log("Setting up contracts for roles...")
  // would be great to use multicall here...
  const proposerRole = await timeLock.PROPOSER_ROLE()
  const executorRole = await timeLock.EXECUTOR_ROLE()
  const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()

  const proposerTx = await timeLock.grantRole(proposerRole, governor.address)
  await proposerTx.wait(1)
  const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO)
  await executorTx.wait(1)
  const revokeTx = await timeLock.revokeRole(adminRole, deployer)
  await revokeTx.wait(1)

```

### Deployment Scripts: 5. Box
```
const box = await deploy("Box", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`Box at ${box.address}`)
    const boxContract = await ethers.getContractAt("Box", box.address)
  const timeLock = await ethers.getContract("TimeLock")
  const transferTx = await boxContract.transferOwnership(timeLock.address)
  await transferTx.wait(1)
```

## Script Test
### 1. propose.ts (Create Propose)
```
$ npx hh deploy --network localhost
$ npx hh run scripts/propose.ts --network localhost
--------
Proposing store on 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853 with 77
Proposal Description:
  Proposal #1 77 in the Box!
Moving blocks...
Moved 2 blocks
Proposed with proposal ID:
  51508501457481436077634888669578781761098444908194579718864424217340756472817
Current Proposal State: 1
Current Proposal Snapshot: 11
Current Proposal Deadline: 16
```
### 2. vote.ts (Votting Propose)
[castVoteBySig](https://forum.openzeppelin.com/t/what-is-votecastbysig/17069)
- vote process
```
$ npx hh run scripts/vote.ts --network localhost
--------
Voting...
I lika do da cha cha
Current Proposal State: 1
Moving blocks...
Moved 6 blocks

```
- Get votes state via console
```
$ npx hh console --network localhost
> const governor = await ethers.getContract("GovernorContract")
> await governor.state("51508501457481436077634888669578781761098444908194579718864424217340756472817")
4 // succeeded
```

### 3. queue-and-execute.ts 
```
$ npx hh run scripts/queue-and-execute.ts --network localhost
------
Queueing...
Moving blocks...
Moved forward in time 3601 seconds
Moving blocks...
Moved 1 blocks
Executing...
Box value: 77
```
### 

## Reference
[What's a DAO, How to build Dao](https://www.youtube.com/watch?v=X_QKZzd68ro)
[Openzeppellin Wizard](https://docs.openzeppelin.com/contracts/4.x/wizard)
[Openzeppellin Governance](https://docs.openzeppelin.com/contracts/4.x/api/governance)
[hardhat-typescript-deploy](https://github.com/wighawag/hardhat-deploy)
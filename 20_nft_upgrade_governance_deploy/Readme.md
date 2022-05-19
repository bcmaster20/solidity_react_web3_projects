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


### Source & Video
- [YT](https://www.youtube.com/watch?v=9oERTH9Bkw0)
- [Github](https://github.com/PatrickAlphaC/all-on-chain-generated-nft)
- [Hardhat](https://hardhat.org/guides/)
- [Openzeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [SVG](https://www.w3schools.com/graphics/svg_intro.asp)
- [SVG](https://www.w3schools.com/graphics/svg_intro.asp)

# 2. Upgrading Smart Contract

# 3. Connect to Wallet

# 4. Dao & Governance


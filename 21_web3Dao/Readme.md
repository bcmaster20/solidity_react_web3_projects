
# 1. ICO (Initial Coin Offering)
## 1-1 Create SmartContract
```
$ npm install ethers hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers web3modal @openzeppelin/contracts ipfs-http-client axios dotenv hardhat-shorthand
$ npm install -D hardhat-deploy
$ npm install --save-dev  @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers
$ npm install @nomiclabs/hardhat-etherscan
```
## 1-2 Deploy Rinkeby
```
$ npx hh run scripts/deploy.js --network rinkeby
---
Whitelist Contract Address: 0x44A9b7d0C955e759013e66cCCF3906aa5bffCE0C
CryptoDevs Contract Address: 0xc81665Ae4C76bE245627dbf32c3670Cb82803573
Crypto Devs Token Contract Address: 0x28dF5796D98438D5f7D220a328D9a0347aD7571f
```

## 1-3 whitelist frontend
- Init Project and Install module
```
$ npx create-next-app@latest
$ npm install web3modal ethers
```
- Deploy Vercel Site 
```
https://whitelist-e5pfgo96a-jaylee923.vercel.app/
```

## 1-4 cryptodevsnft frontend
- Deploy Vercel Site 
```
https://cryptonft-mocha.vercel.app/
```

## Reference
[Git](https://github.com/LearnWeb3DAO/ICO)


# 2. 

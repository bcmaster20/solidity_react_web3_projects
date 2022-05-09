# ERC1155 MarketPlace Smart Contract
NFT-MArketplace Smart Contract users can set royalty of NFT, buy with ERC20 token & 2.5% platform fees.

## Project Setting
```shell
npm i --save-dev ethers hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers web3modal @openzeppelin/contracts ipfs-http-client axios dotenv @nomiclabs/hardhat-etherscan

npm install --save-dev @nomiclabs/hardhat-web3 web3
npm install --save-dev @openzeppelin/test-helpers
```

- create .env file in root directory.
```shell

    RINKEBY_API_URL = "https://eth-rinkeby.alchemyapi.io/v2/your-api-key"
    PRIVATE_KEY = "YOUR-METAMASK-PRIVATE_KEY"
    ETHERSCAN_API_KEY = "YOUR-ETHERSCAN_API_KEY"
```

```shell
npx hardhat test
```
This codebase goes along with the tutorial [The Complete Guide to Full Stack Web3 Development](https://dev.to/edge-and-node/the-complete-guide-to-full-stack-web3-development-4g74)
The video course for this codebase is located [here](https://www.youtube.com/watch?v=nRMo5jjgCr4&list=PLSMvK3DkHvw9GXfpyY2MZuM56rA06bOzS&index=12)



## 1. Create Hardhat, Next.js Project and Deploy Rinkeby
```shell
(npm install --save-exact --save react react-dom next)
$ npx create-next-app web3-blog --use-npm
$ cd web3-blog

$ npm install ethers hardhat @nomiclabs/hardhat-waffle \
ethereum-waffle chai @nomiclabs/hardhat-ethers \
web3modal @walletconnect/web3-provider \
easymde react-markdown react-simplemde-editor \
ipfs-http-client @emotion/css @openzeppelin/contracts
```
```shell
$ npx hardhat run scripts/deploy.js --network rinkeby
```
Blog deployed to: 0xeeE9D237512BAaC63f601e1B2cAbc6F9e1808d8D

## 2. Configration Context js
import { createContext } from 'react'
export const AccountContext = createContext(null)

## 3. Alchemy or Infura Connects to Ethereum with RPC
https://dev.to/hideckies/ethers-js-cheat-sheet-1h5j

```shell
const provider = new ethers.provider.JsonRpcProvider(`url`);
Alchemy	https://<network>.alchemyapi.io/v2/YOUR-API-KEY
Infura	https://<network>.infura.io/v3/YOUR-PROJECT-ID
```
```shell
Chain ID	Network
1	Mainnet
3	Ropsten
4	Rinkeby
5	Goerli
10	Optimism
42	Kovan
56	BSC
137	Polygon
42161	Arbitrum One
43114	Avalanche
```
## 4. Create a Post
```shell
/* define the ipfs endpoint */
const client = create('https://ipfs.infura.io:5001/api/v0')

/* configure the markdown editor to be client-side import */
const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false }
)

/* For Alchemy */
async function getWeb3Modal() {
  const web3Modal = new Web3Modal({
    network: 'rinkeby',
    cacheProvider: false,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: { 
          // infuraId: process.env.NEXT_PUBLIC_INFURA_ID
          rpc: {
            4: process.env.NEXT_API_Key
          }
        },
      },
    },
  })
  return web3Modal
}
```
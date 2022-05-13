# DEX
This is base on [Youtube](https://www.youtube.com/watch?v=4qvh9NWOOhE&list=PLCH4QeM_3zR7x0J7yB6MM_iRIx7wsw5Qk&index=1)

## 1. Create project 
```shell
npm init -y
npm install truffle --save-dev
npx truffle init
```
## 2. Tokens and Dex, ERC20 solidity  
Dex.sol, Erc20.sol, Tokens.sol

## 3. Truffle
### Truffle develop
```shell
$ npx truffle develop
$ let balance = await web3.eth.getBalance(accounts[0])
$ Number(balance) / 10**18 : 100
$ web3.eth.sendTransaction( {from: accounts[0], to : accounts[1], value: '100'});
$ web3.eth.getBalance(accounts[0])
$ web3.eth.getBalance(accounts[1])
```

### Truffle Migrate & Local Debug
```
truffle(develop):
$ migrate
$ const dex = await Dex.deployed();
$ const comp = await ERC20.deployed();
$ comp.name() : 'Compound'
$ const dai = await ERC20.at("0xb52e56A742B6d5702de3adFBC5bF7E44327E055A");
$ dai.name() : 'Dai'
$ const link = await ERC20.at("0x877c1bb501916e259444d4e3e753CC43e25Dc697");
$ link.name() : 'Chainlink'
$ let totalsupply = await dai.totalSupply();
$ totalsupply.toString(); : 10000000000000000000000000000 = 10^28
$ await dex.buyToken(dai.address, '100', '1000', {from: accounts[3], value: '100'});
$ let daiBalance = await dai.balanceOf(accounts[3]);
$ daiBalance.toString(); : 1000
$ web3.eth.getBalance(accounts[3]);
$ await dex.buyToken(accounts[7], '100', '1000', {from: accounts[3], value: '100'}); // Error
```
### Truffle Ganache
[Download URL](https://trufflesuite.com/ganache/)


## 3. Test
```
npm install chai chai-bn truffle-assertions
truffle(develop)> test
``` 

## 4. Client
- Install Live Server go live http://localhost:5500/
```
npm i web3
truffle console
truffle(develop)> migrate --reset
```
## 5. Deploy
```
npm install @truffle/hdwallet-provider
npm install dotenv --save

```

### .env Setting
```
CLIENT_URL=https://eth-rinkeby.alchemyapi.io/v2/<Your_API_KEY>
PRIVATE_KEY=<Your_PRIVATE_KEY>
```

### truffle config Setting
```
const private_key = process.env.PRIVATE_KEY;
const clientURL = process.env.CLIENT_URL;
...
    rinkeby: {
        provider: () => new HDWalletProvider( {
          privateKeys: [private_key],
          providerOrUrl: clientURL,
          numberOfAddresses: 1
        }
      ),
      network_id: 4, // Rinkeby's id
      gas: 8500000, // Gas sent with each transaction (default: ~6700000)
      gasPrice: 60000000000, // 60 gwei (in wei)
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
      networkCheckTimeout: 10000000
  },
```

### Migrate Rinkeby
```
npx truffle migrate --network rinkeby
Rinkeby Dai:  0x8d921E11AD879B8f6642F164bDa3b21605D758d8
Rinkeby Link:  0x7F2b2f7e1Ec50967c65866C9d3b1DE0d3Aa8DB52
Rinkeby Comp:  0x07196900D4A13622f50aBa97A9DE2b50Ffc549ea
Rinkeby Dex:  0x8aC7fFcb2bB0E63B4B5AeB67a2Aa42f5e0DcaF46
```

### Migrate Binance
```
  btestnet: {
    provider: () => new HDWalletProvider({
      privateKeys: [private_key],
      providerOrUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      numberOfAddresses: 1
      }
    ),
    network_id: 97,
    skipDryRun: true,
    networkCheckTimeout: 10000000
  },  		  
```





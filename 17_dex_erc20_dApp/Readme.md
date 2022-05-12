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


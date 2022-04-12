■ Truffle
$ npx ganache-cli
$ npx truffle  test

$ npx truffle  console

$ npm i dotenv

$ npm i @truffle/hdwallet-provider

$ npx truffle migrate --network rinkeby

depolyed rinkeby address
0xCd44c67F8f8B0F10D2A955F5B6B5E6Cc36437E07

gas ethereum station
https://ethgasstation.info/


■ Truffle Dapp intergrate our UI
https://www.youtube.com/watch?v=Qu6GloG0dQk&list=PLD_RqipW0-9tzS2HFvem3GAG_at4aoZa3&index=11

$ npx create-next-app vending-machine-app
$ npm i bulma
$ npm i web3
    
● package.json
"compile": "solcjs --abi --include-path node_modules/ --base-path . blockchain/contracts/VendingMachine.sol --output-dir blockchain/build"

● add module in package.json 
"solc": "^0.8.11",


● How to get object of smartcontract deployed test network?
import Web3 from 'web3'
const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/75c8616a13e942e08f55951b33d8c1a6');
const web3 = new Web3(provider);
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"donutBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVendingMachineBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"purchase","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"restock","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const vendingMachineContract = new web3.eth.Contract(abi, "0xCd44c67F8f8B0F10D2A955F5B6B5E6Cc36437E07");
export default vendingMachineContract

⇒
const vendingMachineContract = (web3) => {
  return new web3.eth.Contract(
    vendingMachineABI,
    "0xCd44c67F8f8B0F10D2A955F5B6B5E6Cc36437E07"
  )
}

export default vendingMachineContract


https://rinkeby.infura.io/v3/75c8616a13e942e08f55951b33d8c1a6
● Reference Site
・web3
https://web3js.readthedocs.io/en/v1.7.1/ssss

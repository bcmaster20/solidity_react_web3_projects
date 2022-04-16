$ mkdir Lottery
$ cd Lottery

■ lottery-dapp
$ npx create-next-app@latest 
$ cd lottery-dapp
$ npm i bulma

■ lottery
$ cd lottery
$ npm init
$ npm i truffle
$ npx truffle init
$ npm i dotenv @truffle/hdwallet-provider
$ npm install @chainlink/contracts@latest --save
※ 2022/4/16 ⇒ 

$ npx truffle migrate --network rinkeby
⇒ 0x6be8Cd276626E9B971D7FDdAaEeB93e5758d52FF


■ lottery-dapp
I'll add the compile option of "compile" in package.json's scripts block
 "compile": "solcjs --abi --include-path node_modules/ --base-path . blockchain/contracts/Lottery.sol --output-dir blockchain/build"

$ npm install solc --save

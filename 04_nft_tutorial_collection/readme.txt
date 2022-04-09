● URL
https://www.youtube.com/watch?v=A_6vTj887JE&list=PLD_RqipW0-9tzS2HFvem3GAG_at4aoZa3&index=7
https://github.com/jspruance/erc-721-nft-contract-tutorial

● CommandLine 
$ npm init
$ npm i --save-dev hardhat
$ npx hardhat 
$ npm i dotenv
$ npm install --save-dev "hardhat@^2.9.3" "@nomiclabs/hardhat-waffle@^2.0.0" "ethereum-waffle@^3.0.0" "chai@^4.2.0" "@nomiclabs/hardhat-ethers@^2.0.0" "ethers@^5.0.0"
$ npm i @openzeppelin/contracts
$ npx hardhat run scripts/deploy.js --network rinkeby

● Infuro project create

● openzeppelin 
https://docs.openzeppelin.com/contracts/4.x/erc721

● IPFS + Pinata
https://app.pinata.cloud/pinmanager

※Please upload nft image and json file in pinata
・3 image files 
https://ipfs.io/ipfs/QmbB8vrz117iixtkgNg4UxFqMuvHczNRgmrhXosCxyypJv
https://ipfs.io/ipfs/QmPCyMfKzCUz97exZAyWZJRQXPqfAQN4EbVUSxSWKLCWaA
https://ipfs.io/ipfs/QmP2TZTNAqNaxGq9gKxG5o3QiPpmtVWr4HDqafd71rChbC

・3 metadata json files 
https://ipfs.io/ipfs/QmPFh9aiW8iwSDM2K1E9jXiqwG33zsf4xYeKJwb43PbHsA
https://ipfs.io/ipfs/QmWCcAHtCUmk3KbAKJTwD2sUVXViPD5wqniCcVHk6FksFj
https://ipfs.io/ipfs/QmU6PHkjuSUQMRJuFu1DEQ6yMSDrZvzpj85wuWhmA3U7Nb

● Create deployment logic

● deploy rinkeby
$ npx hardhat run scripts/deploy.js --network rinkeby
・deployed to blow address
0x668FEa428817aEaa91038b1e36613465D97F0a55

● let's open site opensea.io
connect rinkeby metamask address
https://github.com/neha01/NFT
https://www.youtube.com/watch?v=KbhiAaRdgwc

・Upload images folder onto IPFS using Pinata
・Generate Metadata files for our images and upload metadata files folder to IPFS using Pinata
・Deploy and test our ERC1155 contract on Rinkeby testnet using Remix & Metamask (A brief discussion on difference between ERC721 vs ERC1155)
・Brief discusstion on ERC1155 contract and how to calcuate gas fees 
・Batch Mint NFT's on Rinkeby testnet and test on Opensea testnet
・Depoly our contract on testnet and do quick testing.

1.　Uploading images foler to Pinata
Example: Folder Cid
https://gateway.pinata.cloud/ipfs/QmfMYrhuSatL6kwDsdwsRK2sMG8qQZzVEC6R6zW2JetSko/1.png

2. Setting Metadata files
・Create bulk_mint_nfts/images folder and copy nft arts.
$ node utils/rename-images-to-numbered-sequence.js

・Edit config.json
"baseUri": "ipfs://QmfMYrhuSatL6kwDsdwsRK2sMG8qQZzVEC6R6zW2JetSko"

・Create Metadata json files from images
$ node utils/create-metadata.js
As Result, It will be created metadata folder in src.

・Upload metadata folder to pinata
folder name : jaylee-metadata-files
cid: QmUWjViBSCnYAP5anDaL4tCQPu9dDFtfjHvgVcvZZh3xU1

3. Deploying contract with Remix editor and Metamask
・Connect the InjectWeb3 and Deploy
0xb9c9Db54f98A365B99fFCE4e876D9EffF5b6d1D0

・Run Script/bulk_mint_nfts.js
・Run Script/estimate_gas_fee.js
It's gas fee reference url.
https://ethereum.stackexchange.com/questions/68816/is-the-gas-price-on-test-net-equal-to-main-net

・Test Open Sea



# LAZY Mint

## Project Init
```
npm install ethers hardhat 
npm install @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers
npm install @openzeppelin/contracts dotenv hardhat-shorthand hardhat-deploy hardhat-contract-sizer hardhat-gas-reporter @nomiclabs/hardhat-etherscan
npm install --save-dev  @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers
npm install prettier prettier-plugin-solidity solhint solidity-coverage
npm install --save moralis
```

## LazyMint Contract Depoy
```
npx hh deploy --network mumbai
npx hardhat verify --contract contracts/lazymint.sol:BmDevNFT --network mumbai 0x571b7fF9779566C6c71Ba154D91884B7022b5131
https://mumbai.polygonscan.com/address/0x571b7fF9779566C6c71Ba154D91884B7022b5131#code
```

## LazyMint Contract Depoy
```
npx hh run scripts/create_nfts.js --network mumbai
0x662013fd288a3ae5d61363ff2d474192b5f5d557cea7138e3363761ec4eab47f46ec739c982f182f226c548b9356e16dde5f3d03ff02a32106ff8b01cea78bdb1c
{
  tokenID: 1,
  price: BigNumber { _hex: '0x2386f26fc10000', _isBigNumber: true },
  uri: 'https://ipfs.moralis.io:2053/ipfs/QmbvdBx8yudwf8gL7hU7XshaVRMPTebLUDDd7UEjEhk1vm'
}
0x768cec0e13f14290db27157372ad2afb19783081d5510681a588e87b31dca0c6331b6c89c03c0b317c0df712a57e7ef44baf6c7481363f0fd71827ab0557f2621b
{
  tokenID: 2,
  price: BigNumber { _hex: '0x470de4df820000', _isBigNumber: true },
  uri: 'https://ipfs.moralis.io:2053/ipfs/QmaRheKWghKYa5LLKYq5kkXg81sbGkT7Fi6zLYBmDfHZUq'
}
0x2a400bebf1d8ed04254192d00e6d76726d9e6ba3feed1a1d3bb3f1d7605b498f0355b838604b19acfa5fb961cd783ae9ab07b878ac5ef3e3ba299710a7f806991b
{
  tokenID: 3,
  price: BigNumber { _hex: '0x6a94d74f430000', _isBigNumber: true },
  uri: 'https://ipfs.moralis.io:2053/ipfs/QmePwAo9RPDX1M8awoBsk4g8LH4s3gYRh7HNpfV11XV4Lf'
}
0x8e0e942fd7e9070204abe3c2d1b6a1985a6d7bdefd7cb3917379870c6881d04a504ee9519f7c677c11c05b7bfa77d2a8dd0e707981c2d60364dff9c4674203241b
{
  tokenID: 4,
  price: BigNumber { _hex: '0x8e1bc9bf040000', _isBigNumber: true },
  uri: 'https://ipfs.moralis.io:2053/ipfs/QmSFcPKz7a5sC5aSEyJ3h42r5FQLbqMv1NvFCdfF4LdGeu'
}
0x744d9b7cc710117c8f796a62478f6e55af18d9c7d3ff226ba4a01f94fe1054bf197e913a9ef626321df20ce2c5c157a4ad4165dc83ecf3c597e64b839f29a2c41b
{
  tokenID: 5,
  price: BigNumber { _hex: '0xb1a2bc2ec50000', _isBigNumber: true },
  uri: 'https://ipfs.moralis.io:2053/ipfs/QmX5jLnvwkM2ghMxxCfX38Mp3Jmp5WsyCg2k5sQsaU3mPm'
}
0x85e6dda5f48f8232ba23f108f007d0a62cfe56cc3d1f72348fa6594562e3f1847e0fc56c3dd53453d2a2b168b9bc4da3d5aad0133490fc522183b6d1cc7e99731b
{
  tokenID: 6,
  price: BigNumber { _hex: '0xd529ae9e860000', _isBigNumber: true },
  uri: 'https://ipfs.moralis.io:2053/ipfs/QmZoDb8ozuSedwZQrTEccav48NxmNUKasNcARKaiQQcY9C'
}
```



## Reference
- [Source](https://github.com/simondevyoutube/Solidity_LazyMinting)
- [Explain](https://youtu.be/5JnodJK4Em0)
```

```


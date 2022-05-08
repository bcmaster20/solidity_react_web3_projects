require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/Lem2OUMRH1pGhFZrnVUCEPU3quHcaVrq',
      accounts: ['1fad5a337eb9615a232fa8287dc3140ad702d9e304ddc89d9b07815fd5a3ee96'],
    },
  },
};
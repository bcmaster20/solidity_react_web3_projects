require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/K41PqDfGFUFQ_5J9oPwoIETgMHwPdBe9",
      accounts: [process.env.pk]
    },
    // polygon: {
    //   url: "https://polygon-rpc.com/",
    //   accounts: [process.env.pk]
    // }
  }
};
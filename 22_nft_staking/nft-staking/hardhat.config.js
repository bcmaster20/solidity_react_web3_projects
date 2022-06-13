require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");
require("solidity-coverage")
require("hardhat-gas-reporter")
require("dotenv").config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || process.env.ALCHEMY_MAINNET_RPC_URL || "";
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "";
const POLYGON_MUMBAI_RPC_URL = process.env.POLYGON_MUMBAI_RPC_URL || "";

const KOVAN_RPC_URL = process.env.KOVAN_RPC_URL || "";
const MNEMONIC = process.env.MNEMONIC || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || "";
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "";
// console.log(BSCSCAN_API_KEY)

// optional
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {
      // // If you want to do some forking, uncomment this
      // forking: {
      //   url: MAINNET_RPC_URL
      // }
    },
    localhost: {},
    // kovan: {
    //     url: KOVAN_RPC_URL,
    //     accounts: [PRIVATE_KEY],
    //     // accounts: {
    //     //     mnemonic: MNEMONIC,
    //     // },
    //     saveDeployments: true,
    // },
    bsctestnet: {
      url: "https://data-seed-prebsc-1-s3.binance.org:8545",
      // url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      chainId: 97,
      accounts: {mnemonic: MNEMONIC}
    },
    mumbai: {
      chainId: 80001,
      //url: "https://rpc-mumbai.maticvigil.com",
      url: POLYGON_MUMBAI_RPC_URL,
      accounts: {mnemonic: MNEMONIC}
    },    
    rinkeby: {
        chainId: 4,
        url: RINKEBY_RPC_URL,
        // accounts: [PRIVATE_KEY],
        accounts: {
            mnemonic: MNEMONIC,
        },
        saveDeployments: true,
    },
  },

  solidity: {
    compilers : [
      // { version: "0.8.7" } , { version: "0.4.24" }, { version: "0.6.6" }, { version: "0.7.0" }
      { version: "0.8.0" } , { version: "0.8.7" } , { version: "0.8.4" }
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  // solidity: "0.8.4",
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    // apiKey: ETHERSCAN_API_KEY, // ethereum
    apiKey: BSCSCAN_API_KEY, // binancetest
    
  },  
  namedAccounts: {
    deployer: {
      default: 0,
    }
  }
};

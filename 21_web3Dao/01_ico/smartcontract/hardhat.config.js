/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("@nomiclabs/hardhat-waffle");
 require("hardhat-deploy");
 require("@nomiclabs/hardhat-ethers");
 // require("@nomiclabs/hardhat-truffle5");
 require("@nomiclabs/hardhat-etherscan");
 
 require("dotenv").config();
 
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
 const KOVAN_RPC_URL = process.env.KOVAN_RPC_URL || "";
 const MNEMONIC = process.env.MNEMONIC || "";
 const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
 // optional
 const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
 
 
 // You need to export an object to set up your config
 // Go to https://hardhat.org/config/ to learn more
 
 /**
  * @type import('hardhat/config').HardhatUserConfig
  */
 module.exports = {
   defaultNetwork: "hardhat",
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
     rinkeby: {
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
       { version: "0.8.4" },{ version: "0.8.10" }
     ]
   },
   // solidity: "0.8.4",
   etherscan: {
     // Your API key for Etherscan
     // Obtain one at https://etherscan.io/
     apiKey: ETHERSCAN_API_KEY,
   },  
   namedAccounts: {
     deployer: {
       default: 0,
     }
   }
 };
 
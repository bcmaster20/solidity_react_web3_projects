// import Component from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';
import axios from 'axios';
import React, { Component } from 'react';
const ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "baseExtension",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "baseURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cost",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "maxMintAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "maxSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_mintAmount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_state",
        "type": "bool"
      }
    ],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_newBaseExtension",
        "type": "string"
      }
    ],
    "name": "setBaseExtension",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_newBaseURI",
        "type": "string"
      }
    ],
    "name": "setBaseURI",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newmaxMintAmount",
        "type": "uint256"
      }
    ],
    "name": "setmaxMintAmount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "walletOfOwner",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

const VAULTABI = [
  {
    "inputs": [
      {
        "internalType": "contract ERC721Enumerable",
        "name": "_nft",
        "type": "address"
      },
      {
        "internalType": "contract BMRewardsV1",
        "name": "_token",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Claimed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "NFTStaked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "NFTUnstaked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "tokenIds",
        "type": "uint256[]"
      }
    ],
    "name": "claim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "tokenIds",
        "type": "uint256[]"
      }
    ],
    "name": "claimForAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "tokenIds",
        "type": "uint256[]"
      }
    ],
    "name": "earningInfo",
    "outputs": [
      {
        "internalType": "uint256[1]",
        "name": "info",
        "type": "uint256[1]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "onERC721Received",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "tokenIds",
        "type": "uint256[]"
      }
    ],
    "name": "stake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "tokensOfOwner",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "ownerTokens",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalStaked",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "tokenIds",
        "type": "uint256[]"
      }
    ],
    "name": "unstake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "vault",
    "outputs": [
      {
        "internalType": "uint24",
        "name": "tokenId",
        "type": "uint24"
      },
      {
        "internalType": "uint48",
        "name": "timestamp",
        "type": "uint48"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

var account = null;
var contract = null;
var vaultcontract = null;
// Rinkeby
// const NFTCONTRACT = "0xB0395e01b0463Ff91D5d399ead8e0e93D7Eb8FD5";
// const STAKINGCONTRACT = "0x522A22948E8A1D4c1c018188D36537A17d7C6D94";
// const apikey="76JSG3E5TVMY1U5QFKQZMTMMPVXKMCCGHT";
// const endpoint = "https://api-rinkeby.etherscan.io/api";

// mumbai
const NFTCONTRACT = "0x6A782Dc1663419d5b4E4f956d8e40c35721aeb59";
const STAKINGCONTRACT = "0xCd44c67F8f8B0F10D2A955F5B6B5E6Cc36437E07";
const endpoint = "https://api-testnet.polygonscan.com/api";
const polygonscanapikey = "84ZBB5NVIMT5U6U6DTAFKCJTGJAE8IF5RQ";
const apikey="84ZBB5NVIMT5U6U6DTAFKCJTGJAE8IF5RQ";
const moralisapi = "https://deep-index.moralis.io/api/v2/";
const moralisapikey = "7IHsNlGsGVzsqoqxOXCgnO1eqx3lZ5Xlh1A9GPLZCVkUZ7LLA4eUDdj9wdyknOoL";

const nftpng = "https://ipfs.io/ipfs/QmQs9MyM262FjHVnuWtKX3CkWPzHzqJwyGwSiqCPTBJ5fR/";
const openseaapi = "https://testnets-api.opensea.io/api/v1/assets";



class App extends Component {
  constructor() {
    super();
    this.state = {
      balance: [],
      nftdata: [],
    };
  }

  async componentDidMount() {
    await axios
      .get(
        endpoint +
          `?module=stats&action=tokensupply&contractaddress=${NFTCONTRACT}&apikey=${apikey}`
      )
      .then((outputa) => {
        this.setState({
          balance: outputa.data,
        });
        console.log("tokensupply", outputa.data);
      });

    // await axios
    //   .get(
    //     endpoint +
    //       `?module=account&action=tokennfttx&contractaddress=${NFTCONTRACT}&page=1&offset=100&tag=latest&apikey=${apikey}`
    //   )
    //   .then((outputb) => {
    //     const { result } = outputb.data;
    //     this.setState({
    //       nftdata: result,
    //     });
    //     console.log("tokennfttx", outputb.data);
    //   });
    // await axios.get((openseaapi + `?asset_contract_addresses=${NFTCONTRACT}&format=json&order_direction=asc&offset=0&limit=20`))
		// .then(outputb => {
		// 	const { assets } = outputb.data
    //         this.setState({
    //             nftdata:assets
    //         })
    //         console.log(outputb.data)
    // });
    let config = {'X-API-Key': moralisapikey, 'accept': 'application/json'};
    await axios.get((moralisapi + `/nft/${NFTCONTRACT}/owners?chain=mumbai&format=decimal`), {headers: config})
		.then(outputb => {
			const { result } = outputb.data
      console.log(result);
      this.setState({
          nftdata:result
      })
    });

  }




  render() {
    const { balance } = this.state;
    const { nftdata } = this.state;

    async function connectwallet() {
      if (window.ethereum) {
        var web3 = new Web3(window.ethereum);
        await window.ethereum.send("eth_requestAccounts");
        var accounts = await web3.eth.getAccounts();
        account = accounts[0];
        document.getElementById("wallet-address").textContent = account;
        contract = new web3.eth.Contract(ABI, NFTCONTRACT);
        vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
      }
    }
    async function mint() {
      if (window.ethereum) {
        var _mintAmount = Number(document.querySelector("[name=amount]").value);
        var mintRate = Number(await contract.methods.cost().call());
        var totalAmount = mintRate * _mintAmount;
        contract.methods
          .mint(account, _mintAmount)
          .send({ from: account, value: String(totalAmount) });
      }
    }
    
    // async function stakeit() {
    //   var tokenids = Number(document.querySelector("[name=stkid]").value);
    //   vaultcontract.methods.stake([tokenids]).send({from: account});
    // }
    
    // async function unstakeit() {
    //   var tokenids = Number(document.querySelector("[name=stkid]").value);
    //   vaultcontract.methods.unstake([tokenids]).send({from: account});
    // }
    
    async function claimit() {
      var tokenids = Number(document.querySelector("[name=stkid]").value);
      vaultcontract.methods.claim([tokenids]).send({from: account});
    }
    
    async function verify() {
      var getbalance = Number(await vaultcontract.methods.balanceOf(account).call());
      document.getElementById('stakedbalance').textContent = getbalance; 
    }
    
    async function enable() {
      contract.methods.setApprovalForAll(STAKINGCONTRACT, true).send({from: account});
    }
    
    async function rewardinfo() {
      var tokenid = Number(document.querySelector("[name=stkid]").value);
      var rawearn = await vaultcontract.methods.earningInfo(account, ([tokenid])).call();
      var earned =  String(rawearn).split(",")[0];
      var earnedrwd = Web3.utils.fromWei(earned);
      // var rewards = Number(earnedrwd).toFixed(2);
      var rewards = Number(earnedrwd);
      document.getElementById('earned').textContent = rewards;
    }    

    return (
      <div className="App">
        <Button onClick={connectwallet} style={{marginBottom:"5px",marginTop:"5px",color:"#FFFFFF", marginRight:'3px'}}>Connect Wallet</Button>
        <Button onClick={enable}>Enable Staking</Button>        
        <div className="container">
          <div className="row">
            <form
              class="gradient col-lg-5 mt-5"
              style={{
                borderRadius: "25px",
                boxShadow: "1px 1px 15px #000000",
              }}
            >
              <h4 style={{ color: "#FFFFFF" }}>Mint Portal</h4>
              <h5 style={{ color: "#FFFFFF" }}>Please connect your wallet</h5>
              <div
                class="card"
                id="wallet-address"
                style={{ marginTop: "3px", boxShadow: "1px 1px 4px #000000" }}
              >
                <label for="floatingInput">Wallet Address</label>
              </div>
              <div
                class="card"
                style={{ marginTop: "3px", boxShadow: "1px 1px 4px #000000" }}
              >
                <input
                  type="number"
                  name="amount"
                  defaultValue="1"
                  min="1"
                  max="5"
                />
                <label>Please select the amount of NFTs to mint.</label>
                <Button onClick={mint}>Buy/Mint!</Button>
              </div>
              <label style={{ color: "#FFFFFF" }}>
                Price 0.05 ETH each mint.
              </label>
              <h5 style={{ color: "white", textShadow: "1px 1px 3px #000000" }}>
                {" "}
                Tokens Minted so far= {balance.result}/1000
              </h5>
            </form>
            <form class="gradient col-lg-3 mt-5 mr-3" style={{borderRadius:"25px",boxShadow:"1px 1px 15px #000000", marginRight:"5px"}}>
              <h4 style={{color:"#FFFFFF"}}>Staking Vault</h4>
              <h4 style={{color:"#FFFFFF"}}>NFT Vault Options</h4>
            <h5 style={{color:"#FFFFFF"}}>Verify Amount Staked</h5>
            <Button onClick={verify}>Verify</Button>
            <div id='stakedbalance' style={{marginTop:"5px",color:"#39FF14",fontWeight:"bold",textShadow:"1px 1px 2px #000000", fontSize:"35px" }}>
                <label for="floatingInput">NFT Balance</label>
                </div>              
            </form>
            <form class="gradient col-lg-3 mt-5 mr-3" style={{borderRadius:"25px",boxShadow:"1px 1px 15px #000000", marginRight:"5px"}}>
              <h5 style={{color:"#FFFFFF"}}> Staking Rewards</h5>
              <Button onClick={rewardinfo}>Earned BM Rewards</Button>
              <div id='earned' style={{color: "#39FF14",marginTop:"5px", fontSize:'25px',fontWeight:'bold',textShadow:"1px 1px 2px #000000"}}><p style={{fontSize:"20px"}}>Earned Tokens</p></div>
              <input name="stkid" style={{color: "#39FF14",fontSize:'25px',fontWeight:'bold',textShadow:"1px 1px 2px #000000",width:'50px',backgroundColor:'#00000000'}}/>
              <label className="col-4" style={{color:'white'}}>NFT ID</label>
              <div className='col-12 mt-2'>
                <div style={{color:'white'}}>Claim Rewards</div>
                <Button className="mb-2" onClick={claimit}>Claim</Button>
              </div>
            </form>
                        <div className="row items mt-3">
              <div
                className="ml-3 mr-3"
                style={{
                  display: "inline-grid",
                  gridTemplateColumns: "repeat(4, 5fr)",
                  columnGap: "10px",
                }}
              >
                {nftdata.map((assets, i) => {
                  async function stakeit() {
                    vaultcontract.methods.stake([assets.token_id]).send({from: account});
                  }
                  async function unstakeit() {
                    vaultcontract.methods.unstake([assets.token_id]).send({from: account});
                  }                  

                  return (
                    <div className="card mt-3" key={i} >
                      <div className="image-over">
                        <img className="card-img-top"  src={nftpng + assets.token_id +'.png'} alt="" />
                      </div>
                      <div className="card-caption col-12 p-0">
                        <div className="card-body">
                          <h5 className="mb-0">BM Collection NFT #{assets.token_id}</h5>
                          <h5 className="mb-0 mt-2">Location Status<p style={{color:"#39FF14",fontWeight:"bold",textShadow:"1px 1px 2px #000000"}}>{assets.owner_of}</p></h5>
                          <div className="card-bottom d-flex justify-content-between">
                              <input key={i} type="hidden" id='stakeid' value={assets.token_id} />
                              <Button className="mb-2 mt-3 col-5" style={{marginLeft:'2px'}} onClick={stakeit}>Stake it</Button>
                              <Button className="mb-2 mt-3 col-5" style={{marginLeft:'2px'}} onClick={unstakeit}>Unstake it</Button>
                          </div>
                        </div>
                      </div>
                    </div>                    
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

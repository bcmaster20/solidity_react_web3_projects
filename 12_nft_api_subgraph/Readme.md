# How to build a custom API from any smart contract.

## 1. Preparing Enviroment

At first, It will be created JayLee/Jaycryptocoven subgraph in [here](https://thegraph.com/hosted-service/)

```shell
$ graph init --from-contract 0x5180db8F5c931aaE63c74266b211F580155ecac8 --protocol ethereum --network mainnet --contract-name Token --index-events
√ Product for which to initialize · hosted-service
√ Subgraph name · JayLee/Jaycryptocoven
√ Directory to create the subgraph in · Jaycryptocoven
√ Ethereum network · mainnet
√ Contract address · 0x5180db8F5c931aaE63c74266b211F580155ecac8
√ Fetching ABI from Etherscan
√ Contract Name · Token
```

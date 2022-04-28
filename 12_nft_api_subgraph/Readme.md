# How to build a custom API from any smart contract.

## 1. Preparing Enviroment

At first, It will be created JayLee/Jaycryptocoven subgraph in [here](https://thegraph.com/hosted-service/)

```shell
$ graph init --from-contract 0x5180db8F5c931aaE63c74266b211F580155ecac8 --protocol ethereum --network mainnet --contract-name Token --index-events
√ Product for which to initialize · hosted-service
√ Subgraph name · jaylee923/jaycryptocoven
√ Directory to create the subgraph in · jaycryptocoven
√ Ethereum network · mainnet
√ Contract address · 0x5180db8F5c931aaE63c74266b211F580155ecac8
√ Fetching ABI from Etherscan
√ Contract Name · Token

$ graph codegen
$ graph build
$ graph auth
$ yarn deploy
```

## 2. How to use the API
Try it out here[https://thegraph.com/hosted-service/subgraph/jaylee923/jaycryptocoven]

### Get List Tokens
```shell
{
  tokens(first: 5) {
    id
    tokenID
    tokenURI
    externalURL
    image 
    name 
    description
    type 
    sun 
    moon 
    rising 
    updatedAtTimestamp 
    owner {
      id 
    }
  }
}
```

### Filtering
```shell
{
  tokens(
    where: {
      sun_contains: "capricorn"
    }
  ) {
    sun 
    name
  }
}
```

### Full text search
```shell
{
  covenSearch(
    text: "'CRUSH PEARLS IN YOUR FISTS'"
  ) {
    id
    name
    description
  }
}
```
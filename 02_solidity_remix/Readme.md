## 1. Lottery.sol
[link]()

## 2. Lottery_w_Cainlink_VRF.sol
[link](https://www.youtube.com/watch?v=_aXumgdpnPU&list=PLD_RqipW0-9tzS2HFvem3GAG_at4aoZa3&index=6)


### Chain link 
https://docs.chain.link/docs/get-a-random-number/

```shell
https://vrf.chain.link/rinkeby/2538

● V2方式で更新
2022/04/08
● Subscription_id : 2538
● Add consumer address (smartcontract address)
0xc03615aA3c88473d5AE30Aa3553EF2155AF48997

● 実行
・Run the enter function (three account)
・Run pickWinner
```

### Chain link Source
[Source](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/VRFConsumerBaseV2.sol)

```shell
VRFConsumerBaseV2.sol
VRFCoordinatorV2Interface.sol
LinkTokenInterface.sol
```
## 3. Smart Contract Tutorial | Create a Safe Remote Purchase Ethereum Smart Contract with Solidity
Using the Remix.
SafeRemotePurchase.sol

- A: 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2 4 ether deployed seller
State: Created
- B: 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db 4 ether confirmPurchase buyer
State: Locked
- B.transfer(value) +2 confirm Receive
State: Release

## 4. ERC1165
Remember interfaceId = xor of all selectors (methods) name and param type, don't care to return type

- Return zero with empty interface
- Return same id with difference return type
- Return same id with difference param name
```shell
interface ITest {
    function isERC1155(address nftAddress) external returns (bool);
    function isERC721(address nftAddress) external returns (bool);
}

contract Test is ITest, IERC165 {
    using ERC165Checker for address;
    bytes4 public constant IID_ITEST = type(ITest).interfaceId;
    bytes4 public constant IID_IERC165 = type(IERC165).interfaceId;
    bytes4 public constant IID_IERC1155 = type(IERC1155).interfaceId;
    bytes4 public constant IID_IERC721 = type(IERC721).interfaceId;
    
    function isERC1155(address nftAddress) external view override returns (bool) {
        return nftAddress.supportsInterface(IID_IERC1155);
    }    
    
    function isERC721(address nftAddress) external view override returns (bool) {
        return nftAddress.supportsInterface(IID_IERC721);
    }
    
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == IID_ITEST || interfaceId == IID_IERC165;
    }
}
```

# 5. Merkle
This is based on this article: https://medium.com/@ItsCuzzo/using-merkle-trees-for-nft-whitelists-523b58ada3f9

## Install npm packages
```shell
npm install merkletreejs
npm install keccak256
```

## Run Merkle
```shell
$ node merkle_tree.js

$ node merkle_tree.js
Whitelist Merkle Tree
 └─ 493ae09ba571a3a4f6c61e0804cc297773235d15e726f0335ccc04173ebec5db
   ├─ afdc1a501228714b044ab971ae94c1606f2ebf005c44b2b9b79d0c0ea24f12ca
   │  ├─ fb1eb22ca3cd5c6235e37a4386187e8f0f08d249e019986184eee11afaaf9749
   │  │  ├─ 5931b4ed56ace4c46b68524cb5bcbf4195f1bbaacbe5228fbd090546c88dd229
   │  │  └─ bf811d0ea73313107a8453ccc7c6a7a87f8ba78ff283c8f43554de585bea3e4c
   │  └─ 6554efe728911b8745c73f824ca2bc51fae63bce2925c54c0e53ccaa1e57a4b1
   │     ├─ 05d9f1326e851a439d15c901455b2df16b9238d76d5bec168fb6e17e1c952084
   │     └─ 7c5ab8daf3f23d2889af0f4a26249c1c94d32f25f93c6b25d6e568572516e9c1
   └─ c52de39f1d2ccb3dc7d0fad45ac7849afbc1cb2d911080937ec48b247f307ca4
      ├─ e6fc773c42a28ab3ea8ef1d93c99ceb3d6591b7bfd4518e1d56376edf55a106c
      │  ├─ 863995a28e9d93ef72fbf32e04fe34dc3e80d1a57ae744ae747a2f87d21e7131
      │  └─ ba9ce76902cdf53094fc21e682f49b869c0b1455b676fa8339199a86dbf3f6c4
      └─ afe7c546eb582218cf94b848c36f3b058e2518876240ae6100c4ef23d38f3e07
         └─ afe7c546eb582218cf94b848c36f3b058e2518876240ae6100c4ef23d38f3e07

Root Hash:  <Buffer 49 3a e0 9b a5 71 a3 a4 f6 c6 1e 08 04 cc 29 77 73 23 5d 15 e7 26 f0 33 5c cc 04 17 3e be c5 db>
---------- hexProof -------------
[
  '0xe6fc773c42a28ab3ea8ef1d93c99ceb3d6591b7bfd4518e1d56376edf55a106c',
  '0xafdc1a501228714b044ab971ae94c1606f2ebf005c44b2b9b79d0c0ea24f12ca'
]
---------- verify -------------
true

```

## Verify merkle solidity
```shell
contract MerkleTreeExample {
    // --- PROPERTIES ---- //

    // Calculated from `merkle_tree.js`
    bytes32 public merkleRoot =
        0x493ae09ba571a3a4f6c61e0804cc297773235d15e726f0335ccc04173ebec5db;

    mapping(address => bool) public whitelistClaimed;

    // --- FUNCTIONS ---- //

    function whitelistMint(bytes32[] calldata _merkleProof) public {
        require(!whitelistClaimed[msg.sender], "Address already claimed");
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(
            MerkleProof.verify(_merkleProof, merkleRoot, leaf),
            "Invalid Merkle Proof."
        );
        whitelistClaimed[msg.sender] = true;
    }
}
```

### solidity remix
```shell
Run whitelistMint Functions
[
  '0xe6fc773c42a28ab3ea8ef1d93c99ceb3d6591b7bfd4518e1d56376edf55a106c',
  '0xafdc1a501228714b044ab971ae94c1606f2ebf005c44b2b9b79d0c0ea24f12ca'
]

whitelistClaimed[0xdD870fA1b7C4700F2BD7f44238821C26f7392148] = true
```


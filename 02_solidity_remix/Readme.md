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


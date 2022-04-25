1. Lottery.sol


2. Lottery_w_Cainlink_VRF.sol
https://www.youtube.com/watch?v=_aXumgdpnPU&list=PLD_RqipW0-9tzS2HFvem3GAG_at4aoZa3&index=6


■ 参考サイト
①　Chain link 
https://docs.chain.link/docs/get-a-random-number/

https://vrf.chain.link/rinkeby/2538
● V2方式で更新

2022/04/08
● Subscription_id : 2538
● Add consumer address (smartcontract address)
0xc03615aA3c88473d5AE30Aa3553EF2155AF48997

● 実行
・Run the enter function (three account)
・Run pickWinner

①　Chain link Source
VRFConsumerBaseV2.sol
VRFCoordinatorV2Interface.sol
LinkTokenInterface.sol
https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/VRFConsumerBaseV2.sol

3. Access Control Smart Contract Security
https://github.com/jspruance/smart-contract-security

3. Smart Contract Tutorial | Create a Safe Remote Purchase Ethereum Smart Contract with Solidity
Using the Remix.
SafeRemotePurchase.sol

① A: 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2 4 ether deployed seller
State: Created
② B: 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db 4 ether confirmPurchase buyer
State: Locked
③ B.transfer(value) +2 confirm Receive
State: Release

Smart Contracts 101 - Simple Ether Wallet Smart Contract Tutorial
https://www.youtube.com/watch?v=UoGzV094jhE&list=PLD_RqipW0-9tzS2HFvem3GAG_at4aoZa3&index=13　

 // This function is called for plain Ether transfers, i.e.
 // for every call with empty calldata.
receive() external payable {}

---
It will allow our smart contract to receive ether or receive.
Remix: After it have deployed smartcontract, It can be run the "Low level interactions" function.

// This function is called for all messages sent to
// this contract, except plain Ether transfers
// (there is no other function except the receive function).
// Any call with non-empty calldata to this contract will execute
// the fallback function (even if Ether is sent along with the call).
fallback() external payable { x = 1; y = msg.value; }



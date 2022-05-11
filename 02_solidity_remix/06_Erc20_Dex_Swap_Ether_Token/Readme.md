
## Remix: Swap the token and ether using DEX
This is base on [blog](https://ethereum.org/ru/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/)
- deploy DEX;
- dex.buy({from: seller, value: 1 ether});
- seller.approve(dex, 100);
- dex.sell(amount);

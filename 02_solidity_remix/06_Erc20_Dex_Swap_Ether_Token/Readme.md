
Remix: Swap the token and ether using DEX
- deploy DEX;
- dex.buy({from: seller, value: 1 ether});
- seller.approve(dex, 100);
- dex.sell(amount);

# Ganache CLI: Advanced Tutorial
- This is base on [video](https://www.youtube.com/watch?v=AS2_uPSTk5E&list=PLbbtODcOYIoGyHf0P64qwbeLqKesenu1t&index=2)
- Github [Url](https://github.com/trufflesuite/ganache)

## Create Truffle Project
```
npm install truffle --save-dev
npm install ganache-cli
npx truffle init
```

## Create Truffle Project
- Token [Dai](https://ethplorer.io/address/0x6b175474e89094c44da98b954eedeac495271d0f#chart=candlestick)
- Address 0x6B175474E89094C44Da98b954EedeAC495271d0F
- Token Dai Holders 0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503
- alchemyapi
https://eth-mainnet.alchemyapi.io/v2/6QpQkZelqjsxzAroF75VD9SN7UukKlYE

## Create Truffle Project
```
npx ganache-cli -f https://eth-mainnet.alchemyapi.io/v2/6QpQkZelqjsxzAroF75VD9SN7UukKlYE -u 0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503

$ node ./script.js
Balance unlocked: 192000000000000000000000000
Balance recipient: 0
Balance unlocked: 191999999999999999999999000
Balance recipient: 1000
```
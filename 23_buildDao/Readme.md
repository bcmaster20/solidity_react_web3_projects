# Create Dao Project by React

## ThirdWeb SDK Scripts
```
$ node scripts/1-initialize-sdk.js
SDK initialized by address: 0x927c22BC93Bb171dDB28d7096502e4e202A2ACB6

$ node scripts/2-deploy-drop.js
SDK initialized by address: 0x927c22BC93Bb171dDB28d7096502e4e202A2ACB6
✅ Successfully deployed editionDrop contract, address: 0x6e08F7982bDF8bA0B2092D0d0c08dc5829232b6d
✅ editionDrop metadata: {
  name: 'BmDAO Membership',
  description: 'A DAO for fans of BM.',
  image: 'https://gateway.ipfscdn.io/ipfs/QmXhChm5yoHsZ6rCS1fYUN1pee15MS8vKEoCmvVzK7trLE/0',
  seller_fee_basis_points: 0,
  fee_recipient: '0x0000000000000000000000000000000000000000',
  merkle: {},
  symbol: ''
}

$ node scripts/3-config-nft.js
SDK initialized by address: 0x927c22BC93Bb171dDB28d7096502e4e202A2ACB6
✅ Successfully created a new NFT in the drop!

$ node scripts/4-set-claim-condition.js
SDK initialized by address: 0x927c22BC93Bb171dDB28d7096502e4e202A2ACB6
✅ Successfully set claim condition!

```

## Reference
[Start-Project](https://github.com/buildspace/buildspace-dao-starter)
[Final-Project](https://github.com/buildspace/buildspace-dao-final)
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

$ node scripts/5-deploy-token.js
SDK initialized by address: 0x927c22BC93Bb171dDB28d7096502e4e202A2ACB6
✅ Successfully deployed token module, address: 0xa5783d49Af78213a22E84E3D60Ca97BbC00ABbF1

$ node scripts/6-print-money.js
SDK initialized by address: 0x927c22BC93Bb171dDB28d7096502e4e202A2ACB6
✅ There now is 1000000.0 $HOKAGE in circulation

$ node scripts/7-airdrop-token.js
SDK initialized by address: 0x927c22BC93Bb171dDB28d7096502e4e202A2ACB6
✅ Going to airdrop 1038 tokens to 0x927c22BC93Bb171dDB28d7096502e4e202A2ACB6
🌈 Starting airdrop...
✅ Successfully airdropped tokens to all the holders of the NFT!

$ node scripts/8-deploy-vote.js
SDK initialized by address: 0x927c22BC93Bb171dDB28d7096502e4e202A2ACB6
✅ Successfully deployed vote contract, address: 0x1b65873d075A0353C2dD94260AA05d4eC6c59501

$ node scripts/9-setup-vote.js
SDK initialized by address: 0x927c22BC93Bb171dDB28d7096502e4e202A2ACB6
Successfully gave vote contract permissions to act on token contract
✅ Successfully transferred 900000 tokens to vote contract

$ node scripts/10-create-vote-proposals.js
SDK initialized by address: 0x927c22BC93Bb171dDB28d7096502e4e202A2ACB6
✅ Successfully created proposal to mint tokens
✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!

$ node scripts/11-revoke-roles.js
SDK initialized by address: 0x927c22BC93Bb171dDB28d7096502e4e202A2ACB6
👀 Roles that exist right now: {
  admin: [ '0x927c22BC93Bb171dDB28d7096502e4e202A2ACB6' ],
  minter: [
    '0x927c22BC93Bb171dDB28d7096502e4e202A2ACB6',
    '0x1b65873d075A0353C2dD94260AA05d4eC6c59501'
  ],
  transfer: [
    '0x927c22BC93Bb171dDB28d7096502e4e202A2ACB6',
    '0x0000000000000000000000000000000000000000'
  ]
}
🎉 Roles after revoking ourselves {
  admin: [],
  minter: [],
  transfer: [
    '0x927c22BC93Bb171dDB28d7096502e4e202A2ACB6',
    '0x0000000000000000000000000000000000000000'
  ]
}
✅ Successfully revoked our superpowers from the ERC-20 contract
```

## Reference
[Start-Project](https://github.com/buildspace/buildspace-dao-starter)
[Final-Project](https://github.com/buildspace/buildspace-dao-final)
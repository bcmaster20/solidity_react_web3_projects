const {ethers} = require("hardhat");
const {Moralis} = require("moralis/node");
const fs = require("fs");
const { exit } = require("process");
require("dotenv").config();

const math = (function() {
  return {
    rand_range: function(a, b) {
      return Math.random() * (b - a) + a;
    },

    rand_normalish: function() {
      const r = Math.random() + Math.random() + Math.random() + Math.random();
      return (r / 4.0) * 2.0 - 1;
    },

    rand_int: function(a, b) {
      return Math.round(Math.random() * (b - a) + a);
    },

    lerp: function(x, a, b) {
      return x * (b - a) + a;
    },

    smoothstep: function(x, a, b) {
      x = x * x * (3.0 - 2.0 * x);
      return x * (b - a) + a;
    },

    smootherstep: function(x, a, b) {
      x = x * x * x * (x * (x * 6 - 15) + 10);
      return x * (b - a) + a;
    },

    clamp: function(x, a, b) {
      return Math.min(Math.max(x, a), b);
    },

    sat: function(x) {
      return Math.min(Math.max(x, 0.0), 1.0);
    },

    in_range: (x, a, b) => {
      return x >= a && x <= b;
    },
  };
})();

async function main() {

  const serverUrl = process.env.MORALIS_SERVER || "";
  const appId = process.env.MORALIS_APP_ID || "";
  const masterKey = process.env.MORALIS_MASTER_KEY || "";

  await Moralis.start({ serverUrl, appId, masterKey });
  console.log('started');

  const SIGNS = ['Horse', 'Monkey', 'Bird', 'T-Rex', 'Hippo', 'Xenomorph', 'Unicorn', 'Tardigrade', 'Dog', 'Mouse', 'Crab', 'Sauterelle', 'Hagfish', 'Elf', 'Hobbit', 'Pigeon'];
  const VALUE = ['Worthless', 'Not Really', 'Somewhat', 'Yes', 'Very', 'Extremely', 'Crazy High'];
  const PERSONALITY = ['Extroverted', 'Introverted', 'Likes Coffee', 'Tired', 'Something', 'Weird', 'Bland', 'Fake', 'Loud', 'Annoying', 'Chews Loudly'];

  const [owner] = await ethers.getSigners();
  
  for (let i = 1; i <= 6; ++i) {
    const data = fs.readFileSync('./scripts/bird' + i + '.jpg', {encoding: 'base64'});
    const thumbnail = new Moralis.File('bird' + i + '.jpg', {
      base64: data
    });
    await thumbnail.saveIPFS({useMasterKey: true});
  
    const nftMetadata = {
      'description': 'BmDev long descriptive text about this thumbnail with a full history and background and stories and everything.',
      'external_url': 'https://www.bmdev.io/',
      'image': thumbnail.ipfs(),
      'name': 'BmDev NFT[' + i + ']',
      'attributes': [
        {
          'trait_type': 'Awesome',
          'value': 'Yes',
        },
        {
          'trait_type': 'Valuable',
          'value': VALUE[math.rand_int(0, VALUE.length - 1)],
        },
        {
          'trait_type': 'Personality',
          'value': PERSONALITY[math.rand_int(0, PERSONALITY.length - 1)],
        },
        {
          'trait_type': 'Astrology Sign',
          'value': SIGNS[math.rand_int(0, SIGNS.length - 1)],
        },
        {
          'display_type': 'boost_percentage',
          'trait_type': 'Coolness',
          'value': Math.floor(Math.random() * 50) + 50,
        },
        {
          'display_type': 'boost_percentage',
          'trait_type': 'Freshness',
          'value': Math.floor(Math.random() * 50) + 50,
        },
        {
          'display_type': 'boost_number',
          'trait_type': 'Caffeine Value',
          'value': Math.floor(Math.random() * 50) + 50,
        },
        {
          'display_type': 'number',
          'trait_type': 'Generation',
          'value': 1,
        },
      ]
    };

    const metadata = new Moralis.File("metadata.json", {
      base64: btoa(JSON.stringify(nftMetadata)),
    });
    await metadata.saveIPFS({useMasterKey: true});
  
    const tokenID = i;
    const price = ethers.utils.parseEther('0.0' + i);
    const uri = metadata.ipfs();
    const nftData = { tokenID, price, uri };
    console.log(await owner.getChainId());
    const signature = await owner._signTypedData(
      {
        name: 'BmDev',
        version: '1.0',
        chainId: await owner.getChainId(),
        verifyingContract: '0x571b7fF9779566C6c71Ba154D91884B7022b5131',
      },
      {
        SignedNFTData: [
          {name: 'tokenID', type: 'uint256'},
          {name: 'price', type: 'uint256'},
          {name: 'uri', type: 'string'},
        ]
      },
      nftData
    );
    console.log(signature);
    console.log(nftData);
  }
}


main().then(() => {
  process.exit(0);
}).catch((error) => {
  console.error(error);
  process.exit(1);
})
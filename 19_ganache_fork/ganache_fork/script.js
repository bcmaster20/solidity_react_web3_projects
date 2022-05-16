const Web3 = require('web3');
const daiAbi = require('./abi.js');

const recipientAddress = "0x927c22BC93Bb171dDB28d7096502e4e202A2ACB6";
const unlockedAddress = "0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503";
const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; 

const web3 = new Web3('http://localhost:8545'); 
const dai = new web3.eth.Contract(
  daiAbi,
  daiAddress
);

async function run() {
  let unlockedBalance, recipientBalance;

  ([unlockedBalance, recipientBalance] = await Promise.all([
    dai.methods
      .balanceOf(unlockedAddress)
      .call(),
    dai.methods
      .balanceOf(recipientAddress)
      .call()
  ]));
  console.log(`Balance unlocked: ${unlockedBalance}`);
  console.log(`Balance recipient: ${recipientBalance}`);

  await dai.methods
    .transfer(recipientAddress, 1000)
    .send({from: unlockedAddress});

  ([unlockedBalance, recipientBalance] = await Promise.all([
    dai.methods
      .balanceOf(unlockedAddress)
      .call(),
    dai.methods
      .balanceOf(recipientAddress)
      .call()
  ]));
  console.log(`Balance unlocked: ${unlockedBalance}`);
  console.log(`Balance recipient: ${recipientBalance}`);
}

run();
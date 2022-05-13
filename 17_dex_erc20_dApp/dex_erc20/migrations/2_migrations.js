const Dai = artifacts.require("Dai");
const Link = artifacts.require("Link");
const Comp = artifacts.require("Comp");

const Dex = artifacts.require("Dex");

const toWei = (number) => web3.utils.toWei(web3.utils.toBN(number), 'ether');

module.exports = async function (deployer){
  await deployer.deploy(Dai, "Dai", "DAI", toWei(10**10));
  const dai = await Dai.deployed();
  console.log("Rinkeby Dai: ", dai.address);

  await deployer.deploy(Link, "Chainlink", "LINK", toWei(10**6));
  const link = await Link.deployed();
  console.log("Rinkeby Link: ", link.address);

  await deployer.deploy(Comp, "Compound", "COMP", toWei(10**4));
  const comp = await Comp.deployed();
  console.log("Rinkeby Comp: ", comp.address);

  await deployer.deploy(Dex, [dai.address, link.address, comp.address]);
  const dex = await Dex.deployed();
  console.log("Rinkeby Dex: ", dex.address);  

  await dai.transfer(dex.address, toWei(10**10));
  await link.transfer(dex.address, toWei(10**6));
  await comp.transfer(dex.address, toWei(10**4));
}
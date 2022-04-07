const VendingMachine = artifacts.require("VendingMachine");

contract("VendingMachine", (accounts) => {
   before(async ()=> {
    instance = await VendingMachine.deployed();
   });
   
   it('ensures that the starting balance of the vending machine is 100', async () => {
    let balance = await instance.getVendingMachineBalance();
    assert.equal(balance, 100, 'The initial balance should be 100 dunuts.');
   });

   it('ensures the balance of the vending machine can be updated', async () => {
    await instance.restock(100);
    let balance = await instance.getVendingMachineBalance();
    assert.equal(balance, 200, 'The balance should be 200 dunuts.');
   });

   it('allows donuts to be purchased', async () => {
    await instance.purchase(1, { from: accounts[0], value: web3.utils.toWei('2', 'ether')});
    let balance = await instance.getVendingMachineBalance();
    assert.equal(balance, 199, 'The balance should be 200 dunuts.');
    // assert.equal(balance, 200, 'The balance should be 200 dunuts.');
   });
});
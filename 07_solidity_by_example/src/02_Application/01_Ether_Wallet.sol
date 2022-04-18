// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// ■ Ether Wallet
// An example of a basic wallet.
// ・Anyone can send ETH.
// ・Only the owner can withdraw.

// ■ Run
// ・Deploy
// ・Call Low Level Function with owner

contract EtherWallet {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable {}

    function withdraw(uint _amount) external {
        require(msg.sender == owner, "caller is not owner");
        payable(msg.sender).transfer(_amount);
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}
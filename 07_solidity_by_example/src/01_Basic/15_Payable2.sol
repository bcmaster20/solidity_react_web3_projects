// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Payable2 {
    address payable owner; // transfer, send, call
    address oldOwner;

    function sendMoney() public {
        owner.transfer(10);
        // oldOwner.transfer(10); // fail
    }

    // 2. payable(<address>)
    function makeItPayable() public {
        payable(oldOwner).transfer(10); // address payable
    }

    // 3 payable modifier
    function deposit() public payable {

    }

    /*********************
    *   contract.deposit() {
    *       from: account1, 
    *       to: contract.address,
    *       value: 10
    *   }
    **********************/

}
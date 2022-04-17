// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Variables {
    // State variables are stored on the blockchain.
    string public text = "Hello";
    uint public num = 123;

    function doSomething() public {
        // Local variables are not saved to the blockchain.
        uint i = 456;

        // Here are some global variables
        uint timestamp = block.timestamp; // Current block timestamp
        address sender = msg.sender; // address of the caller
    }
}


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract GlobalVariables {
    function globalVars() external view returns(address, uint, uint) {
        address sender = msg.sender;
        uint timestamp = block.timestamp; // Current block timestamp
        uint blockNum = block.number; // Current block timestamp
        return (sender, timestamp, blockNum);
    }
}



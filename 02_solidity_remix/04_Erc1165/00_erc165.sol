// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
//=> bytes4: 0xd48e638a
interface ITest {
    function getCreator(uint name) external returns (uint);
}
contract Test is ITest {
    bytes4 public constant IID_ITEST = type(ITest).interfaceId;   
    
    function getCreator(uint name) external pure override returns (uint) {
        return name;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
interface ITest {
    function getCreator(uint name2) external returns (uint);
}
contract Test is ITest {
    bytes4 public constant IID_ITEST = type(ITest).interfaceId;   
    
    function getCreator(uint name2) external pure override returns (uint) {
        return name2;
    }
}
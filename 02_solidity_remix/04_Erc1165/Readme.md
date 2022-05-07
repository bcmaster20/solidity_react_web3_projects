# Solidity get interface id and ERC165
[Here](https://nhancv.medium.com/solidity-get-interface-id-and-erc165-190f0e2e3a9)

## ERC165 basic
To get interface id, use
```shell
type(ITest).interfaceId
```
Remember interfaceId = xor of all selectors (methods) name and param type, don't care to return type

- Return zero with empty interface
- Return same id with difference return type
- Return same id with difference param name

```shell
interface ITest {
    function getCreator(uint name) external returns (uint);
}
contract Test is ITest {
    bytes4 public constant IID_ITEST = type(ITest).interfaceId;   
    
    function getCreator(uint name) external pure override returns (uint) {
        return name;
    }
}
```

## MockERC1155
```
// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MockERC1155 is ERC1155 {
  constructor() public ERC1155("https://nhancv.com/{id}.json") {
    mint(msg.sender, 0, 1);
  }

  function mint(
    address account,
    uint256 id,
    uint256 amount
  ) public {
    _mint(account, id, amount, "");
  }
}
```

## MockERC721
```shell
// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
contract MockERC721 is ERC721 {
  constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
    mint(msg.sender, 0);
  }
function mint(address account, uint256 id) public {
    _mint(account, id);
  }
  
  /**
   * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
   * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
   * by default, can be overriden in child contracts.
   */
  function _baseURI() internal pure override returns (string memory) {
    return "https://nhancv.com";
  }
}
```

## Combine with ERC165
```shell
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
interface ITest {
    function isERC1155(address nftAddress) external returns (bool);
    function isERC721(address nftAddress) external returns (bool);
}
contract Test is ITest, IERC165 {
    using ERC165Checker for address;
    bytes4 public constant IID_ITEST = type(ITest).interfaceId;
    bytes4 public constant IID_IERC165 = type(IERC165).interfaceId;
    bytes4 public constant IID_IERC1155 = type(IERC1155).interfaceId;
    bytes4 public constant IID_IERC721 = type(IERC721).interfaceId;
    
    function isERC1155(address nftAddress) external view override returns (bool) {
        return nftAddress.supportsInterface(IID_IERC1155);
    }    
    
    function isERC721(address nftAddress) external view override returns (bool) {
        return nftAddress.supportsInterface(IID_IERC721);
    }
    
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == IID_ITEST || interfaceId == IID_IERC165;
    }
}
```
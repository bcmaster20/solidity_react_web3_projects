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
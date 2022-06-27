// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";


contract BmDevNFT is ERC721URIStorage, Ownable, EIP712 {

  struct BmSignedNFTData {
    uint256 tokenID;
    uint256 price;
    string uri;
  }

  constructor() ERC721("BmDevNFT", "BmDev") EIP712("BmDev", "1.0") {}

  function lazyMintNFT(
      BmSignedNFTData calldata nft, bytes calldata signature
  ) public payable returns (uint256) {
    require(msg.value == nft.price, 'BmNFT: Message value != price');
    require(_validateSignature(_hash(nft), signature), 'BmNFT: Invalid signature');

    _safeMint(_msgSender(), nft.tokenID);
    _setTokenURI(nft.tokenID, nft.uri);
    Address.sendValue(payable(owner()), msg.value);

    return nft.tokenID;
  }

  function _hash(
      BmSignedNFTData calldata nft
  ) internal view returns (bytes32) {
    bytes32 digest = _hashTypedDataV4(
        keccak256(
            abi.encode(
                keccak256("BmSignedNFTData(uint256 tokenID,uint256 price,string uri)"),
                nft.tokenID, nft.price, keccak256(bytes(nft.uri))
    )));
    return digest;
  }

  function _validateSignature(bytes32 digest, bytes memory signature) internal view returns (bool) {
    address signer = ECDSA.recover(digest, signature);
    return (owner() == signer);
  }
}
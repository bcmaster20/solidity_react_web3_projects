// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleTreeExample {
    // --- PROPERTIES ---- //

    // Calculated from `merkle_tree.js`
    bytes32 public merkleRoot =
        0x493ae09ba571a3a4f6c61e0804cc297773235d15e726f0335ccc04173ebec5db;

    mapping(address => bool) public whitelistClaimed;

    // --- FUNCTIONS ---- //

    function whitelistMint(bytes32[] calldata _merkleProof) public {
        require(!whitelistClaimed[msg.sender], "Address already claimed");
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(
            MerkleProof.verify(_merkleProof, merkleRoot, leaf),
            "Invalid Merkle Proof."
        );
        whitelistClaimed[msg.sender] = true;
    }
}

/*
    Pass this array in for 'bytes32[] calldata _merkleProof' to whitelistMint()
    👋 CHANGE SINGLE QUOTES TO DOUBLE QUOTES 
        '0Xaddr' -> "0xaddr"
    [
        "0x702d0f86c1baf15ac2b8aae489113b59d27419b751fbf7da0ef0bae4688abc7a",
        "0xb159efe4c3ee94e91cc5740b9dbb26fc5ef48a14b53ad84d591d0eb3d65891ab"
    ]
*/
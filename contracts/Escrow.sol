// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC721 {
  function transferFrom(
    address _from,
    address _to,
    uint256 _id
  ) external;
}

contract Escrow {
    address public nftaddress;
    address public consumer;
    address payable public prosumer;

    constructor(address _nftaddress, address _consumer, address payable _prosumer) {
        nftaddress = _nftaddress;
        consumer = _consumer;
        prosumer = _prosumer;
    }
}


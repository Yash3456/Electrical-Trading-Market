// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract EnergyTrading is ERC721URIStorage {
   uint256 private _nextTokenId;

   struct Trade{
    address seller;
    uint256 EnrgyAmount;
    string EnrgyType;
    uint256 Price;
   }

   mapping (uint256 => Trade) public trades;
 
   constructor() ERC721("EnergyTrading", "ET") {}

   function mint(string memory EnergyType, uint256 EnergyAmount, uint256 Price) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(msg.sender, tokenId);

         trades[tokenId] = Trade({
            seller: msg.sender,
            EnrgyAmount: EnergyAmount,
            EnrgyType: EnergyType,
            Price: Price
        });

   }

   function TotalBids () public view returns (uint256) {
        return _nextTokenId;
   }

}

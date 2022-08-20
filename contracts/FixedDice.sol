// SPDX-License-Identifier: BEER-WARE
pragma solidity ^0.8.9;

contract FixedDice {

  mapping(address => string) public names;
  mapping(address => uint) public totalWins;

  uint public constant entryFee = 0.1 ether;

  function register(string memory name) public {
    names[msg.sender] = name;
  }

  function rollDice(uint guess) public payable {

    require(msg.sender.code.length == 0, "No contracts!");
    require(bytes(names[msg.sender]).length != 0, "Register first");
    require(msg.value == entryFee, "Invalid entry fee amount");

    uint seed = uint(blockhash(block.number - 1)) % uint160(msg.sender);
    uint winning = seed % 100;

    if (winning == guess) {
      (bool ok, /* bytes data */) = msg.sender.call{value : 1 ether}("");
      require(ok, "Transfer failed");
    }
  }

  function fund() public payable {}

}

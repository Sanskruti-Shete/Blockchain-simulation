// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Crowdfunding {
    mapping(address => uint256) public balances;
    event Invest(address indexed investor, uint256 amount);

    function invest() external payable {
        require(msg.value > 0, "Must send ETH");
        balances[msg.sender] += msg.value;
        emit Invest(msg.sender, msg.value);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RedToken is IERC20, ERC20 {
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {}
}

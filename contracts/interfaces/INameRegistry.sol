//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface INameRegistry {
    function register(string calldata) external payable;
}

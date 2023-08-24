//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface INameRegistry {
    error InvalidTarget();

    function register(string calldata) external payable;
}

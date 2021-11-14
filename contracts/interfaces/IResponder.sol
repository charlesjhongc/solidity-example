//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IResponder {
    function callSuccess() external pure returns (string memory);

    function callRevert() external pure;
}

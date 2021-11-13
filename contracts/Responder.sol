//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.10;

contract Responder {
    constructor() {}

    receive() external payable {}

    fallback() external payable {}

    function callSuccess() public pure returns (string memory) {
        return "call success";
    }

    function callRevert() public pure {
        revert("Doomed to revert");
    }
}

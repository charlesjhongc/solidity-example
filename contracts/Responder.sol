// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "./interfaces/IResponder.sol";

contract Responder is IResponder {
    constructor() {}

    receive() external payable {}

    fallback() external payable {}

    function callSuccess() external pure returns (string memory) {
        return "call success";
    }

    function callRevert() external pure {
        revert("Doomed to revert");
    }
}

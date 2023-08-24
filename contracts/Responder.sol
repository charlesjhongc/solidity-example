// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import { IResponder } from "./interfaces/IResponder.sol";

contract Responder is IResponder {
    error DoomedRevert();

    constructor() {
        // avoid empty block
        msg.sender;
    }

    receive() external payable {}

    fallback() external payable {}

    function callSuccess() external pure returns (string memory) {
        return "call success";
    }

    function callRevert() external pure {
        revert DoomedRevert();
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

abstract contract Version {
    string public version;

    constructor(string memory _version) {
        version = _version;
    }

    function setVersion(string calldata _version) public {
        version = _version;
    }
}

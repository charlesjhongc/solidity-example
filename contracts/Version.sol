//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

abstract contract Version {
    string public version;

    constructor(string memory _version) {
        version = _version;
    }

    function setVersion(string calldata _version) public {
        version = _version;
    }
}

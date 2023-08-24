// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import { Address } from "@openzeppelin/contracts/utils/Address.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Version } from "./Version.sol";
import { INameRegistry } from "./interfaces/INameRegistry.sol";
import { IResponder } from "./interfaces/IResponder.sol";

contract NameRegistry is INameRegistry, Version, Ownable {
    using Address for address;

    mapping(address userAddr => string userName) public nameMap;
    uint256 private recordCount;
    IResponder private callTarget;

    constructor() Version("v1.0.0") Ownable() {
        recordCount = 0;
    }

    receive() external payable {}

    fallback() external payable {}

    function register(string calldata _name) external payable override onlyOwner {
        nameMap[msg.sender] = _name;
        recordCount += 1;
    }

    function setResponder(address _target) external {
        if (!_target.isContract()) revert InvalidTarget();
        callTarget = IResponder(payable(_target));
    }
}

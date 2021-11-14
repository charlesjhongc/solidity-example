//SPDX-License-Identifier: Unlicense
// FIXME license

pragma solidity 0.8.10;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Version.sol";
import "./interfaces/INameRegistry.sol";
import "./interfaces/IResponder.sol";

contract NameRegistry is INameRegistry, Version, Ownable {
    using Address for address;

    mapping(address => string) public nameMap;
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
        require(_target.isContract(), "invalid target address");
        callTarget = IResponder(payable(_target));
    }
}

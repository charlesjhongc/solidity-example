// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.21;

import { Test, console } from "forge-std/Test.sol";
import { NameRegistry } from "../contracts/NameRegistry.sol";

contract NameRegistryTest is Test {
    NameRegistry public nameReg;

    function setUp() public {
        nameReg = new NameRegistry();
    }

    function test_register() public {
        nameReg.register("John");
        assertEq(nameReg.nameMap(address(this)), "John");
    }
}

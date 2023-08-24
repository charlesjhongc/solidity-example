import { ethers } from "hardhat"

export async function getInterface() {
    const iface = new ethers.utils.Interface([
        // Constructor
        "constructor(string symbol, string name)",

        // State mutating method
        "function transferFrom(address from, address to, uint amount)",

        // State mutating method, which is payable
        "function mint(uint amount) payable",

        // Constant method (i.e. "view" or "pure")
        "function balanceOf(address owner) view returns (uint)",

        // An Event
        "event Transfer(address indexed from, address indexed to, uint256 amount)",

        // A Custom Solidity Error
        "error AccountLocked(address owner, uint256 balance)",

        // Examples with structured types
        "function addUser(tuple(string name, address addr) user) returns (uint id)",
        "function addUsers(tuple(string name, address addr)[] user) returns (uint[] id)",
        "function getUser(uint id) view returns (tuple(string name, address addr) user)",
    ])

    return iface
}

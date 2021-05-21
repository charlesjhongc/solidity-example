pragma solidity ^0.6.0;

contract Hello {
    address owner
    string greet;

    constructor() public {
        owner = msg.sender;
    }

    function setGreet(string _greet) external {
        greet = _greet;
    }
}

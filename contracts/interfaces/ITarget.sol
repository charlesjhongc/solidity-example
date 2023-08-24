//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface ITarget {
    struct Order {
        address takerAddr;
        address makerAddr;
        address takerAssetAddr;
        address makerAssetAddr;
        uint256 takerAssetAmount;
        uint256 makerAssetAmount;
        address receiverAddr;
        uint256 salt;
        uint256 deadline;
        uint256 feeFactor;
    }

    event Upgrade(address indexed implementation);

    event FillOrder(
        string source,
        bytes32 indexed transactionHash,
        bytes32 indexed orderHash,
        address indexed userAddr,
        address takerAssetAddr,
        uint256 takerAssetAmount,
        address makerAddr,
        address makerAssetAddr,
        uint256 makerAssetAmount,
        address receiverAddr,
        uint256 settleAmount,
        uint16 feeFactor
    );

    function fill(Order memory _order, bytes memory _mmSignature, bytes memory _userSignature) external payable returns (uint256);

    function toRFQ(bytes calldata _payload) external;
}

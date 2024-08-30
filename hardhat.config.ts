import "dotenv/config"
import "@nomiclabs/hardhat-waffle"
import "@nomicfoundation/hardhat-foundry"

// This adds support for typescript paths mappings
import "tsconfig-paths/register"

const ALCHEMY_TOKEN = process.env.ALCHEMY_TOKEN || ""

module.exports = {
    networks: {
        hardhat: {
            forking: {
                chainId: 1,
                url: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_TOKEN}`,
                blockNumber: 17287570,
            },
        },
        mainnet: {
            chainId: 1,
            url: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_TOKEN}`,
        },
        sepolia: {
            chainId: 11155111,
            url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_TOKEN}`,
        },
    },
    solidity: {
        settings: {
            remappings: [
                "@openzeppelin/=lib/openzeppelin-contracts/",
                "@forge-std/=lib/forge-std/src/",
            ],
        },
        compilers: [
            {
                version: "0.8.21",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000,
                    },
                },
            },
        ],
    },
}

import "@nomiclabs/hardhat-waffle"

// This adds support for typescript paths mappings
import "tsconfig-paths/register"

const accounts = {
    mnemonic: process.env.MNEMONIC || "test test test test test test test test test test test junk",
}
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""

module.exports = {
    networks: {
        hardhat: {
            chainId: 1,
            accounts,
            forking: {
                url: "",
                blockNumber: 12650600,
            },
        },
        mainnet: {
            chainId: 1,
            url: "",
            accounts,
        },
        goerli: {
            chainId: 5,
            url: "",
            accounts,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    solidity: {
        compilers: [
            {
                version: "0.7.4",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000,
                    },
                },
            },
            {
                version: "0.6.12",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000,
                    },
                },
            },
        ],
    },
    mocha: {
        timeout: 600000,
    },
}

import "dotenv/config"
import "@nomiclabs/hardhat-waffle"

// This adds support for typescript paths mappings
import "tsconfig-paths/register"

const accounts = {
    mnemonic: process.env.MNEMONIC || "test test test test test test test test test test test junk",
}
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const ALCHEMY_ETHEREUM_MAINNET_TOKEN = process.env.ALCHEMY_ETHEREUM_MAINNET_TOKEN || ""

module.exports = {
    networks: {
        hardhat: {
            chainId: 1,
            accounts,
            forking: {
                url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_ETHEREUM_MAINNET_TOKEN}`,
                blockNumber: 12650600,
            },
        },
        mainnet: {
            chainId: 1,
            url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_ETHEREUM_MAINNET_TOKEN}`,
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
                version: "0.8.10",
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

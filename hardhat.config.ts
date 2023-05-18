import "dotenv/config"
import "@nomiclabs/hardhat-waffle"

// This adds support for typescript paths mappings
import "tsconfig-paths/register"

const ALCHEMY_ETHEREUM_MAINNET_TOKEN = process.env.ALCHEMY_ETHEREUM_MAINNET_TOKEN || ""
const ALCHEMY_ETHEREUM_GOERLI_TOKEN = process.env.ALCHEMY_ETHEREUM_GOERLI_TOKEN || ""

module.exports = {
    networks: {
        hardhat: {
            forking: {
                url: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ETHEREUM_MAINNET_TOKEN}`,
                blockNumber: 17287570,
            },
        },
        mainnet: {
            url: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ETHEREUM_MAINNET_TOKEN}`,
        },
        goerli: {
            url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_ETHEREUM_GOERLI_TOKEN}`,
        },
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
}

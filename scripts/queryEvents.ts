import { ethers } from "hardhat"
import { logger } from "~/scripts/utils"

const contractAddr = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"

async function main() {
    const contract = await getContractUsingName()

    // get event if to address is one of these two
    const toAddr1 = "0xa2327a938Febf5FEC13baCFb16Ae10EcBc4cbDCF"
    const toAddr2 = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
    const filter = contract.filters.Transfer(null, [toAddr1, toAddr2])
    const events = await contract.queryFilter(filter, -2, "latest")

    for (var event of events) {
        await printEvent(event)

        // example of using args
        // logger.info(event.args!.from)

        // or get the tx data and decode it
        const tx = await ethers.provider.getTransaction(event.transactionHash)
        const calldata = contract.interface.decodeFunctionData("toRFQ", tx.data)
    }
}

// Best case
// Write interface in Solidity, easy to handle nested struct
// and then get contract ABI using name
async function getContractUsingName() {
    // getContractAt is a function from hardhat, not pure ethers
    const contract = await ethers.getContractAt("ITarget", contractAddr)
    return contract
}

async function getContractUsingABI() {
    const eventABI = [
        // ERC20
        "event Transfer(address indexed from, address indexed to, uint256 value)",
        "event Approval(address indexed owner, address indexed spender, uint256 value)",

        "event Upgrade(address indexed implementation)",
        "event SetOptimisticTimeout(uint256 timeout)",
        "event SetPermission(bytes32 storageId, address role, bool enabled)",
    ]

    const contract = new ethers.Contract(contractAddr, eventABI, ethers.provider)
    return contract
}

async function printEvent(event) {
    logger.info("===== Event =====")
    var i = 0
    for (var argKey in event.args) {
        // workaround
        if (i < event.args.length) {
            i++
            continue
        }
        logger.info(`${argKey} : ${event.args[argKey].toString()}`)
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

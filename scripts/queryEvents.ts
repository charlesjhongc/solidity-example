import { ethers } from "hardhat"
import { logger } from "~/scripts/utils"

const eventABI = [
    // ERC20
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "event Approval(address indexed owner, address indexed spender, uint256 value)",

    "event Upgrade(address indexed implementation)",
    "event SetOptimisticTimeout(uint256 timeout)",
    "event SetPermission(bytes32 storageId, address role, bool enabled)",
]
const contractAddr = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"

async function main() {
    const contract = new ethers.Contract(contractAddr, eventABI, ethers.provider)
    const filter = contract.filters.Transfer()
    const events = await contract.queryFilter(filter, -2, "latest")

    for (var event of events) {
        await printEvent(event)

        // example of using args
        // logger.info(event.args!.from)
    }
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

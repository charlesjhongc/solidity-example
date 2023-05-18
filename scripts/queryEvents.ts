import { ethers } from "hardhat"
import { logger } from "~/scripts/utils"

const eventABI = [
    "event Upgrade(address indexed implementation)",
    "event SetOptimisticTimeout(uint256 timeout)",
    "event SetPermission(bytes32 storageId, address role, bool enabled)",
]
const contractAddr = "0x6D9Cc14a1d36E6fF13fc6efA9e9326FcD12E7903"

async function main() {
    const contract = new ethers.Contract(contractAddr, eventABI, ethers.provider)
    const filter = contract.filters.SetPermission()
    const events = await contract.queryFilter(filter, 11463007, "latest")
    for (var event of events) {
        if (
            event.args!.storageId ==
            "0x808188d002c47900fbb4e871d29754afff429009f6684806712612d807395dd8"
        ) {
            logger.info(event)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

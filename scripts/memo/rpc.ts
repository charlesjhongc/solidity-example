import { ethers } from "hardhat"
import { logger } from "~/scripts/utils"

async function main() {
    const provider = ethers.provider

    // get all account addresses managed by this provider
    const accounts = await provider.listAccounts()
    logger.info(accounts)

    // get signer instance managed by this provider
    // param addressOrIndex is optional (default account#0)
    const signer = provider.getSigner(1)
    logger.info(await signer.getAddress())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

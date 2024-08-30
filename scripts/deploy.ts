import { ethers, network } from "hardhat"
import { logger } from "~/scripts/utils"

const contractName = "Responder"

async function main() {
    const deployer = await getDeployer()

    const contractFactory = await ethers.getContractFactory(contractName, deployer)
    const constructorArgs = []
    const contract = await contractFactory.deploy(...constructorArgs)
    logger.info(contract.interface.format(ethers.utils.FormatTypes.json))
    const deployed = await contract.deployed()
    logger.info(`${contractName} contract address: ${contract.address}`)
    const abi = deployed.interface.format(ethers.utils.FormatTypes.json)
    logger.info(`ABI : ${abi}`)

    // Verify contract
    const verifyCmd = `forge verify-contract --chain ${network.config.chainId} --watch ${
        contract.address
    } contracts/${contractName}.sol:${contractName} --constructor-args ${contractFactory.interface.encodeDeploy(
        constructorArgs,
    )}`
    logger.info("Verify contract using following cmd")
    logger.info(verifyCmd)
}
async function getDeployer() {
    const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY
    if (deployerPrivateKey === undefined) throw Error("Deployer private key not provided")

    const deployer = new ethers.Wallet(deployerPrivateKey, ethers.provider)
    return deployer
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

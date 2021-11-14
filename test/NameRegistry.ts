import { Signer } from "ethers"
import { ethers } from "hardhat"

describe("Test NameRegistry contract", () => {
    let operator: Signer
    let nameRegContract
    let responderContract

    before(async () => {
        ;[operator] = await ethers.getSigners()

        // Deploy Responder contract
        responderContract = await (await ethers.getContractFactory("Responder", operator)).deploy()

        // Deploy NameRegistry contract
        nameRegContract = await (await ethers.getContractFactory("NameRegistry", operator)).deploy()
    })

    describe("Fallback/Receive", () => {
        it("receive()", async () => {
            await operator.sendTransaction({
                to: nameRegContract.address,
                value: ethers.utils.parseUnits("10"),
            })
        })
    })

    describe("register()", () => {
        it("Register name", async () => {
            await nameRegContract.register("Jack")
        })
    })

    describe("setResponder()", () => {
        it("Set responder", async () => {
            await nameRegContract.setResponder(responderContract.address)
        })
    })
})

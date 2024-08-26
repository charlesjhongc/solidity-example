import { Signer } from "ethers"
import { ethers } from "hardhat"

describe("Test NameRegistry contract", () => {
    let owner: Signer
    let nameRegContract
    let responderContract

    before(async () => {
        ;[owner] = await ethers.getSigners()

        // Deploy Responder contract
        responderContract = await (await ethers.getContractFactory("Responder", owner)).deploy()

        // Deploy NameRegistry contract
        nameRegContract = await (await ethers.getContractFactory("NameRegistry", owner)).deploy()
    })

    describe("Fallback/Receive", () => {
        it("receive()", async () => {
            await owner.sendTransaction({
                to: nameRegContract.address,
                value: ethers.utils.parseUnits("10"),
            })
        })
    })

    describe("register()", () => {
        it("Register name", async () => {
            await nameRegContract.connect(owner).register("Jack")
        })
    })

    describe("setResponder()", () => {
        it("Set responder", async () => {
            await nameRegContract.setResponder(responderContract.address)
        })
    })
})

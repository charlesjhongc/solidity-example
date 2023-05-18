import { Buffer } from "buffer"
import * as ethers from "ethers"
import BN from "bn.js"
import { hasHexPrefix } from "./hexString"

/**
 *  A general class handling blob type conversion.
 */
export class BLOB {
    private data: Buffer

    static fromHexString(hexStr: string): BLOB {
        return new BLOB(hexStrToBuffer(hexStr))
    }

    static fromBN(bn: BN): BLOB {
        return new BLOB(bn.toBuffer())
    }

    constructor(data: Buffer) {
        this.data = data
    }

    public bytesCount(): number {
        return this.data.length
    }

    public toBuffer(): Buffer {
        return this.data
    }

    public toHexString(): string {
        // ethers lib will inlcude the 0x prefix
        return ethers.utils.hexlify(this.data)
    }

    public toString(): string {
        // support easy logging
        return this.toHexString()
    }

    public toHexStringNoPrefix(): string {
        // Buffer.toString() will not include the 0x prefix
        return this.data.toString("hex")
    }

    public toBN(): BN {
        // BN accept Buffer and the default base for Buffer type is 16
        return new BN(this.data)
    }

    public isEqual(target: BLOB): boolean {
        return Buffer.compare(this.data, target.toBuffer()) === 0
    }
}

export function hexStrToBuffer(input: string): Buffer {
    let modifiedInput: string = input
    if (hasHexPrefix(input)) {
        // remove 0x prefix so the following procedure can be done
        modifiedInput = input.substring(2)
    }

    // calculate the actual number of bytes it represents
    let bytesCount
    if (modifiedInput.length % 2 === 1) {
        bytesCount = (modifiedInput.length + 1) / 2
    } else {
        bytesCount = modifiedInput.length / 2
    }

    // hexZeroPad makes sure the hex string has even number of nibbles (add zero paddind if needed),
    const formattedHexStr = ethers.utils.hexZeroPad("0x" + modifiedInput, bytesCount)

    if (!ethers.utils.isHexString(formattedHexStr)) {
        throw new Error("Not a valid hex string")
    }

    // stripZeros is needed to produce buffers with same length if redundant zeros exists
    return Buffer.from(ethers.utils.stripZeros(formattedHexStr))
}

import assert from "assert"
import * as ethers from "ethers"

/**
 * Checks that the string str start with '0x'.
 */
export function hasHexPrefix(str: string) {
    return str.substring(0, 2) === "0x"
}

/**
 * Checks that the string str starts with '0x' and has 32 bytes.
 */
export function hasHexPrefix32Bytes(str: string) {
    return hasHexPrefix(str) && str.length === 66
}

/*
 *  Checks two hex string is equal or not.
 */
export function isHexStringEqual(a: string, b: string): boolean {
    return pad32(a) === pad32(b)
}
/*
 * Left-pad input hash to 32 bytes with '0x' prefix
 */
export function pad32(hash: string): string {
    assert(hash.length <= 66, `Length of hash to pad32 must be less than or equal to 66: ${hash}`)
    if (!hasHexPrefix(hash)) {
        assert(
            hash.length <= 64,
            `Hash to pad32 has length ${hash.length} but not prefixed with 0x: ${hash} `,
        )
        // Add hex prefix if it does not have one
        hash = "0x" + hash
    }
    return ethers.utils.hexZeroPad(hash, 32)
}

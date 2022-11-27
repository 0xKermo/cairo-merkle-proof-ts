import { toBN } from "starknet/utils/number";
import { merkleRoot,addressesToLeaf, merkleProof, merkleVerify, hash2 } from "../../../../../Belgeler/graphql-ts-tutorial/app/merkle/merkle";

const test = () => {
    const address = [
            "0x02Eb485E8Db90d01b8878f651634b7F0B9aFB3eF3B73aa567ED6a9715cAbC5B4",
            "0x03480b07F16D77CEbB23E14663BeC10C69047373a83B7aB18B7f525Bab2e3835",
            "0x067A7aF5D706AAF18f7A98D1F5b050c9ac89A9d1a33Ef85Dd75C9c8989F44a6F",
    ]
    const res = merkleRoot(addressesToLeaf(address))
    const leaf = hash2(toBN("0x03480b07F16D77CEbB23E14663BeC10C69047373a83B7aB18B7f525Bab2e3835"),toBN("0x03480b07F16D77CEbB23E14663BeC10C69047373a83B7aB18B7f525Bab2e3835"))
    const proof = merkleProof("0x067A7aF5D706AAF18f7A98D1F5b050c9ac89A9d1a33Ef85Dd75C9c8989F44a6F", address)
    const verify = merkleVerify(leaf,res,proof)
    console.log("verify",verify)
}

test()
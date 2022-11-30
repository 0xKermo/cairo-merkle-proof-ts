import BN from "bn.js"
import { pedersen } from "starknet/utils/hash"
import { toBN } from "starknet/utils/number";


export function hash2(x: BN, y: BN): string {
    if(x.lte(y)){
        return pedersen([x, y])

    }else{
        return pedersen([y, x])


    }
}

export function addressesToLeaf(address: string[]): string[] {
    return address.map((address, i) => {
        return hash2(toBN(address), toBN(address))
    })

}

export function merkleRoot(leafs: string[]): string {
    if (leafs.length === 1) {
        return leafs[0];
    }
    if (leafs.length % 2 === 1) {
        leafs.push(leafs[leafs.length-1]);
    }
    let nextLeafs: string[] = [];

    for (let i = 0; i < leafs.length; i += 2) {
        nextLeafs.push(hash2(toBN(leafs[i]), toBN(leafs[i + 1])))
    }  
    leafs = nextLeafs
    return merkleRoot(nextLeafs)

}

export function merkleProof(address: string, addresses: string[]): string[] {
    if (!addresses.includes(address)) {
        throw new Error("Address not in addresses");
    }

    let leafs = addressesToLeaf(addresses)
    if (leafs.length % 2 === 1) {
        leafs.push(leafs[leafs.length - 1])
    }

    let index = addresses.indexOf(address)
    let proof: string[] = [];

    if (index % 2 === 0) {
        proof.push(leafs[index + 1]);
    } else {
        proof.push(leafs[index - 1]);
    }

    while (leafs.length > 1) {
        let nextLeafs: string[] = [];
        for (let i = 0; i < leafs.length; i += 2) {
            nextLeafs.push(hash2(toBN(leafs[i]), toBN(leafs[i + 1])))
        }
        leafs = nextLeafs;
        if(leafs.length === 1){
            break;
        }
        if (leafs.length % 2 === 1) {
            leafs.push(leafs[leafs.length - 1]);
        }
        index = Math.floor(index/ 2)
        if (index % 2 === 0) {
            proof.push(leafs[index + 1]);
        } else {
            proof.push(leafs[index - 1]);
        }
    }
    return proof
}

export function merkleVerify(leaf:string, root: string, proof:string[]) {
    if (proof.length === 0) {
        return leaf == root
    }
    return merkleVerify(hash2(toBN(proof[0]), toBN(leaf)), root, proof.slice(1, proof.length))
}   
const seedrandom = require("seedrandom");

function generateRandHexEncodedNamespaceID(seed) {
    const nID = new Uint8Array(8);
    const rng = seedrandom(seed);
    for (let i = 0; i < nID.length; i++) {
        nID[i] = Math.floor(rng() * 256);
    }
    return Array.from(nID).map(byte => byte.toString(16).padStart(2, '0')).join('').toString();
}

function generateRandMessage(seed) {
    const lenMsg = Math.floor(seedrandom(seed)() * 100);
    const msg = new Uint8Array(lenMsg);
    const rng = seedrandom(seed);
    for (let i = 0; i < msg.length; i++) {
        msg[i] = Math.floor(rng() * 256);
    }
    return Array.from(msg).map(byte => byte.toString(16).padStart(2, '0')).join('').toString();
}

const MAX_SAFE_INTEGER = Math.pow(2, 53) - 1; // Maximum safe integer in JavaScript
function createMessageAndNamespaceID(seed) {
    if(seed > MAX_SAFE_INTEGER) throw new RangeError("Your randomness factor input can not be bigger than Max Integer(9007199254740991)")
    const nID = generateRandHexEncodedNamespaceID(seed);
    const msg = generateRandMessage(seed);
    console.log(`My hex-encoded namespace ID: ${nID}\n\nMy hex-encoded message: ${msg}`);
    return {nID, msg}
}

createMessageAndNamespaceID(1234567)
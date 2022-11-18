import { generateKeyPairSync } from "crypto";

const generatesha256KeyPairs = ()=>{
    const keyPair = generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    });
    return keyPair;
}

export default generatesha256KeyPairs;
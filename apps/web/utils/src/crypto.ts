import {  privateDecrypt, publicEncrypt } from "crypto";

export const encryptKronoxSession = (session: string): string => {
    if (process.env.PUBLIC_ENCRYPTION_KEY == undefined)
        throw new Error("No public key found");
    
    const key = Buffer.from(process.env.PUBLIC_ENCRYPTION_KEY.replace(/\\n/gm, '\n') );
    const encrypted = publicEncrypt({
        key,
        oaepHash: "sha256",
    }, Buffer.from(session));
    return encrypted.toString('base64');
}
export const decryptKronoxSession = (session: string): string => {
    if (process.env.ENCRYPTION_KEY == undefined)
        throw new Error("No private key found");
    
    const key = Buffer.from(process.env.ENCRYPTION_KEY.replace(/\\n/gm, '\n'));
    const decrypted = privateDecrypt({
        key,
        oaepHash: "sha256",
    }, Buffer.from(session, 'base64'));

    return decrypted.toString('utf8');
    
}

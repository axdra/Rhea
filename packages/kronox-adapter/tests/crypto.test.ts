import { describe, expect, test } from '@jest/globals';
import { encryptKronoxSession, decryptKronoxSession, generatesha256KeyPairs } from '../src/crypto';

describe('Crypto Module', () => {
    const keypair = generatesha256KeyPairs();
    test('Encrypt no public key set in env', () => {
        expect(() => encryptKronoxSession("test")).toThrow();
    })
  
    test('Decrypt no private key set in env',()=>{
        expect(() => decryptKronoxSession("test")).toThrow();
    })

    test('Encrypt and decrypt session', () => {
        //set env variables
        process.env.PUBLIC_ENCRYPTION_KEY = keypair.publicKey;
        process.env.ENCRYPTION_KEY = keypair.privateKey;
        const encrypted = encryptKronoxSession('test');
        const decrypted = decryptKronoxSession(encrypted);
        expect(decrypted).toBe('test');
    });

});
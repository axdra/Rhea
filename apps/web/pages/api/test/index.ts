// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { decryptKronoxSession, encryptKronoxSession } from '../../../utils/src/crypto';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    
    //time how long it takes to run the function
    const start = Date.now();
    const toEncrypt = "SbIXFQLen-6kgA2XMw4rbFX8ZN_gsPxmOuIiFpou.kronoxprod";
    const encrypted = encryptKronoxSession(toEncrypt);
    const decrypted = decryptKronoxSession(encrypted);
    //end time
    const end = Date.now();
    //get the time it took to run the function
    const time = end - start;
    console.log("Time to run: " + time + "ms");
    res.status(200).json({ encrypted, decrypted })

        
        

    
}

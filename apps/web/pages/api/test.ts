// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getSchema from '../../utils/getSchema';
import { GetUserBookings } from '../../utils/src/bookings';
import { decryptKronoxSession, encryptKronoxSession } from '../../utils/src/crypto';
import {KronoxLogin, KronoxPoll} from '../../utils/src/user'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    //time how long it takes to run the function
    const start = Date.now();
    const toEncrypt = "This is a test";
    const encrypted = encryptKronoxSession(toEncrypt);
    const decrypted = decryptKronoxSession(encrypted);
    //end time
    const end = Date.now();
    //get the time it took to run the function
    const time = end - start;
    console.log("Time to run: " + time + "ms");
    res.status(200).json({ encrypted, decrypted })

        
        

    
}

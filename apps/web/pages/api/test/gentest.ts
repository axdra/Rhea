// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import generatesha256KeyPairs from '../../../utils/crypto';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    
const keys = generatesha256KeyPairs();  
    res.status(200).json({ keys })

        
        

    
}

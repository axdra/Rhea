// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getSchema from '../../../utils/getSchema';
import { GetUserBookings } from 'kronox-adapter';
import {GetValidKronoxSession, KronoxLogin, KronoxPoll} from 'kronox-adapter'
import { updateKronoxSession } from '../../../utils/userutils';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    

    const auth = req.headers.authorization;
    if(!auth){
        res.status(401).json({error: "No auth header"})
        return;
    }
    GetValidKronoxSession(auth).then(async (user) => {
        res.status(200).json(user)
    }).catch(async (err) => {
        res.status(401).json({error: err})
    }
    )
    
}

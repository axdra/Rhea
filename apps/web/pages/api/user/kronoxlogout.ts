// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getSchema from '../../../utils/getSchema';
import { GetUserBookings } from 'kronox-adapter';
import {KronoxLogin, KronoxPoll} from 'kronox-adapter'
import { deleteKronoxSession, updateKronoxSession } from '../../../utils/userutils';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if(req.method === 'POST'){
        const auth = req.headers.authorization;
        if (!auth) {
            res.status(401).json({ error: "No auth header" })
            return;
        }
        deleteKronoxSession(auth).then(async (user) => {
            res.status(200).json(user)
        }
        ).catch(async (err) => {
            res.status(401).json({ error: err })
        }
        )

}
else{
    res.status(501)}
    
}

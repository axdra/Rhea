// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getSchema from '../../../utils/getSchema';
import { GetUserBookings } from 'kronox-adapter';
import {KronoxLogin, KronoxPoll} from 'kronox-adapter'
import { getKronoxSession, updateKronoxSession } from '../../../utils/userutils';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    if (req.method === 'GET') {
        
        const auth = req.headers.authorization;
        if (!auth) {
            res.status(401).json({ error: "No auth header" })
            return;
        }
        getKronoxSession(auth).then(async (user) => {
            res.status(200).json(user)
        }
        ).catch(async (err) => {
            res.status(401).json({ error: err })
        }
        )
    }

    if (req.method === 'POST') {
    
    KronoxLogin({
        username: req.body.username,
        password: req.body.password,

    }).then(async (user) => {
        if (user) {
            updateKronoxSession(user.token,req.headers.authorization ?? '');
            res.status(200).json(user)
        } else {
            res.status(401).json({ error: 'Not Authorized' });
        }
    }
    ).catch((err) => {
        res.status(401).json({ error: 'Not Authorized' });


    }
        
        
    )

}
else{
    res.status(501)}
    
}

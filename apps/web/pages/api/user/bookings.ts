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
    //create date string YY-MM-DD

    const date = new Date();
const dateString = new Date(date).getFullYear().toString().slice(-2) + "-" + (new Date(date).getMonth() + 1).toString().padStart(2, '0') + "-" + new Date(date).getDate().toString().padStart(2, '0');
    GetUserBookings(auth,"FLIK_0001",dateString).then(async (bookings) => {
        res.status(200).json(bookings)
    }).catch(async (err) => {
        res.status(401).json({error: err})
    }
    )
    
}

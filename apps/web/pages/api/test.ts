// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getSchema from '../../utils/getSchema';
import { GetUserBookings } from '../../utils/src/bookings';
import {KronoxLogin, KronoxPoll} from '../../utils/src/user'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    KronoxLogin({
        username: process.env.KRONOX_USERNAME ?? "",
        password: process.env.KRONOX_PASSWORD ?? "",
    }).then(async (user) => {
        const schema = await GetUserBookings(user.token,"FLIK_0001","22-11-07");
        res.status(200).json({ lol:schema, user: user })
    }
    ).catch((err) => {
        res.status(500).json(err)

    }
        
        
    )

    
}

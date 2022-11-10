// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { bookRoom } from '../../../utils/src/rooms';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const {session, flik, datum, room, timeSlot} = req.query;
    const booking = await bookRoom(session as string, flik as string,datum as string,room as string, Number.parseInt(timeSlot as string));
    console.log(booking);
    if(booking.ok){
        res.status(200).json(booking)
    }
    else{
        res.status(406).json(booking)
    }


        
}

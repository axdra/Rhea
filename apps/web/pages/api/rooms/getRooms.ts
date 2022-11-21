// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getRoomBookings } from 'kronox-adapter';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const {session, flik, datum} = req.query;
    const rooms = await getRoomBookings(session as string, flik as string, datum as string);
    res.status(200).json(rooms);

        
}

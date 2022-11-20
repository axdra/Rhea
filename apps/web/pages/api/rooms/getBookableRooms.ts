// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getBookableRooms, getRoomBookings } from '../../../utils/src/rooms';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const {session, flik} = req.query;
    const rooms = await getBookableRooms(session as string, flik as string);
    res.status(200).json(rooms);

        
}

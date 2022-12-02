// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { bookRoom, decryptKronoxSession } from 'kronox-adapter';
import { createClient } from '@supabase/supabase-js';
import { KronoxPoll } from 'kronox-adapter';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY
const authKey = process.env.UTILS_AUTH
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const auth = req.headers.authorization;

    if(auth !== authKey)
    {
        res.status(401).json("Unauthorized")
        return;
    }
    const supabase = createClient(supabaseUrl as string, supabaseSecretKey as string);

    supabase.from('kronox_future_room_bookings').select('kronox_user(*), roomid, location, timeslot, day').then((data: any) => {
    
        const bookings = data.data.map((booking: any) => {
            return booking
        }
        )
        bookings.forEach(async (booking: any) => {
            const session = decryptKronoxSession(booking.kronox_user.kronox_session)
           
            let day = new Date().getDay();
            if(day === booking.day){
                
                const date = new Date();
                date.setDate(date.getDate() + 7);
                const dateString =new Date(date).getFullYear().toString().slice(-2) + "-" + (new Date(date).getMonth() + 1).toString().padStart(2, '0') + "-" + new Date(date).getDate().toString().padStart(2, '0');

                const bookingRes = await bookRoom(session, booking.location, dateString ,booking.roomid,  booking.day, "MDU")
            }  

        }   
        )
    })
    res.status(200).json("Booked rooms")








}

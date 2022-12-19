// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { bookRoom, decryptKronoxSession } from 'kronox-adapter';
import { createClient } from '@supabase/supabase-js';
import { KronoxPoll } from 'kronox-adapter';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_SECRET_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing supabase environment variables')
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    supabase.auth.getUser(req.headers.authorization).then(data => {
        if (data.data.user?.aud === 'authenticated') {
            if (req.method === 'GET') {
              
                supabase.from('kronox_future_room_bookings').select().eq('kronox_user', data.data.user.id).then(cal => {
                    if (cal.data) {
                        res.status(200).json(cal.data)
                    } else {
                        res.status(404).json({ error: 'No bookings found' })
                    }
                })
            }
            if (req.method === 'POST') {
                console.log(req.body)
                const { room,  timeslot, day } = req.body
                supabase.from('kronox_future_room_bookings').insert([{ roomid:room, location:'FLIK_0001', timeslot, day, kronox_user: data.data.user.id }]).then(booking => {
                    if (booking.data) {
                        res.status(200).json(booking.data)
                    } else {
                        res.status(404).json({ error: 'No bookings found' })
                    }
                })
                
           
            }
          
        
            
            if (req.method === 'DELETE') {
                console.log(req.body)

                const {  timeslot, day } = req.body
                supabase.from('kronox_future_room_bookings').delete().eq('timeslot', timeslot).eq('day', day).eq('kronox_user', data.data.user.id).then(booking => {
                    if (booking.data) {
                        res.status(200).json(booking.data)
                    } else {
                        res.status(404).json({ error: 'No bookings found' })
                    }
                })
            }

        }
        else {
            res.status(401).json({ error: 'Not Authorized' })
        }
    });
    
    res.status(501)





}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'



export default function handler(
    req: NextApiRequest,
    res: NextApiResponse< any>
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
              
                supabase.from('personalcalendar').select().eq('userid', data.data.user.id).then(cal => {
                    if (cal.data) {
                        res.status(200).json(cal.data)
                    } else {
                        res.status(404).json({ error: 'No calendars found' })
                    }
                })
            }
            if (req.method === 'POST') {
             
                supabase.from('personalcalendar').insert({ 'userid': data.data.user.id, 'calendar': req.body }).then(cal => {
                    res.status(200).json(cal.data)
                }
                )
           
            }
          
        
            
            if (req.method === 'DELETE') {

                supabase.from('personalcalendar').delete().eq('userid', data.data.user.id ).eq( 'calendar', req.body).then(cal => {
                    res.status(200).json(cal.data)
                })
    
            }

        }
        else {
            res.status(401).json({ error: 'Not Authorized' })
        }
    });
    
    res.status(501)
 
}

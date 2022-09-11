// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'



export default function handler(
    req: NextApiRequest,
    res: NextApiResponse< any>
) {

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing supabase environment variables')
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    supabase.auth.getUser(req.headers.authorization).then(data => {
        if (data.data.user?.aud === 'authenticated') {
            if (req.method === 'GET') {
              
                supabase.from('PersonalCalendars').select().eq('userid', data.data.user.id).then(cal => {
                    res.status(200).json(cal.data)
                })
            }
            if (req.method === 'POST') {
             
                supabase.from('PersonalCalendars').insert({ 'userid': data.data.user.id, 'calendar': req.body }).then(cal => {
                    res.status(200).json(cal.data)
                }
                )
           
            }
          
        
            
            if (req.method === 'DELETE') {

                supabase.from('PersonalCalendars').delete().eq('userid', data.data.user.id ).eq( 'calendar', req.body).then(cal => {
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

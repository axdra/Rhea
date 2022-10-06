// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from '@supabase/supabase-js';
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next'
import getSchema from '../../../utils/getSchema';

const mapURL = process.env.NODE_ENV === "development" ? "localhost:3000" : process.env.NEXT_PUBLIC_PROD_URL;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

        
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_SECRET_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing supabase environment variables')
    }
    const events: any[] = []
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const user = await supabase.auth.getUser(req.headers.authorization);
    const userCalendars = await supabase.from('personalcalendar').select().eq('user_id', user.data.user?.id);
    const promises: any[] = []
    userCalendars?.data?.forEach((cal: any) => {
                promises.push(getSchema(cal.calendar))
        })
    Promise.all(promises).then((values) => {
        values.forEach((value: any) => {
            value.events.map((event:any) => {
                if(moment(event.start_time).isSame(moment(), 'day')){
                    events.push(event)
                }
            })
           
        })
    }).then(() => {
        res.status(200).json(events)
    })

        
    
}

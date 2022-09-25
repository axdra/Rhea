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
    const calendarCode = req.query.q;
    if (!calendarCode) {
        res.status(400).json({ error: 'Missing course code' })
    }
    if (!Array.isArray(calendarCode) && calendarCode) {
        
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_SECRET_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing supabase environment variables')
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
        const Rooms = await supabase.from('rooms').select('name');
        supabase.from('personalcalendar').select().eq('userid', calendarCode).then(userCalendarData => {
            const allEvents = userCalendarData.data?.map((calID:any) => {
                const promises:any = getSchema(calID.calendar).then((data: any) => {
                    return data.events.map((event: any) => {
                        const start = moment(event.start_time).format('YYYY-M-D-H-m').split("-").map((item) => { return parseInt(item) });
                        const end = moment(event.end_time).format('YYYY-M-D-H-m').split("-").map((item) => { return parseInt(item) });
                        let url = "";
                        if (Rooms.data?.some((room: any) => (room.name as string).toLowerCase() === (event.room?.split(' ')[0] as string).toLowerCase())) {
                            url = 'https://'+mapURL+'/map?q=' + event.room.split(' ')[0]
                        }
                        return {
                            title: calID.calendar.split('-')[0] + " - " + event.name,
                            start: start,
                            end: end,
                            description: event.name,
                            location: event.room,
                            url: url,
                            uid: event.id.toString(),
                        }
                    });
                });
                    return promises;

                    
            });
            if(allEvents){
            Promise.all(allEvents).then((data: any[]) => {
                        const ics = require('ics');
                        const icsCal = ics.createEvents(data.flat())
                        res.send(icsCal.value)
                        res.status(200)
            })
            }
      
        })
        
    }
    
}

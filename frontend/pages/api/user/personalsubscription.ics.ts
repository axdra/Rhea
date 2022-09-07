// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from '@supabase/supabase-js';
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next'


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
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing supabase environment variables')
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
        const Rooms = await supabase.from('Rooms').select('Name');
        supabase.from('PersonalCalendars').select().eq('userid', calendarCode).single().then(userCalendarData => {
            const allEvents = userCalendarData.data.calendars.map((calID:string) => {
              const promise =   supabase.from('Calendars').select("*, Events(*)").ilike('code', calID).single().then((data:any) => {
                 const events = data.data.Events.map((event: any) => {
                  const start = moment(event.start_date).format('YYYY-M-D-H-m').split("-").map((item, index) => { return parseInt(item) });
                    const end = moment(event.end_date).format('YYYY-M-D-H-m').split("-").map((item, index) => { return parseInt(item) });
                    let url = "";
                    if (Rooms.data?.some((room: any) => (room.Name as string).toLowerCase() === (event.room.split(' ')[0] as string).toLowerCase())) {
                        url = 'https://mdu.axeldraws.com/map?q=' + event.room.split(' ')[0]
                    }
                    return {
                        title: calendarCode.split('-')[0] + " - " + event.name,
                        start: start,
                        end: end,
                        description: event.name,
                        location: event.room,
                        url: url,
                        uid: event.id.toString(),
                    }
                 });
                return events;
                // console.log(events)

                // res.status(200)
                // res.send(icsCal.value)
                    
                }
                    
                )
                return promise;
            });
            Promise.all(allEvents).then((data: any[]) => {
                        const ics = require('ics');
                        const icsCal = ics.createEvents(data.flat())
                        res.send(icsCal.value)
                        res.status(200)
            })
      
        })
        
    }
    res.status(500)
    
}

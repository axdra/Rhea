// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../utils/supabaseClient'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const calendarCode = req.query.q;
    if (!calendarCode) {
        res.status(400).json({ error: 'Missing course code' })
    }
    if (!Array.isArray(calendarCode) && calendarCode) {
        const Rooms = await supabase.from('Rooms').select('Name');

        supabase.from('Calendars').select("*, Events(*)").limit(1).ilike('code', calendarCode).single().then(data => {
           
            const ics = require('ics');
            const events = data.data.Events.map((event:any) => {
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
                    url:url,
                    uid: event.id.toString(),
                }
            });
            console.log(events)

            const icsCal = ics.createEvents(events)
            res.status(200)
            res.send(icsCal.value)
        }
        )
    }
    res.status(500)
    
}

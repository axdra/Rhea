// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../utils/supabaseClient'


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const calendarCode = req.query.q;
    if (!calendarCode) {
        res.status(400).json({ error: 'Missing course code' })
    }
    if (!Array.isArray(calendarCode) && calendarCode) {
        supabase.from('Calendars').select("*, Events(*)").limit(1).ilike('code', calendarCode).single().then(data => {
           
            const ics = require('ics');
            const events = data.data.Events.map(event => {
                const start = moment(event.start_date).format('YYYY-M-D-H-m').split("-").map((item, index) => { return parseInt(item) });
                const end = moment(event.end_date).format('YYYY-M-D-H-m').split("-").map((item, index) => { return parseInt(item) });
                console.log(start)
                console.log(end)
                return {
                    title: calendarCode,
                    start: start,
                    end: end,
                    description: event.name,
                    location: event.room,
                }
            });
            const icsCal = ics.createEvents(events)
            res.status(200)
            res.send(icsCal.value)
        }
        )
    }
    res.status(500)
    
}

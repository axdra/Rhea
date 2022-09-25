// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next'
import getSchema from '../../utils/getSchema';
import { supabase } from '../../utils/supabaseClient'
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
        const Rooms = await supabase.from('rooms').select('name');
        const events = await getSchema(calendarCode)
           
            const ics = require('ics');
            const calEvents = events?.events.map((event:any) => {
                const start = moment(event.start_date).format('YYYY-M-D-H-m').split("-").map((item, index) => { return parseInt(item) });
                const end = moment(event.end_date).format('YYYY-M-D-H-m').split("-").map((item, index) => { return parseInt(item) });
                let url = "";
                if (Rooms.data?.some((room: any) => (room.name as string).toLowerCase() === (event.room.split(' ')[0] as string).toLowerCase())) {
                    url = 'https://'+mapURL+'/map?q=' + event.room.split(' ')[0]
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

            const icsCal = ics.createEvents(calEvents)
            res.status(200)
            res.send(icsCal.value)
   
    }
    res.status(500)
    
}

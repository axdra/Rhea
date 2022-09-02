// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
      if (!Array.isArray(calendarCode) && calendarCode){
          supabase.from('Calendars').select("*, Events(*)").limit(1).ilike('code', calendarCode).single().then(data => {
             const  events = data.data.Events.map((event: any) => {
                  return {
                      
                        aid: event.aid,
                        created_at: event.created_at.replace('T', 'Z'),
                        end_date: event.end_date.replace('T', 'Z'),
                        group:  event.group,
                        id: event.id,
                        last_update: event.last_update.replace('T', 'Z'),
                        name:   event.name,
                        parent_calendar:    event.parent_calendar,
                        room: event.room,
                        start_date: event.start_date.replace('T', 'Z'),
                        teacher: event.teacher,
                  }
              }
                )
              res.status(200).json({course: data.data.course, name: data.data.name, code: data.data.code, Events: events })
        }
          )
    }
    
 
}

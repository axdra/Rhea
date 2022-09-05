// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
  const Rooms = await supabase.from('Rooms').select('Name');
  
      if (!Array.isArray(calendarCode) && calendarCode){
          supabase.from('Calendars').select("*, Events(*)").limit(1).ilike('code', calendarCode).single().then(data => {
            const events = data.data.Events.filter((ev:any)=>new Date(ev.end_date) > new Date()).map((event: any) => {
                
                return {
                  
                  aid: event.aid,
                  created_at: new Date(event.created_at.replace('T', 'Z')),
                  end_date: new Date(event.end_date.replace('T', 'Z')),
                  group: event.group,
                  id: event.id,
                  last_update: new Date(event.last_update.replace('T', 'Z')),
                  name: event.name,
                  parent_calendar: event.parent_calendar,
                  room: event.room,
                  start_date: new Date(event.start_date.replace('T', 'Z')),
                  teacher: event.teacher,
                  hasMap: Rooms.data?.some((room:any)=>(room.Name as string).toLowerCase() === (event.room.split(' ')[0] as string).toLowerCase())
                }
              
            }
                )
              res.status(200).json({course: data.data.course, name: data.data.name, code: data.data.code, Events: events })
        }
          )
    }
    
 
}

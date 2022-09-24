// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getSchema from '../../utils/getSchema';
import { supabase } from '../../utils/supabaseClient'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const calendarCode = req.query.q;
    if (!calendarCode) {
        res.status(400).json({ error: 'Missing course code' })
    }
  const Rooms = await supabase.from('rooms').select('name');
  
      if (!Array.isArray(calendarCode) && calendarCode){
        const parent = await supabase.from('calendars').select("*").limit(1).match({ code: calendarCode }).single()
        const events = await getSchema(calendarCode)
        if (parent.data) {
          res.status(200).json({ course: parent?.data?.course, name: parent?.data?.name, code: parent?.data?.code, Events: events?.events })
        } else {
          res.status(404).json({ error: 'No course found' })
        }
    }
    
 
}

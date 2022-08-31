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
              res.status(200).json(data.data)
        }
          )
    }
    
 
}

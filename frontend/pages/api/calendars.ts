// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../utils/supabaseClient'

interface ICourse{
    id: number;
    name: string;
    code: string;
    URL: string;
}


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ICourse[] | any>
) {
    const courseCode = req.query.q;
    if (!courseCode) {
        res.status(400).json({ error: 'Missing course code' })
    }
      if (!Array.isArray(courseCode) && courseCode){
          supabase.from('courses').select("*, calendars(*)").limit(1).ilike('code', courseCode).single().then(data => {
              res.status(200).json(data.data)
        }
          )
    }
    
 
}

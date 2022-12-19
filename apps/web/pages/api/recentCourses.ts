// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../utils/supabaseClient'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    
 const data = await supabase.from('calendars').select('*, courses(*)').not('last_cache', 'is', null)
let courses = (data.data?.map(cal=>{
        return cal.courses
}))
courses = courses?.filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.code === value.code 
  ))
)
    res.status(200).json(courses)
    }
    
 




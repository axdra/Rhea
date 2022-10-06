// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../utils/supabaseClient'


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse< any>
) {
    supabase.from('unions').select().then((data:any) => {
        res.status(200).json({ unions: data.data })
    }
              
    )
    
    }
    
 

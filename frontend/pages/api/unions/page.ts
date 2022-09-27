// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../utils/supabaseClient'


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse< any>
) {
    const name = req.query.q as string;
    
    supabase.from('unions').select('*, unionpage(*), unionevents(*)').ilike('name', name).single().then((data: any) => {
        console.log(data)
        res.status(200).json({ union: data.data })
    }
              
    )
    
    }
    
 

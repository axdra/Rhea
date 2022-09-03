// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../utils/supabaseClient'

interface IStatus{
    status: string
    issues: string[]
    statusMessage?: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<IStatus | any>
) {
    supabase.from('Issues').select().then(data => {
        res.status(200).json({ issues: data.data, status: "ok" })
    }
              
    )
    
    }
    
 

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next'

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_SECRET_KEY
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse< any>
) {
    const name = req.query.q as string;
    const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string);
    let userID = "";
    const user = await supabase.auth.getUser(req.headers.authorization)
    if (user.data?.user?.aud === 'authenticated') {
        userID = user.data.user.id;
    }

    supabase.from('unions').select('*, unionpage(*), unionevents(*)').ilike('name', name).single().then((data: any) => {
        console.log(data)
        res.status(200).json({ union: data.data, admin: data.data.admins.includes(userID)  })
    }
              
    )
    
    }
    
 

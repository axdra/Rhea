// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next'

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_SECRET_KEY

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse< any>
) {
    //parse the query string
    const { eventName, unionName  }  = req.query;
  
    const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string);

    if (!eventName || !unionName && typeof(eventName) === typeof(String) && typeof(unionName) ===  typeof(String)) {
        res.status(400).json({ error: 'Missing event name or union name' })
    }
      
    supabase.from('unions').select('*, unionpage(*), unionevents(*)').ilike('name', unionName as  string).single().then((data: any) => {
        if (data.data) { 
            const union = data.data;
            const event = union.unionevents.find((event: any) => event.url_slug === eventName);
            if (event) {
                res.status(200).json({ event: event })
            } else {
                res.status(404).json({ error: 'Event not found' })
            }
        } else
            {
                res.status(404).json({ error: 'Event not found' })
                                                
            }
        
    })
    
    }
    
 

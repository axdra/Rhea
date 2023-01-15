// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    

    const auth = req.headers.authorization;

    if(!auth){
        res.status(401).json({error: "No auth header"})
        return;
    }
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_SECRET_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing supabase environment variables')
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
        const user = await supabase.auth.getUser(auth);
        if(!user){
            res.status(401).json({error: "Invalid auth header"})
            return;
        }
   
        if(user.data.user?.id){
        const { data: groups, error } = await supabase.from('groups').select('name,id').contains('members', [user.data.user?.id]);
        if(error){
            res.status(500).json({error: error})
            return;
        }
        res.status(200).json(groups)
        
        }



    
    
}

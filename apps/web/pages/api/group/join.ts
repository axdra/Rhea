// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getSchema from '../../../utils/getSchema';
import { GetUserBookings } from 'kronox-adapter';
import {GetValidKronoxSession, KronoxLogin, KronoxPoll} from 'kronox-adapter'
import { updateKronoxSession } from '../../../utils/userutils';
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
    if(req.method == "POST"){
        const user = await supabase.auth.getUser(auth);
        if(!user){
            res.status(401).json({error: "Invalid auth header"})
            return;
        }
   
    let inviteCode = req.body.inviteCode;
    if(!inviteCode){
        res.status(400).json({error: "No inviteCode"})
        return;
    }
    // update group members where invitecode = invitecode
    const { data: group, error } = await supabase.from('groups').select('name,id,members,invitecode').eq('invitecode', inviteCode).single();
    if(error){
        res.status(500).json({error: error})
        return;
    }
    if(!group){
        res.status(404).json({error: "Group not found"})
        return;
    }
    console.log(group.members)
    if(group.members.includes(user.data.user?.id)){
        res.status(401).json({error: "User already in group"})
        return;
    }
    const { data: updatedGroup, error: updateError } = await supabase.from('groups').update({members: [...group.members, user.data.user?.id]}).eq('id', group.id);
    if(updateError){
        res.status(500).json({error: updateError})
        return;
    }
    res.status(200).json("Joined group")
    


    




    }else if(req.method == "POST"){

    }else if(req.method == "DELETE"){   
    
    }
    
    
}

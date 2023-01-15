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
    if(req.method == "GET"){
        const user = await supabase.auth.getUser(auth);
        if(!user){
            res.status(401).json({error: "Invalid auth header"})
            return;
        }
   
    let groupid = req.query.groupid;
    if(!groupid){
        res.status(400).json({error: "No groupid"})
        return;
    }
    const { data: group, error } = await supabase.from('groups').select('name,id,members,invitecode').eq('id', groupid).single();
    if(error){
        res.status(500).json({error: error})
        return;
    }
    if(!group){
        res.status(404).json({error: "Group not found"})
        return;
    }
    if(!group.members.includes(user.data.user?.id)){
        res.status(401).json({error: "User not in group"})
        return;
    }

    res.status(200).json(group)

    




    }else if(req.method == "POST"){
        const user = await supabase.auth.getUser(auth);
        if(!user){
            res.status(401).json({error: "Invalid auth header"})
            return;
        }
        //generate invite code between 100000 and 999999
        const randomInviteCode = Math.floor(Math.random() * 900000) + 100000;
        //Create group with user as owner
        const { data, error } = await supabase.from('groups').insert([{name: req.body.name, members: [user.data.user?.id], invitecode: randomInviteCode}]).single();
        if(error){
            res.status(500).json({error: error})
            return;
        }
        
        res.status(200).json("Created group")

    }else if(req.method == "DELETE"){   
    
    }
    
    
}

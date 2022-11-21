// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { decryptKronoxSession } from 'kronox-adapter';
import { createClient } from '@supabase/supabase-js';
import { KronoxPoll } from 'kronox-adapter';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_SECRET_KEY
const authKey = process.env.UTILS_AUTH
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const auth = req.headers.authorization;




    const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string);
    let userID = "";
    const user = await supabase.auth.getUser(req.headers.authorization)
    if (user.data?.user?.aud === 'authenticated') {
        userID = user.data.user.id;
    }

    supabase.from('kronox_users').select('kronox_session').then((data: any) => {
        const sessions = data.data.map((session: any) => {
            return decryptKronoxSession(session.kronox_session)
        })
        sessions.forEach((session: string) => {
            KronoxPoll(session)
        });
        res.status(200).json(`Polled ${sessions.length} users`)
    }

    )







}

import { createClient } from "@supabase/supabase-js";
import { decryptKronoxSession, encryptKronoxSession } from "kronox-adapter";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SECRET_KEY || "";

export const updateKronoxSession = async (session: string, user_token:string) => {
    const supabase = createClient(supabaseUrl, supabaseKey)

    supabase.auth.getUser(user_token).then(data => {
        if (data.data.user?.aud === 'authenticated') {

            const encryptedSession = encryptKronoxSession(session);
            supabase.from('kronox_users').update({ kronox_session: encryptedSession, last_poll: new Date() }).eq('user', data.data.user.id).then(data => {
                console.log(data)
            });
            supabase.from('kronox_users').insert({ kronox_session: encryptedSession, user: data.data.user.id,last_poll: new Date()  }).then(data => {
                console.log(data)

            })
        }     
    })
}

export const getKronoxSession = async (user_token: string): Promise<string> => {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const user = await supabase.auth.getUser(user_token)
        if (user.data.user?.aud === 'authenticated') {
            const res = await supabase.from('kronox_users').select('kronox_session').eq('user', user.data.user.id).single();
            if (res.data?.kronox_session) {
                return Promise.resolve(decryptKronoxSession(res.data.kronox_session));
            }

        }
    
    return Promise.reject("No session found");
}

export const deleteKronoxSession = async (user_token: string) => {
    const supabase = createClient(supabaseUrl, supabaseKey)

    supabase.auth.getUser(user_token).then(data => {
        if (data.data.user?.aud === 'authenticated') {
            supabase.from('kronox_users').delete().eq('user',data.data.user.id ).then(data => {});
        }     
    })
}
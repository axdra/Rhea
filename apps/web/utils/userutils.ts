import { createClient } from "@supabase/supabase-js";
import { encryptKronoxSession } from "kronox-adapter";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SECRET_KEY || "";

export const updateKronoxSession = async (session: string, user_token:string) => {
    const supabase = createClient(supabaseUrl, supabaseKey)

    supabase.auth.getUser(user_token).then(data => {
        if (data.data.user?.aud === 'authenticated') {
            const encryptedSession = encryptKronoxSession(session);
            supabase.from('kronox_users').update({kronox_session: encryptedSession, last_poll: new Date()}).eq('user',data.data.user.id ).then(data => {});
            supabase.from('kronox_users').insert({kronox_session: encryptedSession, user: data.data.user.id}).then(data => {
            })
        }     
    })
}
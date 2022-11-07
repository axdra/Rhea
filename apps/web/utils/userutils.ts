import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SECRET_KEY || "";

export const updateKronoxSession = async (session: string, user_token:string) => {
    const supabase = createClient(supabaseUrl, supabaseKey)
    supabase.auth.getUser(user_token).then(data => {
        if (data.data.user?.aud === 'authenticated') {
            supabase.from('kronox_users').update({kronox_session: session}).eq('user',data.data.user.id ).then(data => {});
            supabase.from('kronox_users').insert({kronox_session: session, user: data.data.user.id}).then(data => {
            })
        
        }     
    })
}
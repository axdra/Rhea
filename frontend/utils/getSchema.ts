import { createClient } from "@supabase/supabase-js";
import dayjs from "dayjs";
import { IEvent } from "../components/schema";
import ical  from 'node-ical';

interface ISchema {
    name: string;
    events: IEvent[];
    
}

const URLBase = "https://webbschema.mdu.se/setup/jsp/SchemaICAL.ics?startDatum=idag&intervallTyp=a&intervallAntal=1&sprak=SV&sokMedAND=true&forklaringar=true&resurser=k.";

const updateSchemaCache = async (code: string): Promise<ISchema | undefined> => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_SECRET_KEY;
    
     if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing supabase environment variables')
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
 
    const cal = ical.fromURL(URLBase+code);

        
    return undefined;
}

const getSchema = async (code: string): Promise<ISchema | undefined> => {
       
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_SECRET_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing supabase environment variables')
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    return supabase.from('Calendars').select("*, Events(*)").limit(1).ilike('code', code).single().then(data => {
        if (data.data.last_updated === undefined || dayjs(data.data.last_updated).diff(dayjs(), 'hour') > 1) {
            
            return updateSchemaCache(code).then((data) => {
                return data
            }).catch((err) => {
                throw err
            }
            )

        }
    }).then((data) => {
        return data
    })
    

}


export default getSchema;
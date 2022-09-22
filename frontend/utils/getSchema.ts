import { createClient } from "@supabase/supabase-js";
import dayjs from "dayjs";
import { IEvent } from "../components/schema";
import ical, { CalendarResponse }  from 'node-ical';

interface ISchema {
    name: string;
    events: IEvent[];
    
}

const URLBase = "https://webbschema.mdu.se/setup/jsp/SchemaICAL.ics?startDatum=idag&intervallTyp=a&intervallAntal=1&sprak=SV&sokMedAND=true&forklaringar=true&resurser=k.";
const getEventFromIcalEvent = (event: any,parsentCode:string): IEvent => {
    created_at: Date,
    parent_calendar: number,
    name: string,
    room: string,
    program?: string,
    group?: string,
    teacher?: string,
    aid?: string,
    last_update: Date,
    start_date: Date,
    end_date: Date
    return 
}
const updateSchemaCache = async (code: string): Promise<ISchema | undefined> => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_SECRET_KEY;
    
     if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing supabase environment variables')
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    ical.fromURL(URLBase+code).then((cal:CalendarResponse)=>{
const events:IEvent[] = Object.keys(cal).filter(key => 
            cal[key].type === "VEVENT"
).map((event) => {
    const parsedEvent = getEventFromIcalEvent(event);
    return parsedEvent
       })
    }); 
        
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
        if (data?.data?.last_updated === undefined || dayjs(data.data.last_updated).diff(dayjs(), 'hour') > 1) {
            
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

import { createClient } from "@supabase/supabase-js";
import dayjs from "dayjs";
import { IEvent } from "../components/schema";
import ical, { CalendarResponse }  from 'node-ical';

interface ISchema {
    name: string;
    events: IEvent[];
    
}

const URLBase = "https://webbschema.mdu.se/setup/jsp/SchemaICAL.ics?startDatum=idag&intervallTyp=a&intervallAntal=1&sprak=SV&sokMedAND=true&forklaringar=true&resurser=k.";
const getEventFromIcalEvent = (event: any,parentCode:string): any => {
    const parsedEvent = {
        created_at: event.created,
        parent_calendar: parentCode,
        name:  event.summary.split('Moment: ')[1].trim() || '',
        room: event.location,
        location: event.location,
        last_update: event.lastmodified,
        start_time: event.start,
        end_time: event.end,
        aid: "",
        teacher: event.summary.split('Sign:')[1]?.split("Moment: ")[0].trim(),
        group:""
        
    }
    return parsedEvent;
}
const updateSchemaCache = async (code: string): Promise<ISchema | undefined> => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_SECRET_KEY;
    
     if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing supabase environment variables')
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    return ical.fromURL(URLBase + code).then((cal: CalendarResponse) => {
        const events: IEvent[] = Object.keys(cal).filter(key =>
            cal[key].type === "VEVENT"
        ).map((event) => {
            const parsedEvent = getEventFromIcalEvent(cal[event], code);
            return parsedEvent
        })
       
        return supabase.from('events').delete().match({ parent_calendar: code }).then(() => {
            const promises = events.map((ev) => {
                return supabase.from('events').insert(ev)
            })
            Promise.all(promises)
        }).then((e) => {
          supabase.from('calendars').select("*").match({ code: code }).then((match) => {
          })
          supabase.from('calendars').update({ last_cache: new Date() }).match({ code: code }).then((e) => {
            })
          return { events: events, name: code }
          })
        
    }); 
}

const getSchema = async (code: string): Promise<ISchema | undefined> => {
       
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_SECRET_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing supabase environment variables')
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    return supabase.from('calendars').select("*, events(*)").limit(1).ilike('code', code).single().then(data => {
        if (data?.data?.last_cache === undefined || dayjs(data.data.last_cache).add(2,'h').diff(dayjs(), 'hour') || data?.data?.last_cache === null) {
            
            return updateSchemaCache(code).then((data) => {
                return data
            }).catch((err) => {
                throw err
            }
            )

        } else {
            supabase.from('events').select('*').match({ parent_calendar: code }).then(data => {
                return {events:data.data,name:code}
            }).then(data => {
                return console.log(data);
            })
            
        }
    }).then((data) => {
        return data
    })
    

}


export default getSchema;

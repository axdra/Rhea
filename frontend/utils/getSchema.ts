import { createClient } from "@supabase/supabase-js";
import dayjs from "dayjs";
import { IEvent } from "../components/schema";
//@ts-ignore IDK ABOUT THIS, THIS IS SO WEIRD, IT WORKS BUT I DONT KNOW WHY IT WORKS DONT TOUCH IT BAD PRACTICE...
import ical, { CalendarResponse } from 'node-ical';

interface ISchema {
    name: string;
    events: IEvent[];

}

const URLBase = "https://webbschema.mdu.se/setup/jsp/SchemaICAL.ics?startDatum=2023-01-01&intervallTyp=a&intervallAntal=1&sprak=SV&sokMedAND=true&forklaringar=true&resurser=k.";
const getEventFromIcalEvent = (event: any, parentCode: string): any => {
    const parsedEvent = {
        created_at: event.created,
        parent_calendar: parentCode,
        name: event.summary.split('Moment: ')[1].split("Aktivitetstyp")[0].trim().replace(/&amp;/g, '&') || '',
        room: event.location,
        location: event.location,
        last_update: event.lastmodified,
        start_time: event.start,
        end_time: event.end,
        aid: "",
        teacher: event.summary.split('Sign:')[1]?.split("Moment: ")[0].trim(),
        group: "",
        id: event.uid

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
    const calendar = await ical.fromURL(URLBase + code)
    const events = Object.values(calendar).filter((event: any) => event.type === 'VEVENT').map((event) => getEventFromIcalEvent(event, code));
    if (events.length == 0) {
        throw new Error("No new events in caching..");
    }
    await supabase.from('events').delete().match({ parent_calendar: code });
    await supabase.from('events').insert(events.map((calevent: any) => {
        return {
            ...calevent,
            id: code + calevent.id
        }
    }));
    await supabase.from('calendars').update({ last_cache: dayjs().format() }).match({ code: code })
    return { events: events, name: code }


}

const getSchema = async (code: string): Promise<ISchema | undefined> => {

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_SECRET_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing supabase environment variables')
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const calendar = await supabase.from('calendars').select("*, events(*)").limit(1).ilike('code', code).single()
    if (calendar.data) {
        if (calendar?.data?.last_cache === undefined || calendar?.data?.last_cache === null || Math.abs(dayjs(calendar.data.last_cache).diff(dayjs(), 'hour')) >= 1) {
            console.log("Updating cache for calendar: " + code)
            return updateSchemaCache(code).then((data) => {
                return data
            }).catch((err) => {
                throw err
            }
            )
        } else {
            console.log("Using cached data for calendar: " + code)
            const events = await supabase.from('events').select('*').ilike('parent_calendar', code)
            if (events.data) {
                return { events: events.data, name: code }
            } else {
                return undefined
            }
        }
    } else {
        return undefined
    }



}


export default getSchema;

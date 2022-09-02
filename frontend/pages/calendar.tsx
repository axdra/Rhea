interface IEvent {
    id: number;
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
}

import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { CalendarIcon } from "@heroicons/react/24/solid";
const Calendar: NextPage = () => {
    //get Course query from url
    const router = useRouter();
    const calendar = router.query.q as string;
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [url, setUrl] = useState("");
    useEffect(() => {
        if (calendar) {
            fetch('/api/events?q=' + calendar).then
                (res => res.json()).then(data => {
                    setEvents(data.Events);
                    setName(data.name);
                    setCode(data.code);
                    setUrl(data.URL);
                }
                ).finally(() => {
                    setLoading(false);
                }
                )
        }
    }
        , [calendar]);
    
    const subscribeToSchedule = async () => {
        window.open('webcal://mdu.axeldraws.com/api/subscription.ics?q=' + calendar, '_blank');
    
    }
    return (
        <div className="max-w-6xl mx-auto md:mt-12 mt-4 md:px-24 w-full px-4 py-10 shadow rounded-lg mb-24 flex-1 flex-col    ">
            <div className=" flex justify-between flex-1 ">
                <div className="flex-1">
            <h1 className="text-4xl font-medium mb-5 transition-all  ">{name}</h1>
            <h1 className="text-xl font-medium mb-5  transition-all  ">{code}</h1>
                </div>
                <div className="flex-1 justify-end flex items-center">
                    <div className="flex py-2 px-4 gap-2 items-center justify-center hover:bg-orange-100 rounded-lg hover:text-orange-500 cursor-pointer hover:font-bold transition-colors " onClick={subscribeToSchedule}>
                    <p>Add to calendar</p>
                        <CalendarIcon className="h-8 w-8 text-orange-500" />
                    </div>
                </div>
                </div>
            {events.length === 0 && !loading && <div className="flex-1 min-h-full flex justify-center "><h2>No results found</h2></div>}
            {loading && <div className="flex-1 min-h-full flex justify-center ">
                <svg className="animate-spin  h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>}
            <div className="flex flex-col gap-4" >
                {events.length > 0 && events.map((event:IEvent) =>
                    <div
                        key={event.id}
                            className="flex sm:flex-row gap-6 flex-col items-center justify-between border rounded-xl border-gray-200 bg-orange-50/20 py-5 px-4 shadow-sm sm:gap-2 hover:shadow transition-all duration-300">
                            <div>
                                <h2>
                                    {event.name}
                                </h2>
                                <h3 className="font-medium">
                                    {event.room}
                                </h3>
                                
                            </div>
                            <div>
                                <h3>{new Date(event.start_date).toLocaleTimeString('sv-SE', {
                                    hour: 'numeric',
                                    minute: 'numeric'

                                })}</h3>
                                <h3>{new Date(event.end_date).toLocaleTimeString('sv-SE', {
                                    
                                    hour: 'numeric',
                                    minute: 'numeric'

                                })}</h3>
                            </div>
                     
                        </div>
    )}

            </div>
        </div>
    );
}
export default Calendar;
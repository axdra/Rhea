
import dayjs from "dayjs";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { CalendarIcon } from "@heroicons/react/24/solid";
import Schema from "../components/schema";
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
            <h1 className="text-4xl font-medium mb-5 transition-all max-w-full  " style={{
                wordWrap: "break-word"
            }}>{name}</h1>
            <div className=" flex justify-between flex-1 items-center mb-4">
                
                <div className="flex-1 max-w-[50%] ">
                
            <h1 className="text-xl font-medium   transition-all   ">{code}</h1>
                </div>
                <div className="flex-1 justify-end flex items-center">
                    {events.length !== 0 && !loading  &&   <div className="flex py-2 px-4 gap-2 items-center justify-center hover:bg-orange-100 rounded-lg hover:text-orange-500 cursor-pointer hover:font-bold transition-colors " onClick={subscribeToSchedule}>
                    <p>Add to calendar</p>
                        <CalendarIcon className="h-8 w-8 text-orange-500" />
                </div>
                } 
                </div>
                </div>
            {events.length === 0 && !loading && <div className="flex-1 min-h-full flex justify-center "><h2>No results found</h2></div>}
            {loading && <div className="flex-1 min-h-full flex justify-center ">
                <svg className="animate-spin  h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>}
       
                <Schema events={ events} />
        </div>
    );
}
export default Calendar;
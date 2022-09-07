import { CalendarIcon } from "@heroicons/react/24/solid";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

const UserCalendar: NextPage = () => {
    const [subscribedCalendars, setSubscribedCalendars] = useState<string[]>([]);
    
    useEffect(() => {

    supabase.auth.getSession().then((session) => {
        fetch('https://mdu.axeldraws.com/api/calendar',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${session.data.session?.access_token}`
                }
            }
        ).then((res) => res.json()).catch().then((data) => setSubscribedCalendars(data.calendars))
    });
    }, []);
    
    const subscribeToSchedule = async () => {
        supabase.auth.getSession().then((session) => {

            window.open('webcal://mdu.axeldraws.com/api/user/personalsubscription.ics?q=' +  session.data.session?.user.id , '_blank');
        });

    }
    return (
        <div className="max-w-6xl mx-auto md:mt-12 mt-4 md:px-24 w-full px-4 py-10 shadow rounded-lg mb-24 flex-1 flex-col     ">
            <div className="flex  justify-between items-center mb-4">
            <h1 className="text-2xl " >User Calendar</h1>
            <div className="flex py-2 px-4 gap-2 items-center justify-center hover:bg-orange-100 rounded-lg hover:text-orange-500 cursor-pointer hover:font-bold transition-colors " onClick={subscribeToSchedule}>
                <p>Add to calendar</p>
                <CalendarIcon className="h-8 w-8 text-orange-500" />
                </div>
            </div>
            <div className="gap-5 flex flex-col">
            {
                subscribedCalendars.map((calendar) => {
                    return (
                      
                            
                            <div
                                key={calendar}
                                        className="flex sm:flex-row gap-6 flex-col items-center justify-between border rounded-xl border-gray-200 bg-orange-50/20 py-5 px-4 shadow-sm sm:gap-2  transition-all duration-300">
                                        <div>
                                            <h2>
                                                {calendar}
                                            </h2>
                                            <h3 className="font-medium">
                                                {calendar}
                                            </h3>
                                        </div>
                                <div className="flex gap-2" >
                                    <Link href={{
                                        pathname: "/calendar",
                                        query: {
                                            q: calendar
                                        }
                                    }}>
                                        <a className="text-orange-500 hover:text-orange-700 py-2 px-5 bg-white shadow rounded-xl  whitespace-nowrap cursor-pointer ">Go to Calendar</a>
                                    </Link>
                                    <div className="text-red-500 hover:text-red-700 py-2 px-5 bg-white shadow rounded-xl  whitespace-nowrap cursor-pointer ">Remove</div>
                                        </div>
                            </div>
                        

                    )
                }
                )
                }
            </div>
        </div>
    );
}
export default UserCalendar;
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { IKronoxUserAuthResponse } from "kronox-adapter";
import { NextPage } from "next";

import {  useEffect, useState } from "react";
import Button from "../../components/Button";
import { useUserContext } from "../../context/usercontext";

const AutoBooking:NextPage = () => {
        const {getKSession, setKSession} = useUserContext();
        const [kUser, setUser] = useState<IKronoxUserAuthResponse | null>(null);
        const { supabaseClient } = useSessionContext();
        const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
        const [bookableRooms, setBookableRooms] = useState<string[]>([]);
        
        const [futureBookings, setFutureBookings] = useState<any[]>([]);
        useEffect(() => {
            getKSession().then((session:IKronoxUserAuthResponse) => {
              if(!Object.keys(session).includes('error')) {
                    setUser(session)
                
                
                }
            }).catch((err:any) => {
                console.log(err)
                setUser(null);
            })
        }, [])
        useEffect(() => {
            if(kUser) {
               
                    supabaseClient.auth.getSession().then((session) => {

                    fetch('/api/user/futurebookings', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${session.data.session?.access_token}`
                        },
                        
                    }).then((res) => {
                        return res.json();
                    }).then((data) => {
                        setFutureBookings(data)
                    })
                    fetch('/api/rooms/getBookableRooms?' + new URLSearchParams({
                        'session': encodeURI(kUser.token),
                        'flik':'FLIK_0001'
                    })).then((data) => {
                        data.json().then((data) => {
                            setBookableRooms(data);
                        })
                    })

                    
                })

    }},[kUser, supabaseClient.auth])
    const cancelBooking = (day:number, timeslot:number) =>{
        supabaseClient.auth.getSession().then((session) => {

            fetch('/api/user/futurebookings', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${session.data.session?.access_token}`
                },
                body: JSON.stringify({
                    day: day.toString(),
                    timeslot: timeslot.toString()
    
                }),
                
            })
            
        })
    }
    const newBooking = (day:number, timeslot:number) =>{
        supabaseClient.auth.getSession().then((session) => {

            fetch('/api/user/futurebookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${session.data.session?.access_token}`
                },
                body: JSON.stringify({
                    day: day.toString(),
                    timeslot: timeslot.toString(),
                    room: selectedRoom || '',
                }
                )
                
            })
            
        })
    }


        return <div className="flex justify-center items-center">
            
            <div className="w-full max-w-7xl px-5 md:block hidden dark:text-white ">

                <div className="grid grid-cols-8 max-w-2xl mx-auto gap-2 ">
                    <div />
                    <label className="text-center">
                        Monday
                    </label>
                    <label className="text-center">
                       Tuesday
                    </label>
                    <label className="text-center">
                        Wednesday                        
                    </label>
                    <label className="text-center">
                        Thursday
                    </label>
                    <label className="text-center">
                        Friday
                    </label>
                    <label className="text-center">
                        Saturday
                    </label>
                    <label className="text-center">
                        Sunday
                    </label>
                    <div className="flex flex-col gap-2 justify-between">
                        <label className="aspect-square flex justify-center items-center text-center">
                            08:15
                            10:00
                        </label>
                        <label className="aspect-square flex justify-center items-center text-center">
                            10:15
                            12:00
                        </label>
                        <label className="aspect-square flex justify-center items-center text-center">
                            12:15
                            14:00
                        </label>
                        <label className="aspect-square flex justify-center items-center text-center">
                            14:15
                            16:00
                        </label>
                        <label className="aspect-square flex justify-center items-center text-center">
                            16:15
                            18:00
                        </label>
                        <label className="aspect-square flex justify-center items-center text-center">
                            18:15
                            20:00
                        </label>
                    </div>{
                    [0,1,2,3,4,5,6].map((day) => {
                        return <div className="flex flex-col gap-2 justify-between">
                            {[0,1,2,3,4,5].map((timeslot) => {
                                if(futureBookings.length){
                                const booking = futureBookings?.filter((booking) => {
                                    return booking.day == day && booking.timeslot == timeslot;
                                })
                                
                                

                                if(booking?.length > 0) {
                                    console.log(booking)
                                    return <div onClick={()=>cancelBooking(day,timeslot)} className="aspect-square flex justify-center items-center text-center  bg-green-500/20 text-green-500 border-green-500 hover:bg-green-500 hover:text-green-900 cursor-pointer">
                                        {booking[0].roomid}
                                    </div>
                                }
                                }
                                return <label onClick={()=>newBooking(day,timeslot)}  className="aspect-square flex justify-center items-center text-center bg-blue-500/20 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-blue-900 cursor-pointer" >
                                   
                                </label>
                            })}
                        </div>
                    })}
                        </div>

            </div>
            <div className="grid grid-cols-4 gap-4 " >
                {bookableRooms.map((room) => {
                        return <Button buttonStyle="outlined" className={
                            selectedRoom == room ? 'bg-blue-500 text-white dark:bg-blue-500/50' : ''
                        }
                        onClick={() => {
                            setSelectedRoom(room)
                        }}
                        >
                            {room}
                        </Button>
                })}
            </div>
            </div>
    
}
export default AutoBooking;

  


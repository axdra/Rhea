import { NextPage } from "next";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { IKronoxUserAuthResponse } from "kronox-adapter";
import { useEffect, useState } from "react";
import { bookRoom, getRoomBookings } from "kronox-adapter";
import { IKronoxBookingRoom } from "kronox-adapter";
import Button from "../../components/Button";
import TimeSlotSelector from "../../components/rooms/timeslotselector";
import TimeView from "../../components/rooms/timeview";
import { Transition } from "@headlessui/react";
import { useUserContext } from "../../context/usercontext";
import RoomList from "../../components/rooms/roomlist";

const Rooms: NextPage = () => { 
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = useTranslation();
    const { supabaseClient } = useSessionContext();
    const {getKSession, setKSession} = useUserContext();
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<number | null>(null);
    const [user, setUser] = useState<IKronoxUserAuthResponse | null>(null);
    const [days, setDays] = useState<IKronoxBookingRoom[][]>([]);
    const [failedToLogin, setFailedToLogin] = useState(false);
    const [timeslotDays, setTimeslotDays] = useState<number[][]>([]);
    const [bookedRoom, setBookedRoom] = useState<string | null>(null);
    const [bookableRooms, setBookableRooms] = useState<string[]>([]);
    const [showRooms, setShowRooms] = useState(false);
    useEffect(() => {
        setTimeout(()=>setBookedRoom(null), 2500);
    }, [bookedRoom])

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


    const login = (username:string,password:string) => {
        
        supabaseClient.auth.getSession().then((session) => {
            fetch('/api/user/kronoxlogin',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${session.data.session?.access_token}`
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })

                    
                }
            ).then((data) => {
                if(data.status === 200) {
                data.json().then((data) => {
                    setUser(data);
                    setKSession(data.token);
                })
                    
                }
                else {
                    setUser(null);
                    setFailedToLogin(true);
                }
            })
            
        });
    }
    const handleLoginForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            username: { value: string };
            password: { value: string };
        };
        const username = target.username.value;
        const password = target.password.value;
        login(username,password);
    }


    useEffect(() => {
        if (user) {
            fetch('/api/rooms/getBookableRooms?' + new URLSearchParams({
                'session': encodeURI(user.token),
                'flik':'FLIK_0001'
            })).then((data) => {
                data.json().then((data) => {
                    setBookableRooms(data);
                })
            })


            const requests = [];
            for (let index = 0; index < 8; index++) {
                const date = new Date().setDate(new Date().getDate() + index);
                requests.push( fetch('/api/rooms/getRooms?'+ new URLSearchParams({
                    'flik': "FLIK_0001",
                    'datum': new Date(date).getFullYear().toString().slice(-2) + "-" + (new Date(date).getMonth() + 1).toString().padStart(2, '0') + "-" + new Date(date).getDate().toString().padStart(2, '0'),
                    'session': encodeURI(user?.token) ?? ""
                })));
            }
            Promise.all(requests).then((data) => {
                Promise.all(data.map((d) => d.json())).then((data) => {
                    setDays(data);
                })
            }
            );

        }

    }, [user]);

    useEffect(() => {
        if(days.length > 0){
            const timeslotDays = [];
            for (let index = 0; index < days.length; index++) {
                const day = days[index];
                const timeslotDay:number[] = [];
                for (let index = 0; index < day.length; index++) {
                    const room = day[index];
                    for (let index = 0; index < room.timeSlots.length; index++) {
                        const timeslot = room.timeSlots[index];
                        if(timeslot.isBookable){
                            if (timeslotDay[index] === undefined) {
                                timeslotDay[index] = 1;
                            
                            }
                            else {
                                timeslotDay[index] += 1;
                            }

                            
                        }else{
                            if (timeslotDay[index] === undefined){
                                timeslotDay[index] = 0;
                            }
                        }
                    }
                }
                timeslotDays.push(timeslotDay);
            }
            setTimeslotDays(timeslotDays);
        }
    }, [days]);




    return (
        <>
        <Transition
        show={bookedRoom !== null}
        enter="transition-opacity duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        >
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg p-4">
                    <h1 className="text-2xl font-bold">{t("booked")}</h1>
                    <p>{bookedRoom}</p>
                </div>
            </div>
        </Transition>
        <div className="h-full flex w-full flex-col justify-center items-center flex-1 dark:text-white">
          {
                    selectedDay === null && selectedTime === null && timeslotDays.length > 0 && days.length > 0 && user &&
                    <>
                        <div className="max-w-xl w-full flex  flex-col items-center justify-center ">
                        <div className="self-start " >
                            <Button className="mb-10" onClick={() => setShowRooms(!showRooms)} buttonStyle={"outlined"}>{showRooms ? t('times') :t("rooms")}</Button>
                            </div>
                            <div className="w-full">
                            {showRooms && <RoomList rooms={bookableRooms} />}
                            </div>
                        </div>{ !showRooms &&
            <TimeSlotSelector days={timeslotDays} onSelected={
                (day, time) => {
                    setSelectedDay(day);
                    setSelectedTime(time);
                }
                                
                            } />}</>}
          
            
          {
                selectedDay !== null && selectedTime !== null &&
                <>
                <Button onClick={() => {
                    setSelectedDay(null);
                    setSelectedTime(null);
                }}
                buttonStyle="ghost"
                >Back</Button>
                <TimeView day={days[selectedDay]} timeSlot={selectedTime} bookRoom={(room)=>{
                     const date = new Date().setDate(new Date().getDate() + selectedDay);
                     const dateString =new Date(date).getFullYear().toString().slice(-2) + "-" + (new Date(date).getMonth() + 1).toString().padStart(2, '0') + "-" + new Date(date).getDate().toString().padStart(2, '0');
                        if(user){
                            console.log(user)
                        fetch('/api/rooms/bookRoom?'+ new URLSearchParams({
                            'flik': "FLIK_0001",
                            'datum': dateString,
                            'session': encodeURI(user?.token) ?? "" ,
                            'room': room,
                            'timeSlot': selectedTime.toString()
                        })).then((data) => {
                          if(data.ok){
                            setBookedRoom(room);
                          }



                        }
                        );
                    }




                }}  />
                </>
          }
          {
            user === null &&
          <form onSubmit={handleLoginForm} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <label className="text-sm" htmlFor="username">Username</label>
                                <input type="text" name="username" onChange={()=>setFailedToLogin(false)} className={`${failedToLogin && "border-red-500 dark:border-red-500 dark:placeholder:text-red-500/100"} duration-300 transition-all dark:bg-black dark:border-white dark:text-white rounded-lg dark:placeholder:text-white/50  border-2 `} placeholder="Kronox Username"/>
            
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm" htmlFor="password">Password</label>
                                <input type="password" name="password" onChange={()=>setFailedToLogin(false)} className={`${failedToLogin && "border-red-500 dark:border-red-500 dark:placeholder:text-red-500/100"} duration-300 transition-all dark:bg-black dark:border-white dark:text-white rounded-lg dark:placeholder:text-white/50  border-2 `} placeholder="Kronox Password"/>
          
            </div>  
            
            <input type="submit" value="Sign In" className="mt-2 select-none bg-white border-black border-2 px-6 py-2 text-black rounded-xl hover:bg-black hover:text-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black dark:border-white cursor-pointer" />
            </form>
          }

        </div>
        </>
        
    );
}
export async function getStaticProps({ locale }: any) {
    
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            // Will be passed to the page component as props
        },
    };
}
export default Rooms;
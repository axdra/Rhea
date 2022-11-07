import { NextPage } from "next";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { IKronoxUserAuthResponse } from "../../utils/src/types/user";
import { useEffect, useState } from "react";
import { getRooms } from "../../utils/src/rooms";
import { IKronoxBookingRoom } from "../../utils/src/types/booking";

const Rooms: NextPage = () => { 
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = useTranslation();
    const { supabaseClient } = useSessionContext();
    const [user, setUser] = useState<IKronoxUserAuthResponse>();
    const [rooms, setRooms] = useState<IKronoxBookingRoom[]>([]);
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
                data.json().then((data) => {
                    setUser(data);
                })
            }
            );
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
        if(user){
       
        fetch('/api/rooms/getRooms?'+ new URLSearchParams({
            'flik': "FLIK_0001",
            'datum': "22-11-07",
            'session': encodeURI(user?.token) ?? ""
        })).then((data) => {
            data.json().then((data) => {
                setRooms(data);
            })
        }
        );
        }
    }, [user]);

    return (
        <div className="h-full flex w-full flex-col justify-center items-center flex-1 dark:text-white">
          { user ? (<div className='flex flex-col gap-2'>
                    <div className='flex flex-row gap-2'>
                        <div className='font-medium'>{t('name')}</div>
                        <div className=''>{user.name}</div>
                    </div>
                    {
                        <table className="flex flex-col gap-2 ">
                            {rooms.map((room) => {
                                return (
                                    <tr className="w-full flex-1 flex flex-row gap-2">
                                        <td className="px-4 py-2  ">{room.id}</td>
                                        {room.timeSlots.map((timeSlot) => {
                                            return (
                                                <td className={`px-3 flex-1 py-2 text-center ${timeSlot.isBookable ? "bg-green-500/10 text-green-500" : 'bg-red-500/10 text-red-500'}`}>
                                                   {timeSlot.isBookable ? "Ledig" : timeSlot.bookedBy}
                                                </td>
                                            )
                                        })}
                                        
                                        
                                    </tr>
                                )
                            })}
                            
                        </table>
                    }
                    </div>)
                    : (<div className='flex flex-col gap-2'>
                       <form className="text-black" onSubmit={handleLoginForm}>

                        <input type={"text"} name="username" ></input>
                        <input type={"password"} name="password"></input>
                        <button type="submit">{t('login')}</button>
                       </form>
                        </div>)
                    
          }
        </div>
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
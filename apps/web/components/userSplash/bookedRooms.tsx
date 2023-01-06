import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useUserContext } from "../../context/usercontext";
import Button from "../Button";
const api = process.env.NODE_ENV === "development" ? "http://localhost:3000/api" : "/api";


const BookedRooms: FC = () => {
    const { t } = useTranslation();
    const {getKSession} = useUserContext();
    const [bookedRooms, setBookedRooms] = useState<any[] | null>(null);
    const [kSession, setKSession] = useState<any>(null);
    
    useEffect(() => {
        getKSession().then((session:string) => {
            setKSession(session);
        });
    }, []);


    useEffect(() => {
        if (kSession) {
            fetch(api + '/user/bookings',
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `${kSession.token}`,
                    },
                }
            ).then(res => res.json()).then(data => {
                setBookedRooms(data.splice(0, 3));
            }
            ).catch()
        }
    }, [kSession]);

    return <div className="px-4 py-2  pb-6 flex flex-col flex-1" >
        <h1 className='text-2xl font-medium'>{t('bookedRooms')}</h1>
        <div className='flex flex-col flex-1 items-center gap-2 pt-2'>
            { bookedRooms && bookedRooms.length === 0 &&  <div className="flex h-full justify-center items-center">{t('noBookedRooms')}</div> }
            {
                bookedRooms?.map((room) => {
                    return <div className='flex  justify-between px-4 py-2 items-center rounded-lg dark:bg-neutral-900/20 w-full border-2 dark:border-white/20'>
                        <div>
                        <h1>{room.name}</h1>
                        <h1>{room.date}</h1>
                        </div>
                        <div>
                        <h1>{room.startTime}</h1>
                        <h1>{room.endTime}</h1>
</div>
                    </div>
                })
            }
        </div>
        <Button buttonType="link" buttonStyle="ghost"  href={"/rooms"} >
                    {t('manageBookings')}
                    </Button>
    </div>

};

export default BookedRooms;
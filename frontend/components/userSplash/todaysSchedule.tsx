import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/ui/dist/cjs/components/Auth/UserContext";
import { useTranslation } from "next-i18next";
import { FC, useEffect, useState } from "react";


const TodaysSchedule: FC = () => {
    const { t } = useTranslation();
    const user = useUser();
    const { supabaseClient } = useSessionContext();
    const [schedule, setSchedule] = useState([]);
    useEffect(() => {
        supabaseClient.auth.getSession().then((session) => {
            fetch('/api/user/today',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${session.data.session?.access_token}`
                    }
                }
            ).then((data) => {
                data.json().then((data) => {
                    setSchedule(data);
                })
            });
        });
    }, [user]);
    return <div className="px-4 py-2 flex flex-col flex-1" >
        <h1 className='text-2xl font-medium'>{t('todaysSchedule')}</h1>
        <div className='flex flex-col gap-2 flex-1'>
            {schedule.filter((x:any) => new Date(x.end_time) > new Date()).length > 0 ?
                schedule.sort((z:any, y:any) => { return (new Date(z.start_time).getTime() - new Date(y.start_time).getTime()) }).filter((x:any) => new Date(x.end_time) > new Date()).map((item: any) => {
                        return (
                            <div key={item.id} className='flex flex-row gap-2 bg-neutral-50 dark:bg-neutral-900 px-3 py-3 w-full rounded-xl'>
                                <div className='flex flex-col gap-2 w-full'>
                                    <div className='grid grid-cols-4 gap-2 w-full'>
                                        <div className='flex flex-col col-span-3'>
                                            <div className=' font-medium line-clamp-1'>{item.name}</div>
                                            <div className=''>{item.room}</div>
                                        </div>
                                        <div className='flex flex-col col-span-1 text-right'>
                                            <div className=''>{new Date(item.start_time).toLocaleTimeString('sv-SE', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}</div>
                                            <div className=''>{new Date(item.end_time).toLocaleTimeString('sv-SE', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                        
                                            })}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                
                : 
                <div className='flex flex-row flex-1 justify-center items-center'>
                    {t('nothingToday')}
                </div>

            }
                    </div>

    </div>

};

export default TodaysSchedule;
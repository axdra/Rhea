import { NextPage } from "next";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//@ts-ignore
import ReactMarkdown from 'react-markdown'
import { IUnionEvent } from ".";



const Union: NextPage = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    const eventName = router.query.event as string
    const name = router.query.name as string
    const [event, setEvent] = useState<IUnionEvent>()
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    useEffect(() => {
        if (eventName) {
            fetch(`/api/unions/event?unionName=${name}&eventName=${eventName}`).then
                (res => res.json()).then(data => {
                    setEvent(data.event)
                }
            ).finally(() => setLoading(false))
                
        }
    }, [eventName]);
    if (loading) {
        return <div className="h-full flex flex-1 items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-l-2 border-r-2 border-gray-900"></div>

        </div>
    }
    return (
        <div className="h-full flex  flex-1 justify-center dark:text-white pt-10 gap-5 relative">
            
            <img src={event?.cover_image} alt="background image" className="select-none absolute top-0 left-0 w-full opacity-10 h-full cover  object-cover -z-20" />
            <div className="absolute top-0 left-0 h-full w-full  bg-gradient-to-t  to-white/50 from-white -z-10" />


            <div className="max-w-6xl px-10 w-full flex gap-10 flex-col-reverse md:flex-row  ">

                <div className="prose flex-1 relative dark:prose-invert">
                <h1>{event?.title}</h1>  
                <ReactMarkdown >
                    {event?.description || ''}
                </ReactMarkdown>
                </div>
                <div>
            <div className="shadow-md rounded-md flex flex-col w-full md:w-72 px-4 py-6 prose bg-white ">
                        <h3 >Event Info</h3>
                        {
                            event?.start_time && <p className="mt-1 mb-1"><>When: {new Date(event?.start_time).toLocaleDateString('sv-SE', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                        })}</></p>}
                        {

                        event?.start_time && <p className="mt-1 mb-1"><>Start: {new Date(event?.start_time).toLocaleTimeString('sv-SE', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</></p>
                        }
                        {
                         event?.end_time && <p className="mt-1 mb-1"><>End: {new Date(event?.end_time).toLocaleTimeString('sv-SE', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</></p>
                        }
                        {
                            event?.coordinates ? <p className="mt-2 mb-2">Location: <a href={`https://www.google.com/maps/search/?api=1&query=${event?.coordinates}`}>{event?.location}</a></p>:
                        <p className="mt-2 mb-2">Location: {event?.location}</p>
                }

                        {event?.cost && <p className="mt-2 mb-2">Cost: <span className="font-bold">{event?.cost}</span> kr</p>}

                </div>
                </div>
            </div>
        </div>
    );
}


export default Union;
import { NextPage } from "next";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//@ts-ignore
import ReactMarkdown from 'react-markdown'
import { IUnion, IUnionEvent } from ".";



const Union: NextPage = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    const eventName = router.query.event as string
    const name = router.query.name as string
    const [event, setEvent] = useState<IUnionEvent>()
    const [union, setUnion] = useState<IUnion>()
    const [loading, setLoading] = useState(true);
    const [going, setGoing] = useState(false);
    const [interested, setInterested] = useState(false);
    const { t } = useTranslation();
    useEffect(() => {

        if (eventName) {
            fetch(`/api/unions/event?unionName=${name}&eventName=${eventName}`).then
                (res => res.json()).then(data => {
                    setEvent(data.event)
                    setUnion(data.union)

                }
            ).finally(() => setLoading(false))
                
        }
    }, [eventName]);
    if (loading) {
        return <div className="h-full flex flex-1 items-center justify-center">
            <svg className="animate-spin  h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>

        </div>
    }
    if(!event && !loading) {
        return <div className="h-full flex flex-col flex-1 items-center justify-center text-orange-500">
            <h1 className="text-4xl font-bold">Event not found</h1>
          <Link href={`/unions/${name}`}>
              <a className="text-orange-500 hover:text-orange-600">Go back to {name}</a>
            </Link>


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
            <div className="shadow-md rounded-md flex flex-col w-full md:w-72 px-4 py-6 prose bg-white dark:bg-black  dark:border dark:border-white dark:prose-invert ">
                        <h3 >{t('eventInfo')}</h3>
                        {
                            event?.start_time && <p className="mt-1 mb-1"><>{t('when')}: {new Date(event?.start_time).toLocaleDateString('sv-SE', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                        })}</></p>}
                        {

                            event?.start_time && <p className="mt-1 mb-1"><>{t('start')}: {new Date(event?.start_time).toLocaleTimeString('sv-SE', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</></p>
                        }
                        {
                         event?.end_time && <p className="mt-1 mb-1"><>{t('end')}: {new Date(event?.end_time).toLocaleTimeString('sv-SE', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</></p>
                        }
                        {
                            event?.coordinates ? <p className="mt-2 mb-2">{t('where')}: <a href={`https://www.google.com/maps/search/?api=1&query=${event?.coordinates}`}>{event?.location}</a></p>:
                                <p className="mt-2 mb-2">{t('where')}: {event?.location}</p>
                }

                        {event?.cost && <p className="mt-2 mb-2">Cost: <span className="font-bold">{event?.cost}</span> kr</p>}
                        <div className="flex gap-2 justify-between">
                            <div className={`text-center flex-1 border select-none border-green-500 bg-green-500/10  rounded-md px-4 py-2 text-green-900 dark:text-green-500 font-bold hover:bg-green-500/50 transition-all cursor-pointer duration-500 ${interested && "bg-green-500 text-white/100 dark:text-white/100"}`} onClick={()=> setInterested(!interested)} >{t('interested')}</div>
                            <div className={`text-center flex-1 border select-none border-blue-500 bg-blue-500/10  rounded-md px-4 py-2 text-blue-900 dark:text-blue-500 font-bold hover:bg-blue-500/50 transition-all cursor-pointer duration-500 ${going && "bg-blue-500 text-white/100 dark:text-white/100" }`} onClick={()=> setGoing(!going)}>{t('going')}</div>
                        </div>
                    </div>
                  
                </div>
            </div>
        </div>
    );
}
export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common"])),
    },
});

export const getStaticPaths = async () => {
    return {
        paths: ["/unions/name/event"],
        fallback: true,
    };
};


export default Union;
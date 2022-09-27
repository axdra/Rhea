import { NextPage } from "next";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

    export interface IUnionSideBar {
        items: {
            name: string;
            url: string;
        }[];
    }

    export interface IUnionPage {
        sidebar: IUnionSideBar;
        id: string;
    }

    export interface IUnionEvent {
        id: number;
        created_at: Date;
        creator: string;
        title: string;
        cover_image: string;
        description: string;
        short_description: string;
        url_slug: string;
        start_time: Date;
        end_time: Date;
        location: string;
        coordinates: string;
        interested?: any;
        going?: any;
        cost: number;
        union: string;
    }

    export interface IUnion {
        name: string;
        id: string;
        cover_image: string;
        description: string;
        color: string;
        unionpage: IUnionPage[];
        unionevents: IUnionEvent[];
    }

const Union: NextPage = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    const name = router.query.name as string
    const [loading, setLoading] = useState(true);
    const [union, setUnion] = useState<IUnion>();
    const { t } = useTranslation();

    useEffect(() => {
        if (name) {
            fetch('/api/unions/page?q=' + name).then(res => res.json()).then(data => {
                setUnion(data.union);
            }
            ).finally(() => {
                setLoading(false);
            })
        }
    }, [name]);
    return (
        <div className="h-full flex flex-1 justify-center dark:text-white mt-10 gap-5">
            <div className="prose max-w-6xl px-10 w-full relative">
                <img src={union?.cover_image} alt={union?.name} className="absolute  -z-50 -left-20 -top-32 opacity-5" />

                <h1>{union?.name}</h1>
                <p>{union?.description}</p>
                <h2>{t('unionEvents')}</h2>
                <div className="grid grid-cols-3 gap-4">
                    {union?.unionevents.map((event) => {
                        return (
                                <Link key={event.id} href={`/unions/${union.name.toLowerCase()}/${event.url_slug}`}>
                                <a className="aspect-square w-full shadow-lg relative overflow-hidden rounded-lg">
                                    <img className="absolute  w-full  aspect-square object-cover top-0 mt-0" src={event.cover_image} alt={event.title} />
                                    <div className="absolute top-2 left-2  bg-white text-black rounded px-2 py-1">
                                        <div >{new Date(event.start_time).toLocaleDateString()}</div>

                                        <div >{new Date(event.start_time).toLocaleTimeString(
                                            'sv-SE',
                                            {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            }
                                        )}</div>

                                    </div>
                                    <div className="top-2 right-2 absolute">
                                        {event.cost > 0 ? <div className=" text-green-600 px-3  border-2  rounded-full border-green-400 bg-green-200 ">{event.cost} kr</div> : <div className="text-green-600 px-3  border-2  rounded-full border-green-400 bg-green-200 ">Free</div>}
                                    </div>
                                    <div className="absolute bottom-0 w-full bg-black bg-opacity-50 px-2 py-3">
                                    
                                        <h3 className="text-white mt-0">{event.title}</h3>
                                        <p className="text-white mb-1">{event.short_description}</p>
                               
                                    </div>


                                    </a>
                                </Link>
                        )
                    })}
                    
                </div>

            </div>
            <div className="w-64">
                <h2 className="text-lg text-bold">{t('unionSidebar')}</h2>
                {union?.unionpage[0].sidebar.items.map((page) => { 
                    return (
                        <Link key={page.name} href={`${page.url}`}>
                            <a>
                                <h3>{page.name}</h3>
                            </a>
                        </Link>
                    )
                })}
                
            </div>

        </div>
    );
}


export default Union;
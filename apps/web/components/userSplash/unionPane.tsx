import { useTranslation } from "next-i18next";
import { FC } from "react";

interface IUnionPaneProps {
    events: any[];
}

const UnionPane: FC<IUnionPaneProps> = (props) => {
    const { t } = useTranslation();
    return <div className="h-full px-4 pt-2 flex flex-col ">
        <h1 className='text-2xl font-medium'>{t('unionEvents')}</h1>
        <div className="flex gap-6 px-2 pt-4 pb-6 flex-1 ">
        {
            props.events.map((event,n) => {
                return <div
                    className="w-1/4 rounded-lg dark:bg-neutral-900/20  h-full p-4 border-2 dark:border-white/20 justify-between flex flex-col  relative group cursor-pointer"
                    key={event.union.name +'/'+ event.url_slug}

                >                 


                    <div >
                    <div className="mb-4" >
                    <h1 className="text-lg font-bold line-clamp-1">{event.title}</h1>
                            <h2 className="text-sm mb-2 "
                                style={{
                                    color: event.union.color
                                }} 
                            >{event.union.name}</h2>
                    {
                        event.cover_image ? <img aria-label="cover-image" className="w-full object-cover h-24 rounded-lg border-2 dark:border-white" src={event.cover_image} /> : <div className="w-full h-24 rounded-lg border-2 dark:border-white" style={{
                            backgroundColor: event.union.color
                        }} />
                        }
                    </div>
              
                        <p className="text-sm line-clamp-2">{event.short_description}</p>
                 
                    <div className="flex justify-between text-sm">
                        <div>
                            {
                                new Date(event.start_time).toLocaleDateString("sv-SE", {
                                    month: "long",
                                    day: "numeric"
                                })
                            }
                            </div>
                        <div>
                            {new Date(event.start_time).toLocaleTimeString("sv-SE",{
                                hour: "numeric",
                                minute: "numeric"
                            })}
                        </div>                
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div>{event.cost && <>
                            {event.cost} kr
                        </>}
                        </div>
                        <div>

                            {event.location}
                            </div>
                    </div>
                    <a href={`/unions/${event.union.name}/${event.url_slug}`} className="absolute top-0 left-0 w-full h-full bg-black hover:opacity-90 opacity-0 duration-300 rounded-lg flex justify-center items-center">
                            
                        {t('viewEvent')}
                    </a>
                </div>
            })
        }
        </div>
        </div>

};

export default UnionPane;
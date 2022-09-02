import { useState } from "react";
import dayjs from "dayjs";
interface IEvent {
    id: number;
    created_at: Date,
    parent_calendar: number,
    name: string,
    room: string,
    program?: string,
    group?: string,
    teacher?: string,
    aid?: string,
    last_update: Date,
    start_date: Date,
    end_date: Date
}

const Schema: React.FC<{ events: any[] }> = ({ events }) => {
    let lastEventDate = new Date();
    let currWeek = 0;
    return <div className="flex flex-col gap-4">
        
        {events.length > 0 && events.map((event: IEvent) => {
            const nextWeek = !dayjs(lastEventDate).isSame(event.start_date, 'week');
            const thisWeek = dayjs(new Date()).isSame(event.start_date, 'week');
            const futureWeek = dayjs(event.start_date).diff(new Date(), 'week');
            const showFutureWeek = futureWeek > 1 && currWeek !== futureWeek;
            currWeek  = futureWeek;
            lastEventDate = event.start_date;
            let date = new Date(event.start_date).toLocaleDateString('sv-SE', {
                weekday: 'long',
            });
            if (!thisWeek) {
                 date = new Date(event.start_date).toLocaleDateString('sv-SE', {
                     weekday: 'long',
                     month: 'long',
                     day: 'numeric'
                    
                });
            }
            return (<>
                {futureWeek === 1 && nextWeek && <h2>Next week</h2>}
                {thisWeek && <h2>This week</h2>}
                {showFutureWeek && <h2>In {futureWeek} weeks</h2>}
                
                <div
                    key={event.id}
                    className="flex flex-row gap-6 items-center justify-between border rounded-xl border-gray-200 bg-orange-50/20 py-5 px-4 shadow-sm sm:gap-2 hover:shadow transition-all duration-300">
                    <div>

                        <h2>
                            {event.name}
                        </h2>
                        <h3 className="font-medium flex gap-1">
                            {event.room.split(' ').map((room) => {
                                return (
                                    <a key={room} className="text-orange-500 underline" href={`/map?q=${room}`}>
                                        {room}
                                    </a>
                                )
                            })}
                        </h3>

                    </div>
                    <div>
                        <h3 className="text-right">{new Date(event.start_date).toLocaleTimeString('sv-SE', {
                            hour: 'numeric',
                            minute: 'numeric'

                        })} - {new Date(event.end_date).toLocaleTimeString('sv-SE', {

                            hour: 'numeric',
                            minute: 'numeric'

                        })}</h3>
                        <h3 className="text-right">
                {date}
                        </h3>
                    </div>

                </div>
            </>
            )
        }
        )}
    </div>
}
export default Schema;
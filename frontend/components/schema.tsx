import { useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
export interface IEvent {
    id?: number;
    created_at: Date,
    parent_calendar: string,
    name: string,
    room: string,
    program?: string,
    group?: string,
    teacher?: string,
    aid?: string,
    last_update: Date,
    start_time: Date,
    end_time: Date
}

function getWeeksFromNow(date: Date) {
    const thisWeek = dayjs().startOf('week');
    const event = dayjs(new Date( date.getFullYear(), date.getMonth(), date.getDate()-date.getDay() ));
    return event.diff(thisWeek, 'week');
}

const Schema: React.FC<{ events: any[] }> = ({ events }) => {
    const { t } = useTranslation();

    let currWeek = 0;
    let firstWeek = true;
    return <div className="flex flex-col gap-4">
        
        {events.length > 0 && events.map((event: IEvent) => {
            const weeksFromNow = getWeeksFromNow(new Date(event.start_time));
            let newWeek = false;
            if (weeksFromNow !== currWeek) {
                currWeek = weeksFromNow;
                newWeek = true;
            }
            let date = new Date(event.start_time).toLocaleDateString('sv-SE', {
                weekday: 'long',
            });
            if (currWeek !== 0) {
                date = new Date(event.start_time).toLocaleDateString('sv-SE', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'

                });
            }
            let showFirstWeek =  firstWeek;
            firstWeek = false;
            return (<>
                {weeksFromNow === 1 && newWeek && <h2>{t('nextWeek')}</h2>}
                {newWeek && weeksFromNow > 1 && <h2>{t('inxWeek', { weeks: weeksFromNow.toString() })} </h2>}
                {showFirstWeek && weeksFromNow === 0 && <h2>{t('thisWeek') }</h2>}
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
                        <h3 className="text-right">{new Date(event.start_time).toLocaleTimeString('sv-SE', {
                            hour: 'numeric',
                            minute: 'numeric'

                        })} - {new Date(event.end_time).toLocaleTimeString('sv-SE', {

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
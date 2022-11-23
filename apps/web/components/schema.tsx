import { useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { Database } from "../../../types.gen";
export interface IEvent {
  id?: number;
  created_at: Date;
  parent_calendar: string;
  name: string;
  room: string;
  program?: string;
  group?: string;
  teacher?: string;
  aid?: string;
  last_update: Date;
  start_time: Date;
  end_time: Date;
}

function getWeeksFromNow(date: string | Date | null) {
  const thisWeek = dayjs().startOf("week");
  const event = dayjs(date ?? new Date());
  return event.diff(thisWeek, "week");
}

type Event = Database["public"]["Tables"]["events"]["Row"];

type Props = {
  events?: Event[];
};

const Schema: React.FC<Props> = ({ events }) => {
  const { t } = useTranslation();
const time = new Intl.RelativeTimeFormat("sv-SE", {
  numeric: "auto",
});
  let currWeek = 0;
  let firstWeek = true;
  return (
    <div className="flex flex-col gap-4">
      {events?.map((event: Event) => {
        const weeksFromNow = getWeeksFromNow(event?.start_time);
        let newWeek = false;
        if (weeksFromNow !== currWeek) {
          currWeek = weeksFromNow;
          newWeek = true;
        }
        let date = new Date(event?.start_time ?? new Date()).toLocaleDateString("sv-SE", {
          weekday: "long",
        });
        if (currWeek !== 0) {
          date = new Date(event.start_time ?? new Date()).toLocaleDateString("sv-SE", {
            weekday: "long",
            month: "long",
            day: "numeric",
          });
        }
        let showFirstWeek = firstWeek;
        firstWeek = false;
        return (
          <>
            {weeksFromNow === 1 && newWeek && <h2>{t("nextWeek")}</h2>}
            {newWeek && weeksFromNow > 1 && (
              <h2>{t("inxWeek", { weeks: weeksFromNow.toString() })} </h2>
            )}
            {showFirstWeek && weeksFromNow === 0 && <h2>{t("thisWeek")}</h2>}
            <div
              key={event.id}
              className="flex flex-row gap-6 items-center justify-between border rounded-xl border-gray-200 bg-white/20 py-5 px-4 shadow-sm sm:gap-2 hover:shadow transition-all duration-300 dark:border-white dark:bg-black"
            >
              <div>
                <h2>{event.name}</h2>
                <h3 className="font-medium flex gap-1">
                  {event?.room?.split(" ").map((room) => {
                    return (
                      <a
                        key={room}
                        className="text-white-500 underline"
                        href={`/map?q=${room}`}
                      >
                        {room}
                      </a>
                    );
                  })}
                </h3>
              </div>
              <div>
                <h3 className="text-right">
                  {new Date(event.start_time ?? new Date()).toLocaleTimeString("sv-SE", {
                    hour: "numeric",
                    minute: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(event.end_time ?? new Date()).toLocaleTimeString("sv-SE", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </h3>
                <h3 className="text-right">{date}</h3>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};
export default Schema;

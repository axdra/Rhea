import { createServerSupabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import type { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CallToAction from "../components/splash/callToAction";
import Mock from "../components/splash/mock";
import BookedRooms from "../components/userSplash/bookedRooms";
import TodaysSchedule from "../components/userSplash/todaysSchedule";
import UnionPane from "../components/userSplash/unionPane";
import WeatherWidget from "../components/weatherWidget";
import Greet from "../utils/greeting";

type PageProps = {
  issues: any[] | null;
  weather_code: number;
  temp: number;
  events: any[] | null;
};

const Home: NextPage<PageProps> = ({ issues, weather_code, temp,events }) => {
  const { t } = useTranslation();
  const user = useUser();
  

  if (user) {
    return (
      <div className="flex justify-center pt-24 flex-1 bg-splash dark:bg-splash-dark  pb-20  ">
        <div className="max-w-[100rem] w-full flex  px-10 flex-col gap-10 ">
          <div className="flex justify-between items-center">
            <h1 className="text-5xl font-medium break-words dark:text-white ">
              {Greet(
                user
                  .email!.split("@")[0]
                  .split(".")
                  .map((x) => {
                    return x[0].toUpperCase() + x.slice(1);
                  })
                  .join(" "),
                t
              )}
            </h1>
            {weather_code && <WeatherWidget weather_code={"clearsky"} temp={temp} />}
          </div>
          <div className="relative w-full">

            <div className="grid 2xl:grid-cols-5 sm:grid-cols-2 grid-cols-1  w-full flex-1 gap-5 z-10 absolute top-0 opacity-50">
              <div className="col-span-1 dark:shadow-glow  h-96 rounded-xl flex flex-col" />
              <div className="col-span-1 dark:shadow-glow  h-96 rounded-xl flex flex-col" />
              <div className="2xl:col-span-3   sm:col-span-2 col-span-1 dark:shadow-glow  h-96 rounded-xl flex flex-col" />

            </div>

            <div className="grid 2xl:grid-cols-5 sm:grid-cols-2 grid-cols-1  w-full flex-1 gap-5 z-10 absolute top-0">
              <div className="col-span-1  border-black border-2 bg-white dark:text-white dark:bg-black dark:border-white h-96 rounded-xl flex flex-col">
                <TodaysSchedule />

              </div>
              <div className="col-span-1   border-black border-2 bg-white dark:text-white dark:bg-black dark:border-white h-96 rounded-xl flex flex-col">
                
                <BookedRooms />
              </div>
              <div className="2xl:col-span-3   sm:col-span-2 col-span-1 border-black border-2 bg-white dark:text-white dark:bg-black dark:border-white md:h-96 rounded-xl">
                  <UnionPane events={events || []}/>
              </div>

            </div>

          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center flex-1 bg-splash dark:bg-splash-dark pb-20 ">
      <div className="max-w-7xl w-full flex items-center px-4 flex-col lg:flex-row">
        <CallToAction />
        <Mock />
      </div>
    </div>
  );
};



export const getServerSideProps: GetServerSideProps<PageProps> =
  async ({ locale, ...context }) => {
    const { data: issues } = await createServerSupabaseClient(context).from("issues").select("*");
    const { data } = await createServerSupabaseClient(context).from("weather").select("*").match({ location: "mdu" }).single();
    const { data: events } = await createServerSupabaseClient(context).from("unionevents").select("cost, cover_image, end_time, start_time, short_description, url_slug, title,location, union(name,color)").limit(5);
    const temp = data?.temp || 0;
    const weather_code = data?.weather_code || "clearsky";
    return {
      props: {
        issues: issues ?? null,
        temp,
        weather_code,
        events,
        ...(await serverSideTranslations(locale as string, ['common'])),
      },
    };
  };

export default Home;
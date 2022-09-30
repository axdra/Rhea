import { createServerSupabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import type { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import CallToAction from "../components/splash/callToAction";
import Mock from "../components/splash/mock";
import BookedRooms from "../components/userSplash/bookedRooms";
import TodaysSchedule from "../components/userSplash/todaysSchedule";
import Greet from "../utils/greeting";

type PageProps = {
  issues?: any[];
};

const Home: NextPage<PageProps> = ({ issues }) => {
  const { t } = useTranslation();
  const user = useUser();

  if (user) {
    return (
      <div className="flex justify-center pt-24 flex-1 bg-splash dark:bg-splash-dark pb-20  ">
        <div className="max-w-[100rem] w-full flex  px-10 flex-col gap-10 ">
          <h1 className="text-5xl font-medium break-words ">
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
          <div className="grid 2xl:grid-cols-5 sm:grid-cols-2 grid-cols-1  w-full flex-1 gap-5">
            <div className="col-span-1 border-black border-2 bg-white h-96 rounded-xl flex flex-col">
              <TodaysSchedule />
            </div>
            <div className="col-span-1 border-black border-2 bg-white h-96 rounded-xl flex flex-col">
              <BookedRooms />
            </div>
            <div className="2xl:col-span-3 sm:col-span-2 col-span-1 border-black border-2 bg-white h-96 rounded-xl"></div>
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

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const { data: issues } = await createServerSupabaseClient(context).from("issues").select("*");

  return {
    props: {
      issues,
    },
  };
};

export default Home;

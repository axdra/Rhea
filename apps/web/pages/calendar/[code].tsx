import { UserIcon } from "@heroicons/react/24/outline";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  SupabaseClient,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Database } from "../../../../types.gen";
import getSchema from "../../utils/getSchema";
import Schema from "../../components/schema";
import Link from "next/link";
const api =
  process.env.NODE_ENV === "development" ? "http://localhost:3000/api" : "/api";
const prodURL =
  process.env.NODE_ENV === "development"
    ? "localhost:3000"
    : process.env.NEXT_PUBLIC_PROD_URL;

type Course = Database["public"]["Tables"]["courses"]["Row"];
type Calendar = Database["public"]["Tables"]["calendars"]["Row"];
type Event = Database["public"]["Tables"]["events"]["Row"];

type Props = {
  course?: Course;
  calendar?: Calendar;
  events?: Event[];
};

const Calendar: NextPage<Props> = ({ course, calendar, events }) => {
  //get Course query from url
  const { t } = useTranslation();

  const router = useRouter();

  const supabaseClient: SupabaseClient<Database> = useSupabaseClient();
  const user = useUser();

  const [subscribed, setSubscribed] = useState(false);

  const addToPersonalCalendar = async () => {
    if (!user || !calendar) return;
    
    await supabaseClient.from("personalcalendar").insert({
      user_id: user?.id,
      calendar_id: calendar?.id,
      created_at: new Date().toUTCString(),
    });
  };
  const subscribeToSchedule = async () => {
    window.open(
      "webcal://" + prodURL + "/api/subscription.ics?q=" + calendar?.code,
      "_blank"
    );
  };
  const navigateToMyCalendar = async () => {
    router.push("/user/calendar");
  };
  return (
    <div className="max-w-6xl mx-auto md:mt-12 mt-4 md:px-24 w-full px-4 py-10 shadow rounded-lg mb-24 flex-1 flex-col  dark:text-white xl:dark:border dark:border-white    ">
      <h1
        className="text-4xl font-medium mb-5 transition-all max-w-full"
        style={{
          wordWrap: "break-word",
        }}
      >
        <Link href={`/course/${course?.code}`}>{calendar?.name}</Link>
      </h1>
      <div className=" flex justify-between flex-1 items-center mb-4 flex-col sm:flex-row">
        <div className="flex-1 max-w-[50%] ">
          <h1 className="text-xl font-medium transition-all">
            {calendar?.code}
          </h1>
        </div>
        <div className="flex-1 justify-end flex items-center ">
          {events?.length !== 0 && (
            <div className="flex gap-5 ">
              <div
                className="flex py-2 px-4 gap-2 items-center  justify-center hover:bg-orange-100 rounded-lg hover:text-orange-500 cursor-pointer hover:font-bold transition-colors dark:hover:text-white dark:bg-black dark:border-white dark:hover:bg-orange-700 dark:border"
                onClick={subscribeToSchedule}
              >
                <p>{t("addToCalendar")}</p>
                <CalendarIcon className="h-8 w-8 text-orange-500" />
              </div>
              {user && (
                <div
                  className="flex py-2 px-4 gap-2 items-center justify-center hover:bg-orange-100 rounded-lg hover:text-orange-500 cursor-pointer hover:font-bold transition-colors dark:hover:text-white dark:bg-black dark:border-white dark:hover:bg-orange-700 dark:border"
                  onClick={
                    subscribed ? navigateToMyCalendar : addToPersonalCalendar
                  }
                >
                  {subscribed ? (
                    <p>{t("goToPersonalCalendar")}</p>
                  ) : (
                    <p> {t("addToPersonalCalendar")}</p>
                  )}
                  <UserIcon className="h-8 w-8 text-orange-500" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {events?.length === 0 && (
        <div className="flex-1 min-h-full flex justify-center ">
          <h2>{t("noResults")}</h2>
        </div>
      )}

      <Schema events={events} />
    </div>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const supabaseClient = createServerSupabaseClient<Database>(ctx);

  const code = ctx.query.code as string;
  const { data: calendar } = await supabaseClient
    .from("calendars")
    .select("*")
    .eq("code", code)
    .single();
  const { data: course } = await supabaseClient
    .from("courses")
    .select("*")
    .eq("id", calendar?.parent_course)
    .single();

  const events = await getSchema(code);

  return {
    props: {
      course: course ?? null,
      calendar: calendar ?? null,
      events: events?.events ?? [],
      ...(await serverSideTranslations(ctx.locale as string, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

export default Calendar;

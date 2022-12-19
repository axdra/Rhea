import { CalendarIcon } from "@heroicons/react/24/solid";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import {
  SupabaseClient,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { Database } from "../../../../types.gen";
import Button from "../../components/Button";
import getSchema from "../../utils/getSchema";

//if in dev mode, use local api
const api =
  process.env.NODE_ENV === "development" ? "http://localhost:3000/api" : "/api";
const url =
  process.env.NODE_ENV === "development"
    ? "localhost:3000"
    : process.env.NEXT_PUBLIC_PROD_URL;

type PersonalCalendar = Database["public"]["Tables"]["personalcalendar"]["Row"];
type Calendar = Database["public"]["Tables"]["calendars"]["Row"];

type Props = {
  personalCalendars?: (PersonalCalendar & { calendar: Calendar })[];
};

const UserCalendar: NextPage<Props> = ({ personalCalendars }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const supabaseClient: SupabaseClient<Database> = useSupabaseClient();

  const removeCalendar = async (calendar: PersonalCalendar) => {
    await supabaseClient
      .from("personalcalendar")
      .delete()
      .eq("id", calendar.id);
    router.replace(router.asPath);
  };

  const subscribeToSchedule = async () => {
    supabaseClient.auth.getSession().then((session) => {
      window.open(
        "webcal://" +
          url +
          "/api/user/personalsubscription.ics?q=" +
          session.data.session?.user.id,
        "_blank"
      );
    });
  };
  return (
    <div className="max-w-6xl mx-auto md:mt-12 mt-4 md:px-24 w-full px-4 py-10 shadow rounded-lg mb-24 flex-1 flex-col  dark:text-white xl:dark:border dark:border-white    ">
      <div className="flex  justify-between items-center mb-4">
        <h1 className="text-2xl ">{t("personalCalendar")}</h1>
        <Button buttonStyle="outlined" className="flex gap-2 justify-center items-center py-4" 
          onClick={subscribeToSchedule}
        >
          <p>{t("addToCalendar")}</p>
          <CalendarIcon className="h-5 w-5 " />
        </Button>
      </div>
      <div className="gap-5 flex flex-col">
        {personalCalendars?.map((calendar) => {
          return (
            <div
              key={calendar.id}
              className="flex sm:flex-row gap-6 flex-col items-center justify-between border rounded-xl dark:bg-black dark:border-white  border-gray-200 bg-orange-50/20 py-5 px-4 shadow-sm sm:gap-2  hover:shadow transition-all duration-300"
            >
              <div className="flex-1">
                <h2 className="line-clamp-1 ">{calendar.calendar.name}</h2>
                <h3 className="font-medium">{calendar.calendar.code}</h3>
              </div>
              <div className="flex gap-2 flex-1 justify-end">
                <Button buttonType="link" buttonStyle="outlined"
                  href={`/calendar/${calendar.calendar.code}`}
                >
                  {t("goToCalendar")}
                </Button>
                <Button buttonStyle="outlined" 
                  className="text-red-500 hover:text-red-700 dark:text-red-500  "
                  onClick={() => removeCalendar(calendar)}
                >
                  Remove
                </Button>
              </div>
            </div>
          );
        })}
        {personalCalendars?.length === 0 && (
          <div className="flex flex-col flex-1 mt-20 items-center justify-center">
            <h1 className="text-xl ">{t("notSubscribedToAnyCalendar")}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = withPageAuth({
  async getServerSideProps(
    ctx: GetServerSidePropsContext,
    supabaseClient: SupabaseClient<Database>
  ) {
    const { data: user } = await supabaseClient.auth.getUser();

    const { data: personalCalendars } = await supabaseClient
      .from("personalcalendar")
      .select("*, calendar:calendar_id(*)")
      .eq("user_id", user.user?.id);

    return {
      props: {
        personalCalendars: personalCalendars ?? [],
        ...(await serverSideTranslations(ctx.locale as string, ["common"])),
        // Will be passed to the page component as props
      },
    };
  },
});

export default UserCalendar;

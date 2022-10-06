import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { Database } from "../../../../types.gen";

type Course = Database["public"]["Tables"]["courses"]["Row"];
type Calendar = Database["public"]["Tables"]["calendars"]["Row"];

type Props = {
  course?: Course;
  calendars?: Calendar[];
};

const Course: NextPage<Props> = ({ course, calendars }) => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl  w-full mx-auto md:mt-12 mt-4 md:px-24 px-4 py-10 shadow rounded-lg mb-24 flex-1 flex flex-col  xl:dark:border dark:border-white dark:text-white  ">
      <h1 className="text-4xl font-medium mb-5 xl:w-[72rem] transition-all  ">
        {course?.name}
      </h1>
      <h1 className="text-xl font-medium mb-5 xl:w-[72rem] transition-all  ">
        {course?.code}
      </h1>

      {calendars?.length === 0 && (
        <div className="flex-1 min-h-full flex justify-center  ">
          <h2>{t("noResults")}</h2>
        </div>
      )}

      <div className="flex flex-col  gap-5">
        {calendars?.map((calendar) => (
          <Link
            key={calendar.code}
            href={`/calendar/${calendar.code}`}
            className="flex sm:flex-row gap-6 flex-col items-center justify-between border rounded-xl dark:bg-black dark:border-white dark:hover:bg-orange-700 border-gray-200 bg-orange-50/20 py-5 px-4 shadow-sm sm:gap-2 hover:bg-gray-50 hover:shadow transition-all duration-300"
          >
            <div>
              <h2>{calendar.name}</h2>
              <h3 className="font-medium">{calendar.code}</h3>
            </div>
            <div>
              <div className="text-orange-500 hover:text-orange-700 py-2 px-5 bg-white shadow rounded-xl  whitespace-nowrap dark:border dark:hover:text-white dark:bg-black dark:border-white dark:hover:bg-orange-700">
                {t("goToCalendar")}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { data: course } = await createServerSupabaseClient<Database>(ctx)
    .from("courses")
    .select("*, calendars(*)")
    .ilike("code", ctx.query.code as string)
    .single();

  const calendars = course?.calendars as Calendar[];

  return {
    props: {
      course: course ?? null,
      calendars: calendars.sort((a, b) => a.code.localeCompare(b.code)) ?? [],
      ...(await serverSideTranslations(ctx.locale as string, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

export default Course;

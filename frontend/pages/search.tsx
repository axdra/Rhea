import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Database } from "../../types.gen";

type Course = Database["public"]["Tables"]["courses"]["Row"];

type Props = {
  courses?: Course[];
};

const Search: NextPage<Props> = ({ courses }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto md:mt-12 mt-4 md:px-24 px-4 py-10 shadow rounded-lg mb-24 flex-1 flex flex-col xl:dark:border dark:border-white dark:text-white     ">
      <h1 className="text-4xl font-medium mb-5 xl:w-[72rem] transition-all  ">
        {t("searchResultsFor", { name: router.query.q })}
      </h1>

      {courses?.length === 0 && (
        <div className="flex-1 min-h-full flex justify-center ">
          <h2>{t("noResults")}</h2>
        </div>
      )}
      <div>
        <ul className="flex flex-col gap-5">
          {courses?.map((course) => (
            <Link
              key={course.code}
              href={`/course/${course.code}`}
              className="flex sm:flex-row gap-6 flex-col items-center justify-between border rounded-xl dark:bg-black dark:border-white dark:hover:bg-orange-700 border-gray-200 bg-orange-50/20 py-5 px-4 shadow-sm sm:gap-2 hover:bg-gray-50 hover:shadow transition-all duration-300"
            >
              <div>
                <h2>{course.name}</h2>
                <h3 className="font-medium">{course.code}</h3>
              </div>
              <div>
                <div className="text-orange-500 hover:text-orange-700 py-2 px-5 bg-white shadow rounded-xl  whitespace-nowrap dark:hover:text-white dark:bg-black dark:border-white dark:hover:bg-orange-700 dark:border ">
                  {t("goToCourse")}
                </div>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const q = ctx.query.q as string;
  const searchTerm = q.split(" "); /*.map(w => `'${w}'`).join(' | ');*/
  let sbq = createServerSupabaseClient<Database>(ctx)
    .from("courses")
    .select("*");

  searchTerm.forEach((w) => {
    sbq = sbq.or(`name.ilike.%${w}%,code.ilike.%${w}%`);
  });

  const { data: courses } = await sbq;

  return {
    props: {
      courses: courses ?? [],
      ...(await serverSideTranslations(ctx.locale as string, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

export default Search;

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { Database } from "../../types.gen";
import Highlighter from "react-highlight-words";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

type Course = Database["public"]["Tables"]["courses"]["Row"];

type Props = {
  courses?: Course[];
  recentCourses?: Course[];
};

const Courses: NextPage<Props> = ({ courses,recentCourses }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const query = router.query.q as string;
  const [search, setSearch] = useState(query ?? "");

  const debouncedHandler = () => {
    router.push({
      query: { q: search },
    });
  };

  const debouncedValue = useDebouncedValue(search, 250)

  useEffect(debouncedHandler, [debouncedValue])

  return (
    <div className="container mx-auto md:mt-12 mt-4 md:px-24 px-8 py-10 shadow-md rounded-lg mb-24 flex-1 dark:text-white ">
      <input
        autoComplete="off"
        value={search}
        placeholder={t('search')}
        onChange={(e) => setSearch(e.target.value)}
        className=" form-input w-full md:w-auto rounded-xl shadow-sm border-2 border-black dark:border-white dark:bg-black bg-white text-black dark:text-white"
      />

     

      {courses?.length === 0 ? (
        <>
        <h1 className="mt-4 text-2xl font-medium mb-5 xl:w-[72rem] transition-all  ">
        {t("recentSearched")}
      </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 flex-wrap">
        {recentCourses?.map(e=>{
          return <Link key={e.code} href={'/course/'+e.code} className="  rounded-xl dark:border-white border-black border-2 px-5 py-4 hover:text-white hover:bg-black dark:hover:text-black dark:hover:bg-white duration-300 ">
            <h1 className="line-clamp-1">{e.name}</h1>
            <h2>{e.code}</h2>
          </Link>
        })
        }
        </div>
      
        </>): <h1 className="mt-4 text-2xl font-medium mb-5 xl:w-[72rem] transition-all  ">
      {t("searchResultsFor", { name: router.query.q })}
    </h1>}
      <div>
        <ul className="flex flex-col gap-5">
          {courses?.map((course) => (
            <Link
              key={course.code}
              href={`/course/${course.code}`}
              className="flex sm:flex-row gap-6 flex-col items-center justify-between border rounded-xl dark:bg-black dark:border-white dark:hover:bg-orange-700 border-slate-200 bg-orange-50/20 py-5 px-4 shadow-sm sm:gap-2 hover:bg-gray-50 hover:shadow transition-all duration-300"
            >
              <div>
                <h2>
                  <Highlighter
                    searchWords={query?.split(" ")}
                    textToHighlight={course.name}
                    highlightTag="span"
                    highlightClassName={
                      "underline decoration-2 decoration-orange-500"
                    }
                  />
                </h2>
                <h3 className="font-medium">
                  <Highlighter
                    searchWords={query?.split(" ")}
                    textToHighlight={course.code ?? ""}
                    highlightTag="span"
                    highlightClassName={
                      "underline decoration-2 decoration-orange-500"
                    }
                  />
                </h3>
              </div>
              <div>
                <div className="text-orange-500 dark:text-orange-400 hover:text-orange-600 py-2 px-5 bg-white shadow rounded-xl  whitespace-nowrap dark:hover:text-white dark:bg-black dark:border-white dark:hover:bg-orange-700 dark:border ">
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

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
  const q = ctx.query.q as string;

  const data = await createServerSupabaseClient<Database>(ctx).from('courses').select('*, calendars(*)')
  /* let latestsCourses = data.data?.filter(c =>{
    const cals = (c.calendars as any[]).filter(cal => {
      if(cal.last_cache){
      return true
    }})
    if(cals.length > 0){
      return true
    }
  }) */
  const { data: courses } = await createServerSupabaseClient<Database>(ctx).rpc(
    "search_courses",
    { keyword: q }
  );

  return {
    props: {
      courses: (courses as Course[]) ?? [],
      recentCourses:  [], 
      ...(await serverSideTranslations(ctx.locale as string, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

export default Courses;

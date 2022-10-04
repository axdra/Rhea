import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext, NextPage } from "next";
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
};

const Search: NextPage<Props> = ({ courses }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const query = router.query.q as string;
  const [search, setSearch] = useState(query);

  const debouncedHandler = () => {
    router.push({
      query: { q: search },
    });
  };

  const debouncedValue = useDebouncedValue(search, 250)

  useEffect(debouncedHandler, [debouncedValue])

  return (
    <div className="max-w-6xl mx-auto md:mt-12 mt-4 md:px-24 px-4 py-10 shadow-md rounded-lg mb-24 flex-1 flex flex-col dark:text-white xl:border border-slate-200 dark:border-white">
      <input
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-input rounded-xl shadow-sm border-slate-200 dark:bg-gray-900"
      />

      <h1 className="mt-4 text-2xl font-medium mb-5 xl:w-[72rem] transition-all  ">
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

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const q = ctx.query.q as string;
  const searchTerm = q?.split(" "); /*.map(w => `'${w}'`).join(' | ');*/
  //   let sbq = createServerSupabaseClient<Database>(ctx)
  //     .from("courses")
  //     .select(searchTerm ? `*, ${!!searchTerm && searchTerm?.map(w => `word_similarity(name, '${w}') as name_${w}_score`)}` : '*');

  //     console.log(await sbq)

  //   searchTerm?.forEach((w) => {
  //     sbq = sbq.or(`name.ilike.%${w}%,code.ilike.%${w}%`);
  //   });

  //   const { data: courses } = await sbq;
  const { data: courses } = await createServerSupabaseClient<Database>(ctx).rpc(
    "search_courses",
    { keyword: q }
  );
  console.log(courses);

  return {
    props: {
      courses: courses ?? [],
      ...(await serverSideTranslations(ctx.locale as string, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

export default Search;

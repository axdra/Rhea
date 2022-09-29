import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const Course: NextPage = () => {
    //get Course query from url
    const {t} = useTranslation();
    const router = useRouter();
    const course = router.query.q as string;
    const [calendars, setCalendars] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [url, setUrl] = useState("");
    useEffect(() => {
        if (course) {
            fetch('/api/calendars?q=' + course).then
                (res => res.json()).then(data => {
                    setCalendars(data.calendars);
                    setName(data.name);
                    setCode(data.code);
                    setUrl(data.URL);

                }
                ).finally(() => {
                    setLoading(false);
                }
                )
        }
    }
        , [course]);
    return (
        <div className="max-w-6xl  w-full mx-auto md:mt-12 mt-4 md:px-24 px-4 py-10 shadow rounded-lg mb-24 flex-1 flex flex-col  xl:dark:border dark:border-white dark:text-white  ">
            <h1 className="text-4xl font-medium mb-5 xl:w-[72rem] transition-all  ">{name}</h1>
            <h1 className="text-xl font-medium mb-5 xl:w-[72rem] transition-all  ">{code}</h1>

            {calendars?.length === 0 && !loading && <div className="flex-1 min-h-full flex justify-center  "><h2>{t('noResults')}</h2></div>}
            {loading && <div className="flex-1 min-h-full flex justify-center ">
                <svg className="animate-spin  h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>}
            <div className="flex flex-col  gap-5" >
                {calendars.length > 0 && calendars.map(calendar =>
                    <Link
                        key={calendar.code}
                        href={{
                            pathname: "/calendar",
                            query: {
                                q: calendar.code
                            }
                        }}>
                        <a
                            className="flex sm:flex-row gap-6 flex-col items-center justify-between border rounded-xl dark:bg-black dark:border-white dark:hover:bg-orange-700 border-gray-200 bg-orange-50/20 py-5 px-4 shadow-sm sm:gap-2 hover:bg-gray-50 hover:shadow transition-all duration-300">
                            <div>
                                <h2>
                                    {calendar.name}
                                </h2>
                                <h3 className="font-medium">
                                    {calendar.code}
                                </h3>
                            </div>
                            <div >
                                <div className="text-orange-500 hover:text-orange-700 py-2 px-5 bg-white shadow rounded-xl  whitespace-nowrap dark:border dark:hover:text-white dark:bg-black dark:border-white dark:hover:bg-orange-700">{t('goToCalendar')}</div>
                            </div>
                        </a>
                    </Link>)}

            </div>
        </div>
    );
}
export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            // Will be passed to the page component as props
        },
    };
}
export default Course;

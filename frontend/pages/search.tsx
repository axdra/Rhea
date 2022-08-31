import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const Search: NextPage = () => {
    //get search query from url
    const router = useRouter();
    const searchQuary = router.query.q as string;
    const [courses, setCourses] = useState<any[]>([]);
    useEffect(() => {
        fetch('/api/search?q=' + searchQuary).then
            (res => res.json()).then(data => {

                setCourses(data);
            }
            );
    }
        , [searchQuary]);

    return (
        <div className="max-w-6xl mx-auto md:mt-12 mt-4 md:px-24 px-4 py-10 shadow rounded-lg mb-24">
            <h1 className="text-4xl font-medium mb-5 ">Search results for {searchQuary}</h1>

            <ul className="flex flex-col gap-5">
                {courses.map(course => <li key={course.code}
                    className="flex items-center justify-between border rounded-lg border-gray-200 bg-gray-50 py-5 px-4 shadow-sm gap-2">
                    <div>
                        <h2>
                            {course.name}
                        </h2>
                        <h3 className="font-medium">
                            {course.code}
                        </h3>
                    </div>
                    <div >
                        <a href={course.URL} className="text-blue-500 hover:text-blue-700 py-2 px-5 bg-white shadow rounded-full  whitespace-nowrap ">Go to Scheme</a>
                </div>
                </li>)}
            </ul>

        </div>
    );
}
export default Search;